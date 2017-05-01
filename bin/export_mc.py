#!.venv/bin/python

import argparse
import os
import subprocess
import sys
import filecmp
from git import Repo
from shutil import copyfile

DEFAULTS = {
    "local": "http://localhost:10080",
    "dev": "https://screenshots.dev.mozaws.net",
    "stage": "https://screenshots.stage.mozaws.net",
    "prod": "https://screenshots.firefox.com"
}

SENTRY_ENDPOINTS = {
    "local": "",
    "dev": "https://d58fc53f92cd47bba7266ad6444514d8@sentry.prod.mozaws.net/74",
    "stage": "https://3d2efd7bad9e4e359014cb4e69b8eaec@sentry.prod.mozaws.net/140",
    "prod": "https://97d8afa496f94764ae255e739b147f4b@sentry.prod.mozaws.net/139"
}

FILES_TO_NOT_REMOVE = [
    'moz.build',
    'README.txt'
]

FILES_TO_SKIP_COPY = [
    'README.md',
    'install.rdf.template',
    'manifest.json.template'
]


def runProcess(cmd, cwd, errorMessage):
    print "runProcess ", cmd
    p = subprocess.Popen(cmd, cwd=cwd)

    result = p.wait()

    if result:
        print >> sys.stderr, errorMessage % result
        sys.exit(1)


class RepoHandler():
    def __init__(self, mcRepoPath):
        try:
            self.repo = Repo(os.path.realpath(mcRepoPath))
            self.isGit = True
        except:
            self.isGit = False
            self.repoPath = mcRepoPath

    def checkoutDefault(self, baseCommit):
        print "Checking out default"
        if self.isGit:
            if self.repo.active_branch.name != "default":
                self.repo.heads.default.checkout()
        else:
            runProcess(["hg", "update", baseCommit], self.repoPath,
                       "Failed to check out default branch: %s")

    def createBranch(self, branch):
        print "Creating new branch %s" % branch

        if self.isGit:
            self.repo.create_head(branch)

            self.repo.heads[branch].checkout()
        else:
            runProcess(["hg", "bookmark", branch], self.repoPath,
                       "Failed to create branch: %s")

    def createCommit(self, subDir, commitMessage):
        print "Creating commit..."

        if self.isGit:
            # Can't find a way to do this via gitPython APIs, so do it manually.
            self.repo.git.execute(["git", "add", subDir])

            index = self.repo.index

            index.commit(commitMessage)
        else:
            runProcess(["hg", "add", subDir], self.repoPath,
                       "Failed to add files for commit: %s")

            runProcess(["hg", "commit", "-m %s" % commitMessage], self.repoPath,
                       "Failed to add files for commit: %s")


def exportFilesToMC(repoDir, mcRepoLoc):
    print "Exporting files"

    # Remove the existing files, except for ones we need to keep.
    for root, dirs, files in os.walk(mcRepoLoc):
        for file in files:
            if file not in FILES_TO_NOT_REMOVE:
                os.remove(os.path.join(root, file))

    addonDir = os.path.join(repoDir, "addon")
    testDir = os.path.join(repoDir, "test", "addon")
    enUSFile = os.path.join(addonDir, "webextension", "_locales", "en_US", "messages.json")

    # Export the main add-on files.
    for root, dirs, files in os.walk(addonDir):
        relativePath = os.path.relpath(root, addonDir)

        for file in files:
            filePath = os.path.join(root, file)
            if file == "messages.json" and os.path.getsize(filePath) == 2:
                print "Skipping empty locale file: %s" % filePath
            elif file == "messages.json" and 'en_US' not in root and filecmp.cmp(enUSFile, filePath):
                print "Skipping same as en-US locale file: %s" % filePath
            elif file not in FILES_TO_SKIP_COPY:
                copyfile(filePath,
                         os.path.join(mcRepoLoc, relativePath, file))

        for dir in dirs:
            dirPath = os.path.join(mcRepoLoc, relativePath, dir)
            if not os.path.exists(dirPath):
                os.mkdir(dirPath, 0755)

    # Copy the test files.
    mc_test_loc = os.path.join(mcRepoLoc, "test", "browser")
    if not os.path.exists(mc_test_loc):
        os.makedirs(mc_test_loc, 0755)

    for root, dirs, files in os.walk(testDir):
        for file in files:
            copyfile(os.path.join(root, file),
                     os.path.join(mc_test_loc, os.path.relpath(root, testDir), file))

    # Finally, update the moz.build file.
    runProcess([".venv/bin/python", "bin/update_mozbuild.py"], repoDir,
               "Failed to run update_mozbuild.py %s")


def exportToMozillaCentral(server, repoDir, mcRepoPath, mcSubDir, mcBranch,
                           noSwitchBranch, mcBaseCommit, commitMessage):
    print "Exporting to m-c"

    os.environ["SCREENSHOTS_SENTRY"] = SENTRY_ENDPOINTS[server]
    os.environ["SCREENSHOTS_BACKEND"] = DEFAULTS[server]
    os.environ["SCREENSHOTS_MINOR_VERSION"] = "0"

    repo = RepoHandler(mcRepoPath)

    if not noSwitchBranch:
        repo.checkoutDefault(mcBaseCommit)

        repo.createBranch(mcBranch)

    print "Exporting this repository to mozilla-central..."

    runProcess(['make', 'clean'], repoDir, "Failed to make clean: %s")

    runProcess(['make', 'addon'], repoDir, "Failed to make addon: %s")

    exportFilesToMC(repoDir, os.path.join(mcRepoPath, "browser", "extensions", "screenshots"))

    repo.createCommit(mcSubDir, commitMessage)


def buildMozillaCentral(mcRepoPath):
    print "Building..."

    runProcess(['./mach', 'build'], mcRepoPath, "Failed to build in mc repo: %s")


def runTestsInMozillaCentral(mcRepoPath, mcSubDir):
    print "Testing..."

    runProcess(['./mach', 'test', mcSubDir], mcRepoPath,
               "Tests failed! %s \n"
               "mozilla-central directory may have been left in unclean state.")


def pushToTry(mcRepoPath, pushTry, onePlatform):
    print "Pushing to try"

    platforms = "linux,linux64,macosx64,win32,win64"
    if onePlatform:
        platforms = "linux64"

    runProcess(["./mach", "try",
                "-b", "do", "-p", platforms, "-u", "xpcshell,marionette,"
                "marionette-e10s,mochitest-bc,mochitest-dt,"
                "mochitest-e10s-bc,mochitest-e10s-devtools-chrome", "-t", "none"],
               mcRepoPath,
               "Failed to push to try")


def main(server, mcRepoPath, mcSubDir, mcBranch, noSwitchBranch,
         mcBaseCommit, commitMessage,
         build=False, runTests=False, pushTry=False, onePlatform=False):
    repoDir = os.path.dirname(os.path.realpath(os.path.join(__file__, "..")))

    exportToMozillaCentral(server, repoDir, mcRepoPath, mcSubDir, mcBranch,
                           noSwitchBranch, mcBaseCommit, commitMessage)

    if build:
        buildMozillaCentral(mcRepoPath)
        if runTests:
            runTestsInMozillaCentral(mcRepoPath, mcSubDir)

    if pushTry:
        pushToTry(mcRepoPath, pushTry, onePlatform)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Screenshots script for managing export to mozilla-central")
    parser.add_argument("-s", "--server",
                        default="prod",
                        help="[local|dev|stage|prod]: Which server the code should use.")
    parser.add_argument("--mozilla-central-repo",
                        default=(os.getenv("EXPORT_MC_LOCATION") or "../gecko-dev"),
                        metavar=(os.getenv("EXPORT_MC_LOCATION") or "../gecko-dev"),
                        help="A gecko directory reference to mozilla-central, can also "
                             "be specified via EXPORT_MC_LOCATION environment variable")
    parser.add_argument("--mozilla-central-subdir",
                        default="browser/extensions/screenshots/",
                        help="Where the extension is located in mozilla-central.")
    parser.add_argument("-b", "--branch",
                        help="The branch/bookmark name to use for the export.")
    parser.add_argument("--no-switch-branch",
                        action="store_true",
                        help="Don't switch to the default branch, use the existing one.")
    parser.add_argument("--mozilla-central-base-commit",
                        default="central",
                        help="The base commit if using Mercurial, defaults to 'central' (tree label)")
    parser.add_argument("-m", "--commit-message",
                        required=True,
                        help="The commit message to use for the export.")
    parser.add_argument("--build",
                        action="store_true",
                        help="Specify to build locally after export.")
    parser.add_argument("--run-tests",
                        action="store_true",
                        help="Whether or not to run Screenshots tests after the build.")
    parser.add_argument("--push-to-try",
                        action="store_true",
                        help="Specify to push the result to the try server.")
    parser.add_argument("--single-platform",
                        action="store_true",
                        help="Specify to push to only one platform for the try "
                             "build (linux64). Default is all platforms.")
    args = parser.parse_args()

    main(server=args.server, mcRepoPath=args.mozilla_central_repo,
         mcSubDir=args.mozilla_central_subdir,
         mcBaseCommit=args.mozilla_central_base_commit, mcBranch=args.branch,
         noSwitchBranch=args.no_switch_branch,
         commitMessage=args.commit_message, build=args.build,
         runTests=args.run_tests, pushTry=args.push_to_try,
         onePlatform=args.single_platform)
