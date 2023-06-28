let firt = false;

let msTime = 0;

let clock

const bpm = e => {
    console.log("here");
    if( !firt ) init()
    else end()
}

const init = () => {
    msTime = 0
    clock = setInterval( () => { 
        msTime += 10
    }, 10);
    firt = true
}

const end = () =>{
    clearInterval( clock )
    firt = false
    const totalBPM = 60/(msTime/1000)
    msTime = 0
    
    document.getElementById("bpm_txt").value = parseInt(totalBPM)
}

export default bpm