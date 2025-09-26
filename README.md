# 🎵 Explorateur Harmonique / Harmonic Explorer

Une application interactive de visualisation et génération de sons harmoniques utilisant p5.js et les technologies web modernes.

## 🚀 Fonctionnalités

- **Visualisation harmonique** : Affichage en temps réel des harmoniques sous forme de formes 3D colorées
- **Génération audio** : Création de sons basés sur les séries harmoniques
- **Contrôles interactifs** : Interface intuitive pour ajuster tous les paramètres
- **Design moderne** : Interface utilisateur élégante avec animations fluides
- **Compatible ES Modules** : Utilise les standards web modernes

## 🎛️ Contrôles disponibles

| Paramètre | Description |
|-----------|-------------|
| **Volume** | Contrôle le volume général de l'application |
| **Wave Type** | Type d'onde (Sine, Triangle, Sawtooth, Square) |
| **Vibrato Depth** | Profondeur de l'effet vibrato |
| **Vibrato Frequency** | Fréquence du vibrato |
| **Vibrato Wave Type** | Type d'onde pour le vibrato |
| **Number of Harmonics** | Nombre d'harmoniques à générer (1-40) |
| **Intonation** | Précision de l'intonation (0 = imprécis, 1 = parfait) |
| **Generation Speed** | Vitesse de génération des nouvelles formes |
| **Key Change** | Mode de changement de tonalité |
| **Key** | Tonalité actuelle (affichage) |

## 🛠️ Installation et utilisation

### Prérequis
- Navigateur web moderne supportant les ES Modules (Chrome, Firefox, Safari, Edge)
- Serveur web local (pour éviter les restrictions CORS)

### Lancement rapide

1. **Serveur Python** (si disponible) :
   ```bash
   cd src/
   python -m http.server 8000
   ```
   Puis ouvrir http://localhost:8000

2. **Serveur Node.js** (si disponible) :
   ```bash
   cd src/
   npx http-server
   ```

3. **Live Server** (extension VS Code) :
   - Installer l'extension Live Server
   - Clic droit sur `index.html` → "Open with Live Server"

### Structure du projet

```
harmonic-explorer/
├── src/
│   ├── index.html      # Page principale
│   ├── sketch.js       # Logique principale p5.js
│   ├── sound.js        # Gestion audio
│   └── shape.js        # Gestion des formes visuelles
├── README.md           # Ce fichier
└── LICENSE            # Licence
```

## 🎨 Fonctionnement

L'application génère des formes visuelles qui correspondent à des harmoniques musicales. Chaque forme :

- **Position X** : Déterminée par la fréquence harmonique
- **Couleur** : Basée sur le numéro de l'harmonique
- **Son** : Oscillateur avec enveloppe ADSR
- **Mouvement** : Animation verticale représentant la durée de vie

## 🔧 Personnalisation

### Modifier les gammes
Éditez le tableau `chromaticScaleFreqs` dans `sketch.js` pour changer les fréquences de base.

### Ajouter des types d'ondes
Modifiez le tableau `waves` dans les paramètres pour ajouter de nouveaux types d'ondes.

### Ajuster les couleurs
La fonction de mapping des couleurs se trouve dans `shape.js` (propriété `hue`).

## 🐛 Résolution de problèmes

### "ES Modules not supported"
- Mettez à jour votre navigateur
- Utilisez un serveur web local
- Vérifiez que JavaScript est activé

### Pas de son
- Vérifiez que le volume n'est pas à zéro
- Autorisez l'audio dans votre navigateur
- Cliquez sur la page pour activer le contexte audio

### Performance lente
- Réduisez le nombre d'harmoniques
- Diminuez la vitesse de génération
- Fermez d'autres onglets consommateurs

## 📱 Compatibilité

- ✅ Chrome 61+
- ✅ Firefox 60+
- ✅ Safari 10.1+
- ✅ Edge 16+
- ✅ Mobile (avec limitations audio)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [p5.js](https://p5js.org/) pour la bibliothèque de création graphique
- [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) pour les capacités audio
- Inspiré par le travail original de [davebsoft.com](https://davebsoft.com/software/harmonic-explorer/)

---

🎵 **Amusez-vous bien avec l'exploration harmonique !** 🎵