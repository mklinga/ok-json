#!/bin/bash

npm run build
cd /home/m/w/suspicious/ok
cp -rt . ../../ok-json/build/*

git add .
git commit -m 'Deploy suspicious/ok'

git push

echo "all done...?"
