#!/bin/bash -x

# replace import { BACKEND_URL } from "@env"; by const BACKEND_URL = "$BACKEND_URL"; in frontend/src/api.js
sed -i "s|import { BACKEND_URL } from \"@env\";|const BACKEND_URL = \"$BACKEND_URL\";|g" store/thunks/*
mkdir -p public # Crée le répertoire pour disposer dans pages de l'application 
source /etc/profile.d/androidrc.sh # Définit les variables d'environnement pour accéder aux outils nécessaires
npm install
npx expo prebuild  # Prépare la génération de l'application native
cd android    # Se place dans le répertoire android
./gradlew assembleRelease # Puis génère l'application au format apk 
cp ./app/build/outputs/apk/release/app-release.apk ../public/monapp.apk # Déplace l'application générée dans /public 
exit 0
