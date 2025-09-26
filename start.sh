#!/bin/bash

# Script de lancement pour Harmonic Explorer
# Démarre un serveur web local et ouvre l'application

echo "🎵 Démarrage de l'Explorateur Harmonique..."
echo "📁 Répertoire: $(pwd)"

# Vérifier si Python est disponible
if command -v python3 &> /dev/null; then
    echo "🐍 Utilisation de Python 3..."
    cd src
    echo "🌐 Serveur démarré sur http://localhost:8000"
    echo "👆 Cliquez sur le lien ou ouvrez votre navigateur à cette adresse"
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Utilisation de Python..."
    cd src
    echo "🌐 Serveur démarré sur http://localhost:8000"
    echo "👆 Cliquez sur le lien ou ouvrez votre navigateur à cette adresse"
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    python -m http.server 8000
elif command -v npx &> /dev/null; then
    echo "📦 Utilisation de Node.js..."
    cd src
    echo "🌐 Serveur démarré..."
    echo "👆 Suivez les instructions affichées"
    echo "🛑 Appuyez sur Ctrl+C pour arrêter le serveur"
    npx http-server -p 8000
else
    echo "❌ Erreur: Python ou Node.js requis pour démarrer le serveur"
    echo "📋 Solutions:"
    echo "   • Installez Python: https://www.python.org/downloads/"
    echo "   • Ou installez Node.js: https://nodejs.org/"
    echo "   • Ou utilisez l'extension Live Server dans VS Code"
    exit 1
fi
