const themes = {
  "galaxy": {
    video: "https://cdn.pixabay.com/video/2016/07/05/742-174336372_large.mp4",
    audio: "https://cdn.pixabay.com/audio/2023/03/08/audio_f4b8399be6.mp3",
    font: "https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
  },
  "lofi": {
    video: "https://cdn.pixabay.com/video/2021/11/29/94651-633758549_large.mp4",
    audio: "https://cdn.pixabay.com/audio/2021/11/08/audio_fa72e7c95a.mp3",
    font: "https://fonts.googleapis.com/css2?family=Comfortaa&display=swap"
  },
  "sci-fi": {
    video: "https://cdn.pixabay.com/video/2022/12/08/142060-784931267_large.mp4",
    audio: "https://cdn.pixabay.com/audio/2022/11/15/audio_0b4918006a.mp3",
    font: "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
  },
  "anime": {
    video: "https://cdn.pixabay.com/video/2022/10/04/132658-761189638_large.mp4",
    audio: "https://cdn.pixabay.com/audio/2022/10/27/audio_417b576144.mp3",
    font: "https://fonts.googleapis.com/css2?family=Handlee&display=swap"
  },
  // Add more as needed...
};

let currentThemeIndex = 0;
const themeKeys = Object.keys(themes);
const video = document.getElementById("background-video");
const audio = document.getElementById("theme-audio");

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  video.src = theme.video;
  audio.src = theme.audio;
  audio.play();

  const fontLink = document.getElementById("theme-font");
  fontLink.href = theme.font;
  document.body.style.fontFamily = "inherit"; // font will load via Google Fonts

  document.getElementById("theme").value = themeName;
}

document.getElementById("theme").addEventListener("change", (e) => {
  currentThemeIndex = themeKeys.indexOf(e.target.value);
  applyTheme(e.target.value);
});

document.getElementById("next-theme").addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
  applyTheme(themeKeys[currentThemeIndex]);
});

// Pomodoro logic
let timer, isStudy = true, currentTime = 0;
const quotes = [
  "Keep going, you're doing great!",
  "Focus is the key to success.",
  "One step at a time.",
  "You are capable of amazing things!",
  "Consistency beats intensity.",
  "Stay positive and work hard!"
];
let quoteIndex = 0;
setInterval(() => {
  document.getElementById('quote').innerText = quotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % quotes.length;
}, 300000);

document.getElementById("start-button").addEventListener("click", () => {
  isStudy = true;
  startPomodoro(parseInt(document.getElementById('study-duration').value) * 60);
});

function startPomodoro(seconds) {
  clearInterval(timer);
  currentTime = seconds;
  updateTimerDisplay();

  timer = setInterval(() => {
    currentTime--;
    updateTimerDisplay();
    if (currentTime <= 0) {
      clearInterval(timer);
      new Audio('https://www.soundjay.com/buttons/sounds/button-29.mp3').play();
      document.getElementById('popup').classList.remove('hidden');
      setTimeout(() => document.getElementById('popup').classList.add('hidden'), 4000);

      if (isStudy) {
        isStudy = false;
        document.getElementById('session-type').innerText = 'Session: Break';
        startPomodoro(parseInt(document.getElementById('break-duration').value) * 60);
      } else {
        isStudy = true;
        document.getElementById('session-type').innerText = 'Session: Study';
        startPomodoro(parseInt(document.getElementById('study-duration').value) * 60);
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60).toString().padStart(2, '0');
  const seconds = (currentTime % 60).toString().padStart(2, '0');
  document.getElementById('timer').innerText = `${minutes}:${seconds}`;
}

// Mode change
document.getElementById('mode').addEventListener('change', function () {
  document.body.className = this.value;
});

// Mute toggle
document.getElementById("toggle-audio").addEventListener("click", () => {
  audio.muted = !audio.muted;
});

// YouTube and local audio
document.getElementById('play-youtube').addEventListener('click', () => {
  const url = document.getElementById('youtube-link').value;
  const videoId = new URL(url).searchParams.get("v");
  const iframe = document.getElementById('youtube-player');
  if (videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.style.display = "block";
  }
});

document.getElementById('local-file').addEventListener('change', (e) => {
  const localAudio = document.getElementById('local-audio');
  localAudio.src = URL.createObjectURL(e.target.files[0]);
  localAudio.play();
});

// Start with default theme
applyTheme("galaxy"); 
