function translateToChicken() {
    const input = document.getElementById('inputText').value.trim();
    const cluckSound = document.getElementById('cluckSound');

    if (!input) {
        document.getElementById('outputText').textContent = "Bawk?";
        return;
    }

    let chickenTalk = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== ' ') {
            chickenTalk += 'Bawk ';
        } else {
            chickenTalk += '... ';
        }
    }

    document.getElementById('outputText').textContent = chickenTalk + "🐔";

    // Play cluck sound once per word with a delay
    const words = chickenTalk.trim().split(/\s+/);
    console.log(words);
    words.forEach((word, index) => {
        setTimeout(() => {
            cluckSound.currentTime = 0;
            cluckSound.play();
        }, index * 400); // 400ms delay between each
    });
}
