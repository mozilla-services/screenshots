#!.venv/bin/python

import argparse
import os
import subprocess
import sys
from git import Repo

DEFAULTS = {
    "local": "http://localhost:10080/",
    "dev": "https://pageshot.dev.mozaws.net/",
    "stage": "https://pageshot.stage.mozaws.net/",
    "prod": "https://pageshot.net/"
}


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


def exportToMozillaCentral(server, repoDir, mcRepoPath, mcSubDir, mcBranch,
                           mcBaseCommit, commitMessage):
    print "Exporting to m-c"

    os.environ["EXPORT_MC_LOCATION"] = mcRepoPath
    os.environ["SCREENSHOTS_BACKEND"] = DEFAULTS[server]

    repo = RepoHandler(mcRepoPath)

    repo.checkoutDefault(mcBaseCommit)

    repo.createBranch(mcBranch)

    print "Exporting this repository to mozilla-central..."

    runProcess(['make', 'clean'], repoDir, "Failed to make clean: %s")

    runProcess(['make', 'export_addon'], repoDir, "Failed to make export_mc: %s")

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


def main(server, mcRepoPath, mcSubDir, mcBranch, mcBaseCommit, commitMessage,
         build=False, runTests=False, pushTry=False, onePlatform=False):
    repoDir = os.path.dirname(os.path.realpath(os.path.join(__file__, "..")))

    exportToMozillaCentral(server, repoDir, mcRepoPath, mcSubDir, mcBranch,
                           mcBaseCommit, commitMessage)

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
                        default=os.environ["EXPORT_MC_LOCATION"],
                        metavar="../gecko-dev",
                        help="A gecko directory reference to mozilla-central, can also "
                             "be specified via EXPORT_MC_LOCATION environment variable")
    parser.add_argument("--mozilla-central-subdir",
                        default="browser/extensions/pageshot/",
                        help="Where the extension is located in mozilla-central.")
    parser.add_argument("-b", "--branch",
                        required=True,
                        help="The branch/bookmark name to use for the export.")
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
         commitMessage=args.commit_message, build=args.build,
         runTests=args.run_tests, pushTry=args.push_to_try,
         onePlatform=args.single_platform)
