#!/usr/bin/env bash

set -e

HTTP_HOST=pageshot.dev.mozaws.net
SSH_USER=ubuntu
SSH_HOST=ec2-52-1-53-38.compute-1.amazonaws.com

base="$(dirname $BASH_SOURCE)"
base="$(cd $base ; pwd)"
cd $base
cd ..
gulp javascript-addon
cd dist/addon
python -c 'import sys, re, time
today = time.strftime("%Y%m%d%H%M")
content = sys.stdin.read().strip()
def repl(match):
  return match.group(1) + today
content = re.sub(r"(\"version\": \"\d+\.\d+\.)(\d+)", repl, content)
print content
' < package.json > package.json.tmp
mv package.json.tmp package.json
cfx xpi \
    --update-link https://$HTTP_HOST/xpi/pageshot.xpi \
    --update-url https://$HTTP_HOST/xpi/pageshot.update.rdf
scp pageshot.xpi pageshot.update.rdf $SSH_USER@$SSH_HOST:pageshot/
ssh $SSH_USER@$SSH_HOST "cd pageshot && ./bin/update-source.sh"
