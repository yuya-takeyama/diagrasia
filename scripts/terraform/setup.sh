#!/bin/sh

set -eu
set -o pipefail

echo "Installing tfnotify"
wget https://github.com/mercari/tfnotify/releases/download/v0.7.0/tfnotify_linux_amd64.tar.gz -O /tmp/tfnotify.tar.gz
tar xvzf /tmp/tfnotify.tar.gz -C /usr/local/bin tfnotify

cd "terraform/${TERRAFORM_ENVIRONMENT}"
echo "Running terraform init"
terraform init -input=false -no-color
