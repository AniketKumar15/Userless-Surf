const cardContainer = document.querySelector(".cardContainer");
const socreBoard = document.querySelector(".score");
const winnerBox = document.querySelector(".winnerBox");
const winSound = document.querySelector(".winnerSound");
const wrongSound = document.querySelector(".wrongSound");
const scoreSound = document.querySelector(".scoreSound");



const imgArray = [
    "https://i.etsystatic.com/13434992/r/il/3bf90f/3219303725/il_1080xN.3219303725_kovf.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/053/242/313/small_2x/endearing-baby-toy-spaniel-dog-sitting-clipart-vector.jpg",
    "https://img.freepik.com/premium-vector/simple-cute-fox-icon_611881-727.jpg?semt=ais_hybrid&w=740",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJv8VFLfAttXRGR4hlitErTffagtzWyEX4_g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSGQ-OicuAqTiKZskYIj0UvY67PTQLt5_5-g&s",
    "https://static.vecteezy.com/system/resources/previews/023/193/490/non_2x/illustration-of-cute-little-baby-penguin-isolated-on-white-animal-clipart-in-flat-style-vector.jpg",
];

// Duplicate and shuffle images
let gameImages = [...imgArray, ...imgArray];

let flippedCards = [];
let lockBoard = false;

// Score Manager
let scores = 0;
let maxScores = imgArray.length;
// let winSound = new Audio("Audio/Winner.wav");
// let scoreSound = new Audio("Audio/scoreSound.wav");
// let wrongSound = new Audio("Audio/wrongSound.wav");


for (let i = gameImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameImages[i], gameImages[j]] = [gameImages[j], gameImages[i]];
}

const callCard = () => {
    gameImages.forEach((imgSrc) => {
        // Create card structure
        const card = document.createElement("div");
        card.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("cardInner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("cardFront");
        const frontImg = document.createElement("img");
        frontImg.src = "./Img/cardImg.jpg"; // Back of card
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement("div");
        cardBack.classList.add("cardBack");
        const backImg = document.createElement("img");
        backImg.src = imgSrc; // Real image
        cardBack.appendChild(backImg);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        cardContainer.appendChild(card);

        // Add flip event


        card.addEventListener("click", () => {
            if (lockBoard || card.classList.contains("flipped")) return;

            card.classList.add("flipped");
            flippedCards.push({ card, imgSrc: backImg.src });

            if (flippedCards.length === 2) {
                lockBoard = true;
                const [first, second] = flippedCards;

                if (first.imgSrc === second.imgSrc) {
                    console.log("✅ Match!");
                    scoreSound.currentTime = 0;
                    scoreSound.play();
                    scores++
                    socreBoard.textContent = "Scores : " + scores;
                    flippedCards = [];
                    lockBoard = false;

                    if (scores === maxScores) {
                        setTimeout(() => {
                            winSound.play();
                            winnerBox.style.display = "block";
                            // or call a reset function here
                        }, 300);
                    }
                } else {
                    console.log("❌ Not a match");
                    wrongSound.play();
                    setTimeout(() => {
                        first.card.classList.remove("flipped");
                        second.card.classList.remove("flipped");
                        flippedCards = [];
                        lockBoard = false;
                    }, 1000); // Flip back after 1 sec
                }
            }
        });

    });
};
callCard();

