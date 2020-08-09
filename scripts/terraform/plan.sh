#!/bin/sh

set -eu
set -o pipefail

cd "terraform/${TERRAFORM_ENVIRONMENT}"
terraform plan -input=false -no-color | \
  tfnotify plan
