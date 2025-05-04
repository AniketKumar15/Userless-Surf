const container = document.getElementById("legContainer");

function addLegParts(count = 50) {
    for (let i = 0; i < count; i++) {
        const line = document.createElement("pre");
        line.className = "part";
        line.textContent = "|             |";
        container.appendChild(line);
    }
}

// Load initial legs
addLegParts();

// Add more on scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
        addLegParts();
    }
});