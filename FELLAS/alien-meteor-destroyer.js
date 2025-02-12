const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const spaceshipImg = new Image();
spaceshipImg.src = "./image2/spaceship.png";  // Your spaceship image
const meteorImg = new Image();
meteorImg.src = "./image2/meteor.png";  // Your meteor image

const spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 60,   // Adjust size if needed
    height: 60
};

const bullets = [];
const meteors = [];
const meteorSpeed = 3;
const bulletSpeed = 5;
let gameOver = false;
let canRestart = false;

// Move spaceship with mouse
canvas.addEventListener("mousemove", (event) => {
    spaceship.x = event.clientX - spaceship.width / 2;
});

// Shoot bullets when clicking
canvas.addEventListener("click", () => {
    if (!gameOver) {
        bullets.push({ x: spaceship.x + spaceship.width / 2 - 2, y: spaceship.y });
    }
});

// Spawn meteors
function spawnMeteor() {
    const size = Math.random() * 50 + 30; // Random meteor size
    meteors.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size
    });
}

// Game loop
function update() {
    if (gameOver) return;

    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    meteors.forEach((meteor, index) => {
        meteor.y += meteorSpeed;

        if (
            meteor.y + meteor.height >= spaceship.y &&
            meteor.x + meteor.width >= spaceship.x &&
            meteor.x <= spaceship.x + spaceship.width
        ) {
            gameOver = true;
            setTimeout(() => {
                canRestart = true;
                document.getElementById("restartBtn").style.display = "block";
            }, 5000);
        }

        if (meteor.y > canvas.height) meteors.splice(index, 1);
    });

    bullets.forEach((bullet, bulletIndex) => {
        meteors.forEach((meteor, meteorIndex) => {
            if (
                bullet.x < meteor.x + meteor.width &&
                bullet.x + 5 > meteor.x &&
                bullet.y < meteor.y + meteor.height &&
                bullet.y + 10 > meteor.y
            ) {
                bullets.splice(bulletIndex, 1);
                meteors.splice(meteorIndex, 1);
            }
        });
    });

    draw();
}

// Function to Draw Everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Spaceship
    ctx.drawImage(spaceshipImg, spaceship.x, spaceship.y, spaceship.width, spaceship.height);

    // Draw Bullets
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });

    // Draw Meteors
    meteors.forEach((meteor) => {
        ctx.drawImage(meteorImg, meteor.x, meteor.y, meteor.width, meteor.height);
    });

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "40px Comic Sans MS";
        ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Restart game
document.getElementById("restartBtn").addEventListener("click", () => {
    if (canRestart) {
        gameOver = false;
        canRestart = false;
        document.getElementById("restartBtn").style.display = "none";
        bullets.length = 0;
        meteors.length = 0;
    }
});

setInterval(update, 20);
setInterval(spawnMeteor, 1000);
