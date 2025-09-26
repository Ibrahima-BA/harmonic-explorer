// Harmonic Explorer
// Explorateur Harmonique - Application de visualisation et génération de sons harmoniques

import Shape from './shape.js';

// Gestion d'erreur globale pour les ES modules
try {
    new p5(p => {
    const Settings = {
        scaleChangeSecs:            15,
        disappearDistance:          3000,
        volume:                     0.2,    // Set by slider
        vibratoDepth:               0.1,    // Set by slider
        vibratoFreq:                5,      // Set by slider
        numHarmonics:               8,      // Set by slider
        intonation:                 1,      // Set by slider
        speed:                      0.8,    // Set by slider
        keyChangeStyle:             0,      // Set by control
        waveType:                   0,      // Set by control
        vibratoWaveType:            0,      // Set by control
        maxPitchDeviation:          0.1,
        chromaticScaleFreqs: [
            65.41, 69.30, 73.42, 77.78,
            82.41, 87.31, 92.50, 98.00,
            103.83, 110.00, 116.54, 123.47
        ],
        keyNames:                   ['Do', 'Do♯', 'Ré', 'Ré♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'],
        xMargin:                    40,
        waves:                      ['sine', 'triangle', 'sawtooth', 'square']
    };

    let shapes = [];
    let nextShapeCreateTime;
    let keyIndex = 0;
    let nextKeyChangeTime;

    /**
     * Calculates the x coordinate from a harmonic frequency, considering the entire
     * range of frequencies produced in the program.
     * @param harmonicFreq the frequency from which the x coordinate is to be calculated
     * @returns the x coordinate
     */
    function getHarmonicX(harmonicFreq) {
        const freqs = Settings.chromaticScaleFreqs;
        const lowestKeyFundamental = freqs[0];
        const highestKeyFundamental = freqs[freqs.length - 1];
        const highestHarmonicOfHighestKey =
            highestKeyFundamental * Settings.numHarmonics;

        return p.map(harmonicFreq, lowestKeyFundamental, highestHarmonicOfHighestKey,
            Settings.xMargin, p.width - Settings.xMargin * 2);
    }

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        createKnobs();
        p.colorMode(p.HSB);
        nextShapeCreateTime = p.millis();
        nextKeyChangeTime = p.millis() + Settings.scaleChangeSecs * 1000;
    };

    p.draw = function() {
        changeKeyIfNeeded();
        p.background(0);
        p.translate(-p.width / 2, p.height / 2, 0);
        p.scale(1, -1, 1);
        drawHarmonicPaths();
        removeDistantShapes();
        shapes.forEach(shape => {
            shape.draw();
        });
        createNewShapeIfTime();
    };

    function drawHarmonicPaths() {
        for (let hi = 1; hi <= Settings.numHarmonics; ++hi) {
            const freqs = Settings.chromaticScaleFreqs;
            const fundamental = freqs[keyIndex];
            const harmonicFreq = fundamental * hi;
            p.push();
            p.translate(getHarmonicX(harmonicFreq), 0, 0);
            p.fill(0, 0, 32);
            p.plane(2, p.height * 2);
            p.pop();
        }
    }

    function createKnobs() {
        const volume = p.select('#volume');
        volume.value(Settings.volume);
        volume.changed(() => Settings.volume = volume.value());

        function addWaveTypes(select) {
            Settings.waves.forEach(wave => {
                select.option(wave.charAt(0).toUpperCase() + wave.slice(1));
            })
        }
        const wave = p.createSelect();
        wave.parent('waveParent');
        addWaveTypes(wave);
        wave.changed(() => Settings.waveType = wave.elt.selectedIndex);

        const vibratoDepth = p.select('#vibratoDepth');
        vibratoDepth.value(Settings.vibratoDepth);
        vibratoDepth.changed(() => Settings.vibratoDepth = vibratoDepth.value());
        const numHarmonics = p.select('#numHarmonics');

        const vibratoFreq = p.select('#vibratoFreq');
        vibratoFreq.value(Settings.vibratoFreq);
        vibratoFreq.changed(() => Settings.vibratoFreq = vibratoFreq.value());

        const vibratoWave = p.createSelect();
        vibratoWave.parent('vibratoWaveParent');
        addWaveTypes(vibratoWave);
        vibratoWave.changed(() => Settings.vibratoWaveType = vibratoWave.elt.selectedIndex);

        numHarmonics.value(Settings.numHarmonics);
        numHarmonics.changed(() => Settings.numHarmonics = numHarmonics.value());

        const intonation = p.select('#intonation');
        intonation.value(Settings.intonation);
        intonation.changed(() => Settings.intonation = intonation.value());

        const speed = p.select('#speed');
        speed.value(Settings.speed);
        speed.changed(() => Settings.speed = speed.value());

        const keyChange = p.createSelect();
        keyChange.parent('keyChangeParent');
        ["Cycle of fourths", "Incremental", "Random", "None"].forEach(name =>
            keyChange.option(name));
        keyChange.changed(() => Settings.keyChangeStyle = keyChange.elt.selectedIndex);

        displayKey();
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    function changeKeyIfNeeded() {
        if (p.millis() > nextKeyChangeTime) {
            nextKeyChangeTime = p.millis() + Settings.scaleChangeSecs * 1000;
            switch (Settings.keyChangeStyle) {
                case 0:
                    keyIndex = (keyIndex + 5) % 12;
                    break;
                case 1:
                    keyIndex = (keyIndex + 1) % 12;
                    break;
                case 2:
                    keyIndex = p.int(p.random(12));
                    break;
                default:
                // Don’t change the key
            }
            displayKey();
        }
    }

    function displayKey() {
        const keyElement = p.select('#key').elt;
        const keyName = Settings.keyNames[keyIndex];
        
        // S'assurer que l'affichage est correct
        keyElement.innerHTML = keyName;
        keyElement.style.fontFamily = 'Arial, sans-serif';
        keyElement.style.fontWeight = 'bold';
        
        // Debug: afficher dans la console
        console.log('Tonalité actuelle:', keyName);
    }

    function createNewShapeIfTime() {
        if (p.millis() > nextShapeCreateTime) {
            shapes.push(new Shape(p, getHarmonicX,
                Settings.chromaticScaleFreqs[keyIndex], p.width / 40, Settings));
            const delayMin = 100;
            const delayMax = 5000;
            const delayRange = delayMax - delayMin;
            const delay = delayMax - delayRange * Settings.speed;
            nextShapeCreateTime = p.millis() + p.randomGaussian(delay, delay / 2);
        }
    }

    function removeDistantShapes() {
        let deleteIndexes = [];
        for (let i = 0; i < shapes.length; ++i) {
            const shape = shapes[i];
            if (shape.completeRatio(p) >= 1) {
                shape.sound.stop();
                deleteIndexes.push(i);
            }
        }
        for (let i = deleteIndexes.length - 1; i >= 0; --i) {
            shapes.splice(deleteIndexes[i], 1);
        }
    }
    });
} catch (error) {
    console.error('Erreur lors du chargement de l\'Explorateur Harmonique:', error);
    
    // Afficher un message d'erreur à l'utilisateur
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        text-align: center;
        z-index: 1000;
        max-width: 400px;
    `;
    errorDiv.innerHTML = `
        <h3 style="color: #e74c3c; margin-top: 0;">⚠️ Erreur de chargement</h3>
        <p style="color: #333; margin-bottom: 1rem;">
            Une erreur s'est produite lors du chargement de l'application.
        </p>
        <p style="color: #666; font-size: 14px;">
            Veuillez actualiser la page ou utiliser un navigateur plus récent.
        </p>
        <button onclick="location.reload()" style="
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 1rem;
        ">Actualiser</button>
    `;
    document.body.appendChild(errorDiv);
}
