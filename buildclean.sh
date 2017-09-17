#!/bin/sh
# Clean everything possible

# adb reverse

adb reverse tcp:8081 tcp:8081

# watchman
watchman watch-del-all

# ios
rm -rf ios/build/ModuleCache/*

# android
rm -rf android/app/build
rm -rf $HOME/.gradle/caches/

# javascript
rm -rf node_modules/
npm cache verify

# Fresh install
yarn

# Link dependencies
react-native link

# clear react temp files (keep this last clean step)
rm -rf $TMPDIR/react-*
