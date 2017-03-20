#!/usr/bin/env python
"""
Sets the version parameter in webextension/manifest.json using a date and package.json
Sets the backend value
"""

import sys
import os
import time
import json
import calendar
import subprocess

if not sys.argv[1:] or "-h" in sys.argv or "--help" in sys.argv:
    print "Usage: %s MANIFEST_TEMPLATE MANIFEST_JSON" % (os.path.basename(sys.argv[0]))
    print "  Writes MANIFEST_JSON based on MANIFEST_TEMPLATE"
    print "  Uses build/.backend.txt to figure out the backend configuration"
    print "  Uses package.json to determine the version (and adds a timestamp)"
    print "  If $SCREENSHOTS_MINOR_VERSION is set, use that instead of a timestamp for that version"
    sys.exit()

template = open(sys.argv[1]).read()
output_file = sys.argv[2]
package_json = json.load(open("package.json"))
last_version = None
if os.path.exists(output_file):
    output_data = json.load(open(output_file))
    last_version = output_data["version"]
# This is just a guess at when the version was set, but it'll have to be good enough:
last_modified_package_json = subprocess.check_output(
    ["git", "log", "-1", "--format=%cd", "--date=short", "package.json"]).strip()
last_modified_package_json = calendar.timegm(time.strptime(last_modified_package_json, "%Y-%m-%d"))
now_timestamp = int((time.time() - last_modified_package_json) / 60)
if os.environ.get("SCREENSHOTS_MINOR_VERSION"):
    now_timestamp = os.environ["SCREENSHOTS_MINOR_VERSION"]
package_json_version = package_json["version"].split(".")
while True:
    version = "%s.%s.%s" % (package_json_version[0], package_json_version[1], now_timestamp)
    if last_version == version:
        now_timestamp += 1
    else:
        break
backend = open("build/.backend.txt").read()

template = template.replace("__VERSION__", version)
template = template.replace("http://localhost:10080", backend)

open(sys.argv[2], "wb").write(template)
