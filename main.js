import './style.css'
import './piano.css'
//import './experiment.css'

import bpm from './src/bpm.js'

import * as Tone from 'tone'
import { addHarmonizer } from './src/components/harmonizer.js';
import allPiano from './src/components/piano';

const vol = new Tone.Volume(-24).toDestination();
const synth = new Tone.PolySynth().connect(vol).toDestination();
const monoSyth = new Tone.Synth().toDestination();
const now = Tone.now()


const piano = document.getElementById("piano")
allPiano( piano )

document.addEventListener("DOMContentLoaded", () => {
    globalThis.synth = synth
    globalThis.startMus = Tone.start()
    globalThis.monoSyth = monoSyth
    addHarmonizer()
})

document.getElementById("add_harmony").addEventListener( "click", addHarmonizer )
document.getElementById("bpm_btn").addEventListener('click', bpm )


//con esto puedo mandarles la envolvente
console.log( synth.get() );



synth.set({
	envelope: {
    attack: 0.005,
    attackCurve: "linear",
    decay: 0.1,
    decayCurve: "exponential",
    release: 0.7,
    releaseCurve: "exponential",
    sustain: 0.3
	}
});





