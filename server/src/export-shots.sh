#!/usr/bin/env bash

set -e

mkdir -p $BASE_DIR
cd $BASE_DIR
base="$(pwd)"

(
  set -ex

  _cleanup () {
    rm -f $base/script-process.pid
    echo -n $? > $base/script-exit-code.txt
    node -e 'console.log(Date.now())' > $base/script-exit-time.txt
  }

  echo -n $$ > $base/wget-process.pid

  trap _cleanup EXIT

  mkdir -p pageshot-export
  cd pageshot-export

  set +e
  wget --mirror --page-requisites --convert-links --execute robots=no \
    --no-host-directories --adjust-extension --no-verbose \
    --header "X-Magic-Auth: $AUTH" \
    --header "X-Device-Id: $DEVICE_ID" \
    --header "X-Simple: true" \
    http://localhost:$PORT/shots
  code="$?"
  if [[ "$code" != 0 ]] && [[ "$code" != 8 ]] ; then
    # response code 8 is the only good one
    echo "Error from wget: $code"
    exit $code
  fi
  set -e

  mv shots.html index.html

  cd $base
  zip -r --move pageshot-export.zip pageshot-export/
) >& $base/script.log
