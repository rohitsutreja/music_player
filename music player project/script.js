const songs = [
  {
    name: "first",
    displayName: "Dega Jaan",
    artist: "Family Man",
  },
  {
    name: "second",
    displayName: "Ek Bagal",
    artist: "Gangs of Wasseypur",
  },
  {
    name: "third",
    displayName: "Garaj Garaj",
    artist: "Bandish Bandits",
  },
];

const container = document.querySelector(".container");
const singer = document.querySelector(".singer");
const song_name = document.querySelector(".song_name");
const image_container = document.querySelector(".image-container");
const progress_bar = document.querySelector(".progress_bar");
const progress = document.querySelector(".progress");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const play = document.querySelector("#play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const curtime = document.querySelector(".curtime");
const durtime = document.querySelector(".duration");



let isPlaying = false;

function play_song() {
  isPlaying = true;
  play.classList.replace("fa-play","fa-pause");
  play.setAttribute("title", "pause");
  music.play();
}

function pause_song() {
  isPlaying = false;
  play.classList.replace("fa-pause","fa-play");
  play.setAttribute("title", "play");
  music.pause();
}

play.addEventListener("click", () => {
  if (isPlaying) {
    pause_song();
  } else {
    play_song();
  }
});

function load_music(song) {
  song_name.textContent = song.displayName;
  singer.textContent = song.artist;
  music.src = "songs/" + song.name + ".mp3";
  img.src = "img/" + song.name + ".jpg";
}

let current = 0;

function previous() {
  current--;
  if (current < 0) {
    current = songs.length - 1;
  }
  load_music(songs[current]);
  play_song();
}

function next_song() {
  current++;
  if (current > songs.length - 1) {
    current = 0;
  }
  load_music(songs[current]);
  play_song();
}

load_music(songs[1]);

function update(e){
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }


        if (durationSeconds) {
          durtime.textContent = `${durationMinutes}:${durationSeconds}`;
        }


        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }

        curtime.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;

  }

prev.addEventListener("click", previous);
next.addEventListener("click", next_song);
music.addEventListener('timeupdate',update);
progress_bar.addEventListener('click', setProgressBar);
music.addEventListener('ended',next_song);
