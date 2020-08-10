#!/bin/bash

set -eu
set -o pipefail

target_file="force-update-all-services.txt"
echo "This file is to let all services be updated in GitHub Actions and Google Cloud Build" > "$target_file"
echo "To update this file, just do it manually or run this command:" >> "$target_file"
echo '$ ./scripts/force-update-all-services.sh' >> "$target_file"
date +%s >> "$target_file"
