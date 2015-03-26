#!/usr/bin/env bash

set -e

cd /home/ubuntu/pageshot/server
export CONN_STR=postgres://pageshot:pageshot@pageshot.czvvrkdqhklf.us-east-1.rds.amazonaws.com/pageshot
NODE=/home/ubuntu/.nvm/versions/node/v0.12.0/bin/node

exec $NODE ./run &>> /home/ubuntu/pageshot.logs
