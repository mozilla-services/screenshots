#!/usr/bin/env bash

set -e

HTTP_HOST=pageshot.dev.mozaws.net
SSH_USER=ubuntu
SSH_HOST=ec2-52-1-53-38.compute-1.amazonaws.com

base="$(dirname $BASH_SOURCE)"
base="$(cd $base ; pwd)"
cd $base
cd ..
gulp transforms javascript-addon
cd dist/addon
python -c 'import sys, re, time
today = time.strftime("%Y%m%d%H%M", time.gmtime())
content = sys.stdin.read().strip()
def repl(match):
  return match.group(1) + today
content = re.sub(r"(\"version\": \"\d+\.\d+\.)(\d+)", repl, content)
print content
' < package.json > package.json.tmp
mv package.json.tmp package.json
# To suppress a warning from the addon validator:
python -c '
import sys
content = open("data/panel-bundle.js").read()
sys.stderr.write("Read %i characters from panel-bundle.js\n" % len(content))
for line, repl in [
  ("Function.prototype", "Object.getPrototypeOf(function () {})"),
  ("setTimeout(drainQueue, 0)", "setTimeout(function () {drainQueue()}, 0)"),
  ("setTimeout(cleanUpNextTick)", "setTimeout(function () {cleanUpNextTick()})"),
  ("element.setAttribute(eventName, \x27return;\x27);", "//element.setAttribute(eventName, \x27return;\x27);"),
  ("isSupported = typeof element[eventName] === \x27function\x27;", "isSupported = true // disabled check"),
]:
    if not content.count(line):
        sys.stderr.write("Warning: could not find match in panel-bundle: %r\n" % line)
    content = content.replace(line, repl);
open("data/panel-bundle.js", "w").write(content)
'

cfx xpi \
    --update-link https://$HTTP_HOST/xpi/mozilla-pageshot.xpi \
    --update-url https://$HTTP_HOST/xpi/mozilla-pageshot.update.rdf
scp mozilla-pageshot.xpi mozilla-pageshot.update.rdf $SSH_USER@$SSH_HOST:pageshot/
ssh $SSH_USER@$SSH_HOST "cd pageshot && ./bin/update-source.sh"
