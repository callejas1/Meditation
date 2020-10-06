'use strict';
const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  //Time display
  const timeDisplay = document.querySelector('.time-display');
  //Get outline length
  const outlineLength = outline.getTotalLength();
  //Duration
  let fakeDuration = 600;
  const timeSelect = document.querySelectorAll('.time-select button');

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Pick different sounds

  sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  //Select sounds

  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(
        fakeDuration % 60,
      )}`;
    });
  });

  //We create a function to stop and play sound
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  //We can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60); // will restart count once it reaches 0
    let minutes = Math.floor(elapsed / 60);

    //Animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    //Animate the bar (circle)
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  };
};

app();
