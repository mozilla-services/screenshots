#!/usr/bin/env python

import sys
import os
import glob

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

output_dir = "addon/chrome/locale"
translate_key = "contextMenuLabel"
chrome_manifest = "addon/chrome.manifest"

properties_template = u"""\
__LABEL__ = __VALUE__
"""

def help():
    print("Usage:")
    print("  %s" % os.path.basename(__file__))
    print("")
    print("This reads all the files from locales/*/webextensions.properties")
    print("and generates files in %s/" % output_dir)
    print("The generated module contains the %s string for all locales" % translate_key)
    print("Also updates %s with locales" % chrome_manifest)

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
        tooltip = props.get(translate_key)
        if tooltip:
            result[lang] = tooltip
        else:
            skipped_locales.append(lang)
    if not result.get("en-US"):
        print("Error: no en-US translation of contextMenuLabel")
        sys.exit(3)
    if len(result) < 10:
        # Something went wrong if we didn't get at least this many locales
        print("Error: got very few locales (%s)" % result.keys())
        sys.exit(2)
    for lang in result:
        output_filename = os.path.join(output_dir, lang, "screenshots.properties")
        dirname = os.path.dirname(output_filename)
        if not os.path.exists(dirname):
            os.makedirs(dirname)
        with open(output_filename, "wb") as fp:
            output = properties_template.replace("__LABEL__", translate_key)
            output = output.replace("__VALUE__", result[lang])
            fp.write(output.encode("UTF-8"))
    print("%s locales written to %s (%s skipped)" % (len(result), output_dir, len(skipped_locales)))
    if skipped_locales:
        print("Locales without contextMenuLabel: %s" % (", ".join(skipped_locales), ))
    update_chrome_manifest(result.keys())
    print("Updated %s" % chrome_manifest)

def parse_properties(filename):
    with open(filename, "r") as fp:
        content = fp.read().decode("UTF-8")
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

def update_chrome_manifest(langs):
    with open(chrome_manifest) as fp:
        content = fp.read().splitlines()
    new_content = [line for line in content if not line.strip().startswith("locale ")]
    for lang in langs:
        new_content.append("locale screenshots %s chrome/locale/%s/" % (lang, lang))
    with open(chrome_manifest, "w") as fp:
        fp.write("\n".join(new_content) + "\n")

if __name__ == "__main__":
    main(sys.argv[1:])
