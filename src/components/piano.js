import beOrSu from "../notes"

const notes = beOrSu("#")

let keyNotes = "zsxdcvgbhnjmq2w3er5t6y7ui"
keyNotes = keyNotes.split('')

let numNote = 0
let nK = 7

const octave = () => {
    const oct = document.createElement("octave")
    const kW = document.createElement("key-white")
    const kB  = document.createElement("key-black")

    for (let i = 0; i < nK; i++) {
        addKey( kW, notes[ numNote + 12], keyNotes[numNote] )
        numNote++
        if( i == 0 || i == 2 ){
            addKey( kB, 0, "a", true)
        }
        if( i != 2  && i != 6 && i != 7 ) {
            addKey( kB, notes[ numNote + 12], keyNotes[numNote] )
            numNote++
        }
    }

    oct.append( kW )
    oct.append( kB )

    return oct
}

const allPiano = ( node ) =>{
    for (let i = 0; i < 1; i++) {
        node.append( octave() )
    }
    nK++
    node.append( octave() )

    for (let i = 0; i < keyNotes.length; i++) {
        const key = keyNotes[i];
        document.addEventListener("keydown", e => {
            if( key === e.key ) playPiano( notes[ i + 12] )
        })
    }
}


const addKey = ( node, note, key, bool = false ) =>{
    const btn = document.createElement("button")
    btn.value = note

    if ( bool ) {
        btn.value = 0;
        node.append( btn )
        return btn
    }

    document.addEventListener("keypress", e =>{
        if( key == e.key ) btn.className = "activate"
    })

    document.addEventListener("keyup", e =>{
        if( key == e.key ) btn.className = ''
    })

    btn.addEventListener("click", e =>{
        playPiano(btn.value)
    })
    node.append( btn )
}

const playPiano = ( note ) => {
    console.log( note );
    globalThis.monoSyth.triggerAttackRelease(note, "4n");
}


export default allPiano
