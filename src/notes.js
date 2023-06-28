let baseNote = ['C','D','E','F','G','A','B']

//bemol or sustain
/**
 * 
 * @param {*} chose = options = b or #
 */
const beOrSu = ( chose ) => {
  const NOTES = []

  for (let i = 1; i < 7; i++) {
    for (let x = 0; x < baseNote.length; x++) {
      const note = baseNote[x]
      if( x != 0 && x != 3 && chose == "b") NOTES.push( `${note}b${i}` )
      NOTES.push( baseNote[x]+i )
      if( x != 2 && x != 6 && chose == "#") NOTES.push( `${note}#${i}` )
    }
  }

  return NOTES
}


export default beOrSu