const bubbleGrid = document.getElementById('bubbleGrid');
const popSound = document.getElementById('popSound');
const allPop = document.getElementById('allPop')
const totalBubbles = 21 * 8; // 8x8 grid

function createBubbles() {
    bubbleGrid.innerHTML = '';
    for (let i = 0; i < totalBubbles; i++) {
        const bubble = document.createElement('button');
        bubble.className = 'bubble';
        bubble.addEventListener('click', () => {
            if (!bubble.classList.contains('popped')) {
                bubble.classList.add('popped');
                popSound.currentTime = 0;
                popSound.play();
            }
        });
        bubbleGrid.appendChild(bubble);
    }
}

document.getElementById('reset').addEventListener('click', createBubbles);

createBubbles(); // initial load

allPop.addEventListener("click", () => {
    let bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach((bubble, index) => {
        if (!bubble.classList.contains('popped')) {
            setTimeout(() => {
                bubble.classList.add('popped');
                popSound.currentTime = 0;
                popSound.play();
            }, index * 50); // Delay for sequential sound effect
        }
    });
});