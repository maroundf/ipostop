#!/bin/sh

# debug log
set -x

echo "===== Installing Node.js ====="
brew install node

echo "===== Installling CocoaPods ====="
brew install cocoapods

echo "===== Verifying Node/NVM Versions ====="
node -v
npm -v

echo "===== Installing yarn ====="
brew install yarn

echo "===== Verifying Yarn Version ====="
yarn -v

echo "===== Changing Working Directory to Workspace repo ====="
cd ../../
echo "===== Working Directory 1 ====="
pwd
ls -ltr

echo "===== Installing dependencies ====="
yarn install

echo "===== Changing Working Directory to ios ====="
cd ios
echo "===== Working Directory 2 ====="
pwd
ls -ltr

echo "===== Running pod install ====="
pod install
