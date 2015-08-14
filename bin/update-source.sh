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
make server
if [[ -e build-production ]] ; then
  mv build-production build-production.obsolete
fi
mv build build-production
if [[ -e build-production.obsolete ]] ; then
  rm -r build-production.obsolete
fi
if [ -e ./mozilla-pageshot.xpi ] ; then
  echo "Updating XPI"
  mkdir -p static-xpi/
  mv ./mozilla-pageshot.xpi static-xpi/
  chmod a+r static-xpi/*
  #mv ./mozilla-pageshot.update.rdf server/dist/xpi/
fi
sudo service pageshot restart
