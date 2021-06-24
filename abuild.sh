#!/bin/sh
VERSION=`grep -e "widget.*version" config.xml | sed "s/.*version=\"\([0-9.]*\)\".*/\1/;s/\./_/g"`
APPNAME=`grep "<name>" config.xml | sed "s/.*<name>\(.*\)<\/name>.*/\1/"`
PROJNAME=zastavky

ionic cordova build android --device #--prod
mv platforms/android/app/build/outputs/apk/debug/app-debug.apk $PROJNAME-$VERSION-$BUILD_NUMBER.apk

