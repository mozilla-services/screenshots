#!.venv/bin/python

import argparse
import os
import io
import re

skipFiles = [
    "manifest.json.template"
]


def getFullFileList(outputLoc, dirName):
    result = {dirName: []}
    for entry in os.listdir(outputLoc):
        if os.path.isdir(os.path.join(outputLoc, entry)):
            result.update(getFullFileList(os.path.join(outputLoc, entry), os.path.join(dirName, entry)))
        elif entry not in skipFiles:
            if dirName:
                result[dirName].append(os.path.join(dirName, entry))
            else:
                result[dirName].append(entry)

    return result


def rewriteMozBuild(outputLoc, fileList):
    mozBuildFile = os.path.join(outputLoc, "moz.build")
    print "Rewriting %s" % mozBuildFile

    with io.open(mozBuildFile, "r+", encoding="UTF-8") as buildFile:
        contents = buildFile.read()

        insertion_text = ''

        for dir in sorted(fileList.keys()):
            if not fileList[dir]:
                continue

            mozBuildPathName = '["' + '"]["'.join(dir.split(os.sep)) + '"]'

            insertion_text += \
                "FINAL_TARGET_FILES.features['screenshots@mozilla.org']%s += [\n" % mozBuildPathName + \
                "  '" + \
                "',\n  '".join(sorted(fileList[dir])) + "'\n]\n\n"

        new_contents = re.sub(
            '# AUTOMATIC INSERTION START(.*)# AUTOMATIC INSERTION END',
            "# AUTOMATIC INSERTION START\n" +
            insertion_text +
            "# AUTOMATIC INSERTION END",
            contents, 1, re.M | re.S)

        buildFile.seek(0)
        buildFile.truncate(0)
        buildFile.write(new_contents)


def main(mcRepoPath, mcSubDir):
    outputLoc = os.path.join(mcRepoPath, mcSubDir)

    fileList = getFullFileList(os.path.join(outputLoc, "webextension"), "webextension")

    rewriteMozBuild(outputLoc, fileList)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Screenshots script for managing update of moz.build in mozilla-central")
    parser.add_argument("--mozilla-central-repo",
                        default=os.environ["EXPORT_MC_LOCATION"],
                        metavar="../gecko-dev",
                        help="A gecko directory reference to mozilla-central, can also "
                             "be specified via EXPORT_MC_LOCATION environment variable")
    parser.add_argument("--mozilla-central-subdir",
                        default="browser/extensions/screenshots/",
                        help="Where the extension is located in mozilla-central.")
    args = parser.parse_args()

    main(mcRepoPath=args.mozilla_central_repo, mcSubDir=args.mozilla_central_subdir)
