#!/usr/bin/env bash
set -e

if [ ! -e .git ] ; then
  echo "Error: $0 must be run from the root of the pageshot checkout"
  exit 3
fi

. ~/.bashrc
nvm use 0.12
git pull
cd server
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
