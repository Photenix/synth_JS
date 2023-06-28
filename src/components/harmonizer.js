import beOrSu from '../notes'
import { getADSR } from '../adsr'

let allNote = beOrSu("b")

const harmonizer = () =>{
  const html = `<div class="adsr">
    <div>
      <b>Attack</b>
      <input type="range" id="A" value="0" max="55" step="5">
      <p>0</p>
    </div>
    <div>
      <b>Decay</b>
      <input type="range" id="D" value="0" max="55" step="5">
      <p>0</p>
    </div>
    <div>
      <b>Sustain</b>
      <input type="range" id="S" value="1" max="1" step="any">
      <p>1</p>
    </div>
    <div>
      <b>Release</b>
      <input type="range" id="R" value="0" max="55" step="5">
      <p>0</p>
    </div>
  </div>
  <div class="notes">
    <div class="note">
      <input type="text" value="C4">
    </div>
    <div class="note">
      <input type="text" value="E4">
    </div>
    <div class="note">
      <input type="text" value="G4">
    </div>
    <div class="note">
      <input type="text" value="B4">
    </div>
  </div>
  <button id="music">Put me</button>
  `
  const div = document.createElement("div")
  div.className = "harmony"
  div.innerHTML = html

  onWheelNote(div.querySelectorAll(".note input"))
  onMoveMouse([div])

  div.querySelector("button").addEventListener( "click", soundThis )

  return div
}

const onMoveMouse = nodeInp =>{
  //console.log( nodeInp );
  for (let i = 0; i < nodeInp.length; i++) {
    const element = nodeInp[i];
    const adsr = element.querySelector(".adsr")
    const adsrArr = adsr.querySelectorAll("div")

    for (let x = 0; x < adsrArr.length; x++) {
      const input = adsrArr[x].querySelector("input");
      const val = adsrArr[x].querySelector("p");

      if ( x == 2 ) {
        input.addEventListener("mousemove", () => {
            val.innerText = moveMouse( input )
          }
        )
        continue
      }
      
      input.addEventListener("mousemove", e => {
          let num = Math.pow( moveMouse( input ) ,2 )
          num = num/1000
          if( num > 1 ) e.target.step = 1
          else e.target.step = 5
          num = num % 1 == 0 ?parseInt(num) :num.toFixed(2)
          val.innerText = num
        }
      )
    }  
  }

  function moveMouse( input ) {
    let num = parseFloat(input.value)
    num = num.toFixed(2)
    num = num % 1 == 0 ?parseInt(num) :num
    return num
  }
}

const onWheelNote = ( node ) => {
  for (let i = 0; i < node.length; i++) {
    const element = node[i];
    element.addEventListener("wheel", e => y(e,element))
  }

  const y = ( e, element ) =>{
    let x = 1
    e.deltaY < 0 ?x=1 :x=-1
    const index = allNote.findIndex( n => n == element.value )
    element.value = allNote[index + x]
  }
}

const addHarmonizer = e => {
  document.getElementById("app").appendChild( harmonizer() )
}

const soundThis =  async (e) => {
  getADSR( e, globalThis.synth )
  
  const notes = e.target.parentElement.querySelectorAll("input[type='text']")
  const arrNotes = []

  for (let i = 0; i < notes.length; i++) {
    const element = notes[i].value;
    arrNotes.push(element)
  }

  await globalThis.startMus;
  //synth.triggerAttackRelease(arrNotes, "16n");
  synth.triggerAttackRelease(arrNotes, "4n");
}

export { onWheelNote, onMoveMouse, addHarmonizer, soundThis }