#!/usr/bin/env sh
# Generate SHA-384 Digests

openssl dgst -binary -sha384 build/beautify.js \
  | openssl base64 > build/beautify.js.sha384

openssl dgst -binary -sha384 build/beautify.min.js \
  | openssl base64 > build/beautify.min.js.sha384
