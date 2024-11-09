#!/bin/sh

set -e
# debug log
set -x

echo "===== Installling CocoaPods ====="
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods

echo "===== Installing NVM ====="
brew install nvm
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh

echo "===== Installing Node.js ====="
NODE_VER="21.6.0"
nvm install $NODE_VER
nvm use $NODE_VER

echo "===== Verifying Node/NVM Versions ====="
node -v
npm -v

echo "===== Installing yarn ====="
brew install yarn

echo "===== Verifying Cocoapods/Yarn Versions ====="
gem which cocoapods
yarn -v

echo "===== Changing Working Directory to Workspace repo ====="
cd ../../
echo "===== Working Directory 1 ====="
pwd
ls -ltr

echo "===== Installing dependencies ====="
yarn install
echo "===== Working Directory 2 ====="
pwd
ls -ltr node_modules
if [ -d "node_modules/react-native" ]; then
    ls -ltr node_modules/react-native
    if [ -d "node_modules/react-native/scripts" ]; then
        ls -ltr node_modules/react-native/scripts
    fi
fi

echo "===== Changing Working Directory to ios ====="
cd ios
echo "===== Working Directory 3 ====="
pwd
ls -ltr

echo "===== Running pod install ====="
pod install
