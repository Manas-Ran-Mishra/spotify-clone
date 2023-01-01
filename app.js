let songs = [
  {
    songname: 'acoustic-guitars',
    filepath:
      './songs/acoustic-guitars-ambient-uplifting-background-music-for-videos-5642.mp3',
    coverpath: './images/covers/1.jpg',
  },
  {
    songname: 'flaing-piano',
    filepath: './songs/flaing-piano-main-8783.mp3',
    coverpath: './images/covers/2.jpg',
  },
  {
    songname: 'tango',
    filepath:
      './songs/acoustic-guitars-ambient-uplifting-background-music-for-videos-5642.mp3',
    coverpath: './images/covers/3.jpg',
  },
  {
    songname: 'classic-and-cultural',
    filepath: './songs/flaing-piano-main-8783.mp3',
    coverpath: './images/covers/4.jpg',
  },
  {
    songname: 'elegance-efficient',
    filepath: './songs/flaing-piano-main-8783.mp3',
    coverpath: './images/covers/5.jpg',
  },
];
let audioElement = new Audio();
let songName = Array.from(document.getElementsByClassName('song-name'));
let coverImage = Array.from(document.getElementsByClassName('cover-img'));
let durationElements = Array.from(document.getElementsByClassName('duration'));
let playButtons = Array.from(document.getElementsByClassName('play-button'));
let currentCoverImg = document.getElementById('master-cover');
let currentSongDur = document.getElementById('currentSongDuration');
let masterPlayButton = document.getElementById('play_pause');
let playPrevious = document.getElementById('previous');
let playNext = document.getElementById('next');
let durationArr = new Array();
let currentDuration, durationTemp;
let songID,
  currentSongID = '0';
async function myFunc() {
  for (let i = 0; i < songs.length; i++) {
    audioElement.src = songs[i].filepath;
    // console.log('array');
    durationTemp = await getDuration();
    durationArr.push(durationTemp);
  }
  // console.log(durationArr.length);
  // console.log(durationElements.length);
  if (durationArr.length === durationElements.length) {
    for (let i = 0; i < durationArr.length; i++) {
      songName[i].innerHTML = songs[i].songname;
      coverImage[i].innerHTML = `<img src="${songs[i].coverpath}" alt="" />`;
      durationElements[i].innerHTML = durationArr[i];
    }
  }
  audioElement.src = songs[currentSongID].filepath;
}
function getDuration() {
  return new Promise((resolve, reject) => {
    audioElement.onloadedmetadata = () => {
      minutes = String(Math.floor(audioElement.duration / 60));
      seconds = String(Math.floor(audioElement.duration % 60)).padStart(2, '0');
      currentDuration = `${minutes}:${seconds}`;
      // console.log('duration');
      // duration.push();
      // durationElements[i].innerHTML = `${minutes}:${seconds}`;
      resolve(currentDuration);
    };
  });
  // return currentDuration;
}

myFunc();

// audioElement.onloadedmetadata = () => {
//   console.log(audioElement.duration);
//   console.log(songs.length);
//   songs.forEach((obj) => {
//     // console.log(obj);
//     audioElement.src = obj.filepath;
//     console.log(audioElement.src);
//   });
// };
// for (let i = 0; i <= songs.length; i++) {
//   audioElement.src = songs[i].filepath;
// durationElements.forEach((element) => {
//   minutes = String(Math.floor(audioElement.duration / 60));
//   seconds = String(Math.floor(audioElement.duration % 60)).padStart(2, '0');
//   element.innerHTML = `${minutes}:${seconds}`;
//   // console.log(songs.length);

//   console.log(audioElement.src);
// });
// };

// Was used for testing

//   console.log();
// function myPlayButton() {
//   if (audioElement.paused) {
//     console.log('played');

//     console.log(audioElement.duration);
//     audioElement.play();
//     document.getElementById('play_pause').classList.remove('fa-play-circle');
//     document.getElementById('play_pause').classList.add('fa-pause-circle');
//     Array.from(document.getElementsByClassName('fa-play')).forEach(
//       (element) => {
//         element.classList.remove('fa-play');
//         element.classList.add('fa-pause');
//       }
//     );
//   } else {
//     console.log('paused');

//     audioElement.pause();
//     document.getElementById('play_pause').classList.remove('fa-pause-circle');
//     document.getElementById('play_pause').classList.add('fa-play-circle');
//     Array.from(document.getElementsByClassName('fa-pause')).forEach(
//       (element) => {
//         element.classList.remove('fa-pause');
//         element.classList.add('fa-play');
//       }
//     );
//   }
// }

// Handling click event

masterPlayButton.addEventListener('click', (_) => {
  playPause(document.getElementById(currentSongID));
});

playPrevious.addEventListener('click', (_) => {
  if (
    currentSongID === undefined ||
    currentSongID === null ||
    currentSongID === '0'
  ) {
    currentSongID = '5';
  }
  currentSongID = (parseInt(currentSongID) - 1).toString();

  getNextOrPreviousSong();
  makeAllPlays('any');
  playPause(document.getElementById(currentSongID));
  currentCover();
});

playNext.addEventListener('click', () => {
  if (
    currentSongID === undefined ||
    currentSongID === null ||
    currentSongID === '4'
  ) {
    currentSongID = '-1';
  }
  currentSongID = (parseInt(currentSongID) + 1).toString();
  getNextOrPreviousSong();
  makeAllPlays('any');
  playPause(document.getElementById(currentSongID));
  currentCover();
});

playButtons.forEach((playButton) => {
  playButton.addEventListener('click', (clickEvent) => {
    if (
      currentSongID === undefined ||
      currentSongID === null ||
      currentSongID !== getSongID(clickEvent)
    ) {
      makeAllPlays(clickEvent.target);
      currentSong(clickEvent);
      playPause(clickEvent.target);
      currentCover();
    } else if (currentSongID === getSongID(clickEvent)) {
      playPause(clickEvent.target);
    }

    // console.log('clickEvent');
    // songID = await getSongID(clickEvent);
    // audioElement.src = songs[songID].filepath;
  });
});
function makeAllPlays(_playButton) {
  playButtons.forEach((tempElement) => {
    tempElement.classList.add('fa-play');
  });
  // playButton.classList.remove('fa-play');
  // playButton.classList.add('fa-pause');
}
function currentSong(clickEvent) {
  currentSongID = getSongID(clickEvent);
  audioElement.src = songs[currentSongID].filepath;
  // audioElement.src = songs[getSongID(clickEvent)].filepath;
}
function getNextOrPreviousSong() {
  // console.log(currentSongID);

  audioElement.src = songs[currentSongID].filepath;
}
function getSongID(clickEvent) {
  // console.log(clickEvent.target.id);

  return clickEvent.target.id;
  // return new Promise((resolve, reject) => {
  // resolve(getButtonId(clickEvent));
  // }).catch((err) => console.log(err));
}
function playPause(playButton) {
  // console.log(`songID-${currentSongID}`);
  makeAllInactice();
  makeCurrentActive(playButton);

  if (audioElement.paused) {
    // console.log('if block');

    audioElement.play();
    playButton.classList.remove('fa-play');
    playButton.classList.add('fa-pause');
    masterPlayButton.classList.remove('fa-play-circle');
    masterPlayButton.classList.add('fa-pause-circle');
  } else {
    // console.log('else block');
    audioElement.pause();
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
    masterPlayButton.classList.remove('fa-pause-circle');
    masterPlayButton.classList.add('fa-play-circle');
  }
}

function makeAllInactice() {
  playButtons.forEach((playButton) => {
    playButton.classList.remove('active');
  });
}

function makeCurrentActive(playButton) {
  playButton.classList.add('active');
}

function currentCover() {
  currentCoverImg.src = songs[currentSongID].coverpath;
  // console.log(`cover-${currentCoverImg.src}, songID-${currentSongID}`);
}
// async function getButtonId(clickEvent) {
//   console.log(clickEvent.target);

//   return clickEvent.target.id;
// }
// Array.from(document.getElementsByClassName('play-button')).forEach((element) =>
//   element.addEventListener('click', (e) => {
//     console.log(e.target.classList);
//     if (audioElement.paused) {
//       console.log('played');

//       audioElement.play();
//       if (e.target.id === 'play_pause') {
//         e.target.classList.remove('fa-play-circle');
//         e.target.classList.add('fa-pause-circle');
//       }
//       element.classList.remove('fa-play');
//       element.classList.add('fa-pause');
//     } else {
//       console.log('paused');

//       audioElement.pause();
//       if (e.target.id === 'play_pause') {
//         e.target.classList.remove('fa-pause-circle');
//         e.target.classList.add('fa-play-circle');
//       }
//       element.classList.remove('fa-pause');
//       element.classList.add('fa-play');
//     }
//   })
// );
