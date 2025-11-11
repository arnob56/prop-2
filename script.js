const intro = document.getElementById("intro");
const line = document.getElementById("line");
const proposal = document.getElementById("proposal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hearts = document.getElementById("hearts");
const music = document.getElementById("bgMusic");

// Typewriter lines
const lines = [
  "Hey, my love Nilu 💖",
  "Do you remember our first meeting?",
  "From that moment, everything changed for me...",
  "You make my world brighter every single day 💫",
  "And today, I have something special to ask you..."
];

let index = 0;

function showLine() {
  if (index < lines.length) {
    line.textContent = "";
    let text = lines[index];
    let i = 0;
    let typing = setInterval(() => {
      line.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(typing);
        index++;
        setTimeout(showLine, 1800);
      }
    }, 60);
  } else {
    setTimeout(() => {
      intro.classList.add("hidden");
      proposal.classList.remove("hidden");
      gsap.from(".proposal", { opacity: 0, y: 50, duration: 1.5 });
    }, 1000);
  }
}
showLine();

// "No" button moves away from cursor
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// When "Yes" clicked
yesBtn.addEventListener("click", () => {
  playMusic();
  confettiBurst();
  createHearts();
  yesBtn.textContent = "She said YES! 💖";
  document.body.innerHTML += `
    <div class="final-message">
      <p>Forever starts now...</p>
    </div>`;
});

// Background music
function playMusic() {
  music.volume = 0.5;
  music.play().catch(() => {
    console.log("Autoplay blocked.");
  });
}

// Floating hearts
function createHearts() {
  for (let i = 0; i < 60; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 3 + "s";
    heart.innerHTML = "💖";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}

// Confetti burst
function confettiBurst() {
  for (let i = 0; i < 40; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = ["🎉", "💝", "✨", "💞"][Math.floor(Math.random() * 4)];
    emoji.style.position = "absolute";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = Math.random() * 50 + "vh";
    emoji.style.fontSize = Math.random() * 30 + 20 + "px";
    emoji.style.animation = "floatUp linear 3s";
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 3000);
  }
}
