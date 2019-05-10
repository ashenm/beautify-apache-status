#!/usr/bin/env sh
# Build CookieStorage

set -e

mkdir --parent build && \
  cp --force src/beautify.js build/beautify.js

exec node utils/build.js
