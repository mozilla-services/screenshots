#!/usr/bin/env bash

set -e

cd /home/ubuntu/pageshot/
# FIXME: should move all these into env.production:
export DB_HOST=pageshot.czvvrkdqhklf.us-east-1.rds.amazonaws.com
export DB_USER=pageshot
export DB_PASS=pageshot
export DB_NAME=pageshot
export NODE_ENV=production

NODE=/home/ubuntu/.nvm/versions/node/v0.12.0/bin/node

exec $NODE -e 'require("babel/polyfill"); require("./build-production/server/server");' &>> /home/ubuntu/pageshot.logs
