#!/usr/bin/env bash

rm -rf platforms plugins node_modules www
mkdir www
npm install
npm prune
cordova platform add android
