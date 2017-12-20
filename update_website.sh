#!/bin/sh
buster generate --target_domain=jzarca01.github.io/static --domain=localhost:2368
git add -A
git commit -m "Update on the website at $(date)"
git push origin master