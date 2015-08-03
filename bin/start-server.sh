#!/usr/bin/env bash

set -e

cd /home/ubuntu/pageshot/
export DB_HOST=pageshot.czvvrkdqhklf.us-east-1.rds.amazonaws.com
export DB_USER=pageshot
export DB_PASS=pageshot
export DB_NAME=pageshot
export NODE_ENV=production

NODE=/home/ubuntu/.nvm/versions/node/v0.12.0/bin/node

exec $NODE ./server/run &>> /home/ubuntu/pageshot.logs
