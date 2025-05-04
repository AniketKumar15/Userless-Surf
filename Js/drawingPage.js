const canvas = document.querySelector(".draw-canvas");
const brushWidth = document.querySelector(".strokeWidthRange");
const brushColor = document.querySelector(".strokeColorChange");
const tools = document.querySelectorAll(".toolBox i");
const strokeWidthInput = document.getElementById("strokeWidthInput");
const strokeColorInput = document.getElementById("strokeColorInput");

const ctx = canvas.getContext("2d");

let isDrawing = false;
let penSize = 2;
let eraserSize = 20;
let sizeSlider = 1;
let colorOfBrush = "black";

// Set default active tool (first one)
tools[0].classList.add("activeTool");

// Resize canvas to fit container
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

// Brush settings
brushWidth.addEventListener("change", () => sizeSlider = brushWidth.value);
brushColor.addEventListener("change", () => {
    colorOfBrush = brushColor.value;
    // Update preview color background
    document.querySelector('[data-tool="strokeColor"]').style.background = colorOfBrush;
});

// Drawing logic
canvas.addEventListener("mousedown", () => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = sizeSlider;
    ctx.strokeStyle = colorOfBrush;
});
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// Tool click logic
tools.forEach(tool => {
    tool.addEventListener("click", () => {
        tools.forEach(t => t.classList.remove("activeTool"));
        tool.classList.add("activeTool");

        const toolName = tool.dataset.tool;

        switch (toolName) {
            case "pen":
                sizeSlider = penSize;
                brushWidth.min = 1;
                brushWidth.max = 10;
                brushWidth.value = penSize;
                colorOfBrush = brushColor.value;
                strokeWidthInput.classList.toggle("active");
                updateCursorDot();
                break;
            case "eraser":
                sizeSlider = eraserSize;
                brushWidth.min = 10;
                brushWidth.max = 100;
                brushWidth.value = eraserSize;
                colorOfBrush = "white";
                strokeWidthInput.classList.toggle("active");
                updateCursorDot();
                break;
            case "clear":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                break;
            case "save":
                const link = document.createElement("a");
                link.download = "drawing.png";
                link.href = canvas.toDataURL();
                link.click();
                break;
            case "strokeWidth":
                break;
            case "strokeColor":
                strokeColorInput.classList.toggle("active");
                break;
        }
    });
});

const cursorDot = document.getElementById("cursorDot");

// Update dot size based on brush width
const updateCursorDot = () => {
    cursorDot.style.width = sizeSlider + "px";
    cursorDot.style.height = sizeSlider + "px";
};

// Update position of dot to follow mouse
document.addEventListener("mousemove", (e) => {
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";
});

// Update when brush changes
brushWidth.addEventListener("change", () => {
    sizeSider = brushWidth.value;
    updateCursorDot();
});
brushColor.addEventListener("change", () => {
    colorOfBrush = brushColor.value;
    updateCursorDot();
});

// Call initially to set default size
updateCursorDot();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw canvas content here, e.g., ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial resize to fit the window on load

