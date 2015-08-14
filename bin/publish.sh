#!/usr/bin/env bash

set -e

HTTP_HOST=pageshot.dev.mozaws.net
SSH_USER=ubuntu
SSH_HOST=ec2-52-1-53-38.compute-1.amazonaws.com

cd "$(dirname $BASH_SOURCE)/.."
base="$(pwd)"
xpi="$base/build/mozilla-pageshot.xpi"
if [[ ! -e "$xpi" ]] ; then
  echo "Error: $xpi does not exist"
  exit 2
fi
# The signing process adds this META-INF directory to the xpi file
# (which is a zip file).  If it's not present then this is an unsigned
# addon, which we don't accept!
if unzip -v $xpi | grep -q META-INF ; then
  echo "Signed xpi found"
else
  echo "Error: $xpi is not signed"
  exit 3
fi
scp build/mozilla-pageshot.xpi $SSH_USER@$SSH_HOST:pageshot/
ssh $SSH_USER@$SSH_HOST "cd pageshot && ./bin/update-source.sh"
