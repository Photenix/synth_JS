let adsrObj = {}

// Operaciones matematicas para cada parametro
let adsrConver = [
  (num)=> num,

]

/**
 * 
 * @param {*} A  => Attack
 * @param {*} D  => Decay
 * @param {*} S  => Sustain
 * @param {*} R  => Release
 * @returns 
 */

const envelop = ( A, D, S, R ) => {
  A <= 0 ?A=0.005 :A
  D <= 0 ?D=0.1 :D
  S > 1 ?S=1 :S
  R <= 0 ?R=0.3 :R
  return{
    attack: A,
    attackCurve: "linear",
    decay: D,
    decayCurve: "exponential",
    release: R,
    releaseCurve: "exponential",
    sustain: S
  }
}

const getADSR = (event, synth) => {
  const parent = event.target.parentElement
  const adsr = parent.querySelector(".adsr").querySelectorAll("P")
  const inp = parent.querySelectorAll("input[type=text]")
  //console.log( inp );
  //envolvent
  let env = []
  for (let i = 0; i < adsr.length; i++) {
    const p = parseFloat(adsr[i].innerText)
    env.push( p )
  }
  let [a, d, s, r] = env
  s = s / (inp.length)
  synth.set({ envelope: envelop( a, d, s, r ) })
  //console.log( synth.get().envelope );
}


/*
for (let i = 0; i < harmonies.length; i++) {
  const element = harmonies[i];
  const adsr = element.querySelector(".adsr")
  const adsrArr = adsr.querySelectorAll("div")

  for (let x = 0; x < adsrArr.length; x++) {
    const input = adsrArr[x].querySelector("input");
    const val = adsrArr[x].querySelector("p");

    input.addEventListener("mousemove", () => {
      console.log((input.value).toFixed(3));
      val.innerText = (input.value).toFixed(3)
      }
    )
  }
}
*/



export { envelop, getADSR }