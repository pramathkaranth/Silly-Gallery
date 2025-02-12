const quotes = [
    "Cup Noodles 😍",
    "Hum 2 humare 2 (Friends Bro)",
    "Saar .. Car .. Machines .. Engines .. aste Saar",
    "Bromance Peaks",
    "Yake Guru? 😭",
    "Not Sappy Anymore 😞",
    "Oota ? Oota Ayta?"
];

const totalImages = 7;
let currentIndex = 0;

function showQuoteAndImage() {
    const quoteElement = document.getElementById("quote");
    const imageElement = document.getElementById("bestie-image");

    quoteElement.textContent = quotes[currentIndex];
    imageElement.src = `images/${currentIndex + 1}.jpg`;

    currentIndex = (currentIndex + 1) % totalImages;
    quoteElement.style.opacity = 1;
}

// VIP Message Function
function showVIPMessage() {
    const vipMessage = document.getElementById("vip-message");

    if (vipMessage.style.display === "none" || vipMessage.style.display === "") {
        vipMessage.textContent = "Before appreciating the work, please hereby know that I was emotionally, mentally, and psychologically tormented by Ms. Nidhi S Kannemadugu. I have undergone immense pressure and blackmailing while creating this website.";
        vipMessage.style.display = "block";
    } else {
        vipMessage.style.display = "none";
    }
}
