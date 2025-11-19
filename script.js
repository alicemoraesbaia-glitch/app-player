const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlistEl = document.getElementById("playlist");

// Playlist
const songs = [
  {
    title: "Música 1",
    artist: "Artista 1",
    src: "musica1.mp3",
    cover: "img/capa1.png",
  },
  {
    title: "Música 2",
    artist: "Artista 2",
    src: "musica2.mp3",
    cover: "img/capa2.png",
  },
  {
    title: "Música 3",
    artist: "Artista 3",
    src: "musica3.mp3",
    cover: "img/capa3.png",
  },
];

let songIndex = 0;

// Preencher playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title + " - " + song.artist;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songIndex);
    playSong();
  });
  playlistEl.appendChild(li);
});

// Carregar música
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;

  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// Play / Pause
function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
  cover.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  cover.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Próxima / Anterior
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Barra de progresso
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Carregar primeira música
loadSong(songIndex);

// Avançar música automaticamente
audio.addEventListener("ended", () => {
  nextBtn.click();
});
