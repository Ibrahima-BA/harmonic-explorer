// Configuration avancée pour Harmonic Explorer
// Copiez ce fichier dans src/ et modifiez les valeurs selon vos besoins

export const AdvancedSettings = {
    // Paramètres visuels
    visual: {
        backgroundColor: [0, 0, 0],           // Couleur de fond [R, G, B] ou [H, S, B]
        colorMode: 'HSB',                     // 'HSB' ou 'RGB'
        shapeOpacity: 255,                    // Opacité des formes (0-255)
        pathOpacity: 32,                      // Opacité des chemins harmoniques (0-255)
        
        // Animation
        fadeDistance: 3000,                   // Distance de disparition des formes
        minShapeSize: 20,                     // Taille minimale des formes
        maxShapeSize: 60,                     // Taille maximale des formes
        
        // Couleurs harmoniques (HSB)
        harmonicColors: {
            hueStart: 0,                      // Teinte de départ
            hueEnd: 320,                      // Teinte de fin
            saturation: 100,                  // Saturation
            brightnessMin: 10,                // Luminosité minimale
            brightnessMax: 100                // Luminosité maximale
        }
    },
    
    // Paramètres audio
    audio: {
        // Enveloppe ADSR par défaut
        envelope: {
            attackTime: 0.01,                 // Temps d'attaque (secondes)
            sustainRatio: 0,                  // Ratio de maintien (0-1)
            releaseTime: 0,                   // Temps de relâchement (secondes)
        },
        
        // Limites des paramètres
        limits: {
            maxVolume: 1.0,                   // Volume maximum
            maxVibratoDepth: 1.0,             // Profondeur vibrato max
            maxVibratoFreq: 20,               // Fréquence vibrato max
            maxHarmonics: 50,                 // Nombre max d'harmoniques
            maxPitchDeviation: 0.2            // Déviation tonale max
        }
    },
    
    // Gammes et tonalités personnalisées
    scales: {
        // Gamme chromatique (Hz) - Do3 à Si3
        chromatic: [
            130.81, 138.59, 146.83, 155.56,  // Do, Do#, Ré, Ré#
            164.81, 174.61, 185.00, 196.00,  // Mi, Fa, Fa#, Sol
            207.65, 220.00, 233.08, 246.94   // Sol#, La, La#, Si
        ],
        
        // Gammes alternatives (fréquences relatives)
        pentatonic: [1, 9/8, 5/4, 3/2, 5/3],           // Pentatonique
        justIntonation: [1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8], // Intonation juste
        pythagorean: [1, 256/243, 9/8, 32/27, 81/64, 4/3, 729/512, 3/2, 128/81, 27/16, 16/9, 243/128] // Pythagoricienne
    },
    
    // Noms des notes
    noteNames: {
        french: ['Do', 'Do♯', 'Ré', 'Ré♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'],
        english: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'],
        german: ['C', 'Cis', 'D', 'Dis', 'E', 'F', 'Fis', 'G', 'Gis', 'A', 'Ais', 'H']
    },
    
    // Modes de changement de tonalité personnalisés
    keyChangeModes: [
        { name: "Cycle des quintes", interval: 7 },      // +7 demi-tons
        { name: "Cycle des quartes", interval: 5 },      // +5 demi-tons
        { name: "Chromatique", interval: 1 },            // +1 demi-ton
        { name: "Tons entiers", interval: 2 },           // +2 demi-tons
        { name: "Tierces", interval: 4 },                // +4 demi-tons
        { name: "Aléatoire", interval: "random" },       // Aléatoire
        { name: "Fixe", interval: 0 }                    // Pas de changement
    ],
    
    // Paramètres de performance
    performance: {
        maxActiveShapes: 50,                  // Nombre max de formes actives
        frameRateTarget: 60,                  // FPS cible
        audioBufferSize: 512,                 // Taille du buffer audio
        
        // Optimisations
        enableShapePooling: true,             // Réutilisation des objets
        enableAudioOptimization: true,        // Optimisations audio
        enableVisualOptimization: true        // Optimisations visuelles
    },
    
    // Interface utilisateur
    ui: {
        language: 'fr',                       // 'fr', 'en', 'de'
        theme: 'dark',                        // 'dark', 'light'
        controlsPosition: 'top-left',         // Position des contrôles
        showFPS: false,                       // Afficher les FPS
        showDebugInfo: false                  // Afficher les infos de debug
    }
};

// Exemple d'utilisation dans sketch.js :
/*
import { AdvancedSettings } from '../config.js';

// Utiliser les paramètres personnalisés
const Settings = {
    ...DefaultSettings,
    chromaticScaleFreqs: AdvancedSettings.scales.chromatic,
    keyNames: AdvancedSettings.noteNames.french,
    maxPitchDeviation: AdvancedSettings.audio.limits.maxPitchDeviation
};
*/
