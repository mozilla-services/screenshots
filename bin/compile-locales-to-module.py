#!/usr/bin/env python

import sys
import os
import glob
import json

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

output_filename = "addon/chrome/content/localizedTooltips.jsm"

module = """\
/* This file is generated from locales/{LOCALE}/webextension.properties in Screenshots */

this.EXPORTED_SYMBOLS = ["localizedScreenshotsTooltips"];

this.localizedScreenshotsTooltips = __LOCALIZED__;
"""

def help():
    print("Usage:")
    print("  %s" % os.path.basename(__file__))
    print("")
    print("This reads all the files from locales/*/webextensions.properties")
    print("and generates %s" % output_filename)
    print("The generated module contains the contextMenuLabel string for all locales")

def main(args):
    if '-h' in args or '--help' in args:
        help()
        sys.exit()
    if args:
        print("Invalid options: %s" % args)
        help()
        sys.exit(1)
    os.chdir(base)
    input_filenames = glob.glob("locales/*/webextension.properties")
    result = {}
    skipped_locales = []
    for filename in input_filenames:
        lang = os.path.basename(os.path.dirname(filename))
        props = parse_properties(filename)
        tooltip = props.get("contextMenuLabel")
        if tooltip:
            result[lang] = tooltip
            shortlang = lang.split("-")[0]
            result[shortlang] = tooltip
        else:
            skipped_locales.append(lang)
    if not result.get("en-US"):
        print("Error: no en-US translation of contextMenuLabel")
        sys.exit(3)
    if len(result) < 10:
        # Something went wrong if we didn't get at least this many locales
        print("Error: got very few locales (%s)" % result.keys())
        sys.exit(2)
    if not os.path.exists(os.path.dirname(output_filename)):
        os.makedirs(os.path.dirname(output_filename))
    with open(output_filename, "w") as fp:
        content = module.replace("__LOCALIZED__", json.dumps(result))
        fp.write(content)
    print("%s locales written to %s (%s skipped)" % (len(result), output_filename, len(skipped_locales)))
    if skipped_locales:
        print("Locales without contextMenuLabel: %s" % (", ".join(skipped_locales), ))

def parse_properties(filename):
    with open(filename, "r") as fp:
        content = fp.read()
    result = {}
    for i, line in enumerate(content.splitlines()):
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split('=', 1)
        if len(parts) != 2:
            raise Exception("Error in %s:%s, no '='" % (filename, i + 1))
        result[parts[0].strip()] = parts[1].strip()
    return result

if __name__ == "__main__":
    main(sys.argv[1:])
