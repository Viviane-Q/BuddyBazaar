#!/bin/bash -x
cp .env.example .env # Copie le fichier d'exemple pour le fichier de configuration
sed -i "s/BACKEND_URL=/BACKEND_URL=https\:\/\/bazaar\.osc\-fr1\.scalingo\.io/g" .env
mkdir -p public # Crée le répertoire pour disposer dans pages de l'application 
source /etc/profile.d/androidrc.sh # Définit les variables d'environnement pour accéder aux outils nécessaires
npm install
npx expo prebuild  # Prépare la génération de l'application native
cd android    # Se place dans le répertoire android
./gradlew assembleRelease # Puis génère l'application au format apk 
cp ./app/build/outputs/apk/release/app-release.apk ../public/monapp.apk # Déplace l'application générée dans /public 
exit 0
