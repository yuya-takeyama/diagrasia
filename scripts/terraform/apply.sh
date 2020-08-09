#!/bin/sh

set -eu
set -o pipefail

cd "terraform/${TERRAFORM_ENVIRONMENT}"
terraform apply -input=false -no-color -auto-approve | \
  tfnotify apply
