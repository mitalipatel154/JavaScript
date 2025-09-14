const eventDate = new Date("Jan 1, 2026 00:00:00").getTime();
let countdownElement = document.getElementById("countdown");
let toggleBtn = document.getElementById("toggleCountdown");
let timer;
let isRunning = true;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(timer);
        countdownElement.textContent = "Time’s up! The event has started 🎉";
        toggleBtn.textContent = "Restart";
        isRunning = false;
        return;
    }

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.textContent =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

updateCountdown();
timer = setInterval(updateCountdown, 1000);
toggleBtn.textContent = "Pause";

toggleBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        toggleBtn.textContent = "Resume";
        isRunning = false;
    } else {
        timer = setInterval(updateCountdown, 1000);
        toggleBtn.textContent = "Pause";
        isRunning = true;
    }
});



const quotes = [
    "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    "Be brave to stand for what you believe in even if you stand alone",
    "If you're walking down the right path and you're willing to keep walking, eventually you'll make progress.",
    "Passion is energy. Feel the power that comes from focusing on what excites you.",
    "Push yourself, because no one else is going to do it for you.",
    "We have to continually be jumping off cliffs and developing our wings on the way down."
];
let quoteIndex = 0;
let quoteElement = document.getElementById("quote");
let quoteTimer;

function showQuote(index) {
    quoteElement.textContent = quotes[index];
}

function startQuoteSlider() {
    quoteTimer = setInterval(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        showQuote(quoteIndex);
    }, 4000);
}

document.getElementById("prevQuote").addEventListener("click", () => {
    clearInterval(quoteTimer);
    quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
    showQuote(quoteIndex);
    startQuoteSlider();
});

document.getElementById("nextQuote").addEventListener("click", () => {
    clearInterval(quoteTimer);
    quoteIndex = (quoteIndex + 1) % quotes.length;
    showQuote(quoteIndex);
    startQuoteSlider();
});

showQuote(quoteIndex);
startQuoteSlider();

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");

setTimeout(() => {
    modal.style.display = "flex";
}, 5000);

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});