let timer;
let isStudy = true;
let quotes = [
  "Keep going, you're doing great!",
  "Focus is the key to success.",
  "One step at a time.",
  "You are capable of amazing things!",
  "Consistency beats intensity.",
  "Stay positive and work hard."
];
let quoteIndex = 0;

function updateQuote() {
  document.getElementById('quote').innerText = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}
setInterval(updateQuote, 300000); // every 5 mins

document.getElementById('start-button').addEventListener('click', () => {
  clearInterval(timer);
  let minutes = parseInt(document.getElementById('study-duration').value);
  startCountdown(minutes * 60);
});

function startCountdown(seconds) {
  const timerEl = document.getElementById('timer');
  timer = setInterval(() => {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    timerEl.innerText = \`\${min.toString().padStart(2, '0')}:\${sec.toString().padStart(2, '0')}\`;
    if (seconds-- <= 0) {
      clearInterval(timer);
      new Audio('https://www.soundjay.com/buttons/sounds/button-29.mp3').play();
      document.getElementById('popup').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('popup').classList.add('hidden');
      }, 5000);
    }
  }, 1000);
}

document.getElementById('mode').addEventListener('change', function () {
  document.body.className = this.value;
});

document.getElementById('play-youtube').addEventListener('click', () => {
  const url = document.getElementById('youtube-link').value;
  const videoId = url.split('v=')[1];
  const iframe = document.getElementById('youtube-player');
  iframe.src = \`https://www.youtube.com/embed/\${videoId}?autoplay=1\`;
  iframe.style.display = "block";
});

document.getElementById('local-file').addEventListener('change', (e) => {
  const audio = document.getElementById('local-audio');
  audio.src = URL.createObjectURL(e.target.files[0]);
  audio.play();
});
