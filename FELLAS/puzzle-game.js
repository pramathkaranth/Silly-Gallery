const puzzleContainer = document.getElementById("puzzle-container");
const overlay = document.getElementById("win-overlay");
const winText = document.getElementById("win-text");
const restartButton = document.getElementById("restart-button");
const imagePath = "puzzle.jpg";  

let positions = Array.from({ length: 16 }, (_, i) => i); 
let shuffledPositions = [...positions];

function createPuzzle() {
    puzzleContainer.innerHTML = "";
    shuffledPositions.forEach((pos, index) => {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url(${imagePath})`;
        piece.style.backgroundPosition = `${-100 * (pos % 4)}px ${-100 * Math.floor(pos / 4)}px`;
        piece.draggable = true;
        piece.dataset.index = index;

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);

        puzzleContainer.appendChild(piece);
    });
}

let draggedIndex = null;

function dragStart(event) {
    draggedIndex = Number(event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let targetIndex = Number(event.target.dataset.index);

    [shuffledPositions[draggedIndex], shuffledPositions[targetIndex]] = 
    [shuffledPositions[targetIndex], shuffledPositions[draggedIndex]];

    createPuzzle();
    
    setTimeout(checkWin, 300); // Delay checkWin slightly to allow re-render
}

function shufflePuzzle() {
    do {
        shuffledPositions.sort(() => Math.random() - 0.5);
    } while (isSolved()); // Make sure it doesn't start solved
    createPuzzle();
    overlay.style.display = "none";  // Hide overlay on shuffle
}

function isSolved() {
    return shuffledPositions.every((val, index) => val === positions[index]);
}

function checkWin() {
    if (isSolved()) {
        overlay.style.display = "flex"; // Show win screen
        startBigCelebration(); // Start full-screen effects
    }
}

// Restart game
restartButton.addEventListener("click", () => {
    overlay.style.display = "none";
    shufflePuzzle();
});

// Full-screen celebration
function startBigCelebration() {
    for (let i = 0; i < 200; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("big-confetti");
        document.body.appendChild(confetti);

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

        setTimeout(() => confetti.remove(), 3000);
    }
}

// Initialize game
shufflePuzzle();
