const bNumber = document.querySelector(".bNumber");
const musicBtn = document.querySelector(".musicBtn");
musicBtn.classList.add("Play");

const synth = new Tone.Synth().toDestination();
const notes = ["D4", "E4", "F4", "G4", "A5", "C5", "D5", "E5", "F5", "G5"];

let isPlay = false;
let intervalId = null;

function decimalToBinary(decimal) {
    return decimal.toString(2).padStart(10, '0');
}

// This plays notes corresponding to the 1s in the binary number
const notesPlay = (binaryString) => {
    let index = 0;

    const interval = Tone.Transport.scheduleRepeat((time) => {
        if (index < notes.length) {
            if (binaryString[index] === '0') {
                console.log(binaryString[index]);
                synth.triggerAttackRelease(notes[index], "8n", time);
            }
            index++;
        } else {
            Tone.Transport.clear(interval);
            Tone.Transport.stop();
        }
    }, 1);

    Tone.Transport.start();
};

const playMusic = () => {
    let i = 0;
    intervalId = setInterval(() => {
        if (!isPlay) return;
        const binary = decimalToBinary(i);
        bNumber.textContent = binary;
        notesPlay(binary);
        i++;
    }, 600);
};

const stopMusic = () => {
    clearInterval(intervalId);
    bNumber.textContent = "0000000000";
    intervalId = null;
    Tone.Transport.stop();
};

musicBtn.addEventListener("click", () => {
    if (musicBtn.classList.contains("Play")) {
        isPlay = true;
        musicBtn.classList.remove("Play");
        musicBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';

        // Start the audio context immediately (if it's not already started)
        Tone.start();  // This ensures that the audio context is started
        setTimeout(() => {
            playMusic();
        }, 1000);

    } else {
        isPlay = false;
        musicBtn.classList.add("Play");
        musicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        stopMusic();
    }
});

// Optional: Initialize Tone.js as soon as possible
window.addEventListener('click', () => {
    if (!Tone.context.state === 'running') {
        Tone.start(); // This ensures the audio context is initialized
    }
});
