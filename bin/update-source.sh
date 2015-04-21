#!/usr/bin/env bash
set -e

if [ ! -e .git ] ; then
  echo "Error: $0 must be run from the root of the pageshot checkout"
  exit 3
fi

export NVM_DIR="/home/ubuntu/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
nvm use 0.12
git pull
npm install
gulp transforms
if [ -e ./pageshot.xpi ] ; then
  echo "Updating XPI"
  if [ ! -e ./pageshot.update.rdf ] ; then
    echo "Missing pageshot.update.rdf"
    exit 2
  fi
  mv ./pageshot.xpi dist/
  mv ./pageshot.update.rdf dist/
fi
mv dist-production dist-production.obsolete
mv dist dist-production
rm -r dist-production.obsolete
sudo service pageshot restart
