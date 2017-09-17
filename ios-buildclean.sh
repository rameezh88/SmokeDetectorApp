#!/bin/bash
(cd ios/ && rm -rf Pods/)

cd ios/

if [ -e Podfile.lock ]; then
	rm Podfile.lock
else
	echo "This is probably a fresh clone of the project. Doing a pod install to avoid build issues..."
	if [ -e Podfile ]; then
    pod install
  else
    echo "No Podfile found. Not installing Pods."
  fi
fi

cd ..

rm -rf ~/Library/Developer/Xcode/DerivedData

source buildclean.sh

cd ios/
if [ -e Podfile ]; then
  pod install
else
  echo "No Podfile found. Not installing Pods."
fi

cd ..
