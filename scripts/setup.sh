#!/usr/bin/env sh
set -x

husky install

ts-patch install -s
if ! [ -d node_modules/partbot-language-service-plugin ]
then
  cp -r src/typescript/language-service-plugin node_modules/partbot-language-service-plugin
fi

if ! [ -d src/secrets ]
then
  git clone https://github.com/PartMan7/PartBot-spoof.git src/secrets
fi

cd src/secrets && npm install && cd ../..

if ! [ -f .env ]
then
  cp .env.example .env
fi
