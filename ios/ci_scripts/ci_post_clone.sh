#!/bin/sh

# debug log
set -x

echo "===== Installing Node.js ====="
brew install node

echo "===== Installling CocoaPods ====="
brew install cocoapods

echo "===== Installing NVM ====="
brew install nvm
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh

echo "===== Verifying Node/NVM Versions ====="
node -v
npm -v

echo "===== Setting NODE_BINARY ENV Variable ====="
ln -s $(command -v node) /usr/local/bin/node
export NODE_BINARY=$(command -v node)

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
