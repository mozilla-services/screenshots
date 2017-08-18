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
import re

if not sys.argv[1:] or "-h" in sys.argv or "--help" in sys.argv:
    print("Usage: %s MANIFEST_TEMPLATE MANIFEST_JSON" % (os.path.basename(sys.argv[0])))
    print("  Writes MANIFEST_JSON based on MANIFEST_TEMPLATE")
    print("  Uses build/.backend.txt to figure out the backend configuration")
    print("  Uses package.json to determine the version (and adds a timestamp)")
    print("  If $SCREENSHOTS_MINOR_VERSION is set, use that instead of a timestamp for that version")
    sys.exit()

template = open(sys.argv[1]).read()
output_file = sys.argv[2]
package_json = json.load(open("package.json"))
last_version = None
if os.path.exists(output_file):
    if output_file.endswith(".json"):
        try:
            output_data = json.load(open(output_file))
        except ValueError:
            print("Ignoring current manifest in %s" % output_file)
        else:
            last_version = output_data["version"]
    elif output_file.endswith(".rdf"):
        rdf_content = open(output_file).read()
        match = re.search(r'<em:version>(.*?)</em:version>', rdf_content)
        if match:
            last_version = match.group(1)
# This is just a guess at when the version was set, but it'll have to be good enough:
last_modified_package_json = subprocess.check_output(
    ["git", "log", "-1", "--format=%cd", "--date=short", "package.json"]).strip()
last_modified_package_json = calendar.timegm(time.strptime(last_modified_package_json, "%Y-%m-%d"))
now_timestamp = int((time.time() - last_modified_package_json) / 60)
if os.environ.get("SCREENSHOTS_MINOR_VERSION"):
    now_timestamp = int(os.environ["SCREENSHOTS_MINOR_VERSION"])
package_json_version = package_json["version"].split(".")
while True:
    version = "%s.%s.%s" % (package_json_version[0], package_json_version[1], now_timestamp)
    if last_version:
        last_parts = last_version.split(".")
        version_parts = version.split(".")
        if (last_parts[0] == version_parts[0] and
           last_parts[1] == version_parts[1] and
           int(last_parts[2]) >= int(version_parts[2])):
            now_timestamp += 1
            continue
    break
backend = open("build/.backend.txt").read().strip()
if not re.search(r'^https?://[^/]+/?$', backend):
    print("Error: bad backend (must be fully qualified URL): %r" % backend)
    sys.exit(1)

template = template.replace("__VERSION__", version)
# Some places we use the port:
template = template.replace("http://localhost:10080", backend)
# But for content_scripts.matches the port gets left off:
backend_without_port = re.sub(r':\d+$', '', backend)
template = template.replace("http://localhost/", backend_without_port + "/")


open(sys.argv[2], "wb").write(template)
