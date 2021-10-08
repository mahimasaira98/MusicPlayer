const audio = document.querySelector('audio');
const playPauseButton = document.querySelector('.play-pause');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#previous');
const songList = document.querySelector('.song-list');
const title = document.querySelector('#title');
const record = document.querySelector('.record');
const volSlider = document.querySelector('.slider');


let songArray = [];
let songHeading = '';
let songIndex = 0;
let isPlaying = false;



function loadAudio() {
    audio.src = songArray[songIndex];
    let songListItems = songList.getElementsByTagName('li')
    songHeading = songListItems[songIndex].getAttribute('data-name');
    title.innerText = songHeading



    //Highlight
    for (i = 0; i < songListItems.length; i++) {
        if (i == songIndex) {
            songList.getElementsByTagName('li')[songIndex].classList.add('active');
        }
        else {
            songListItems[i].classList.remove('active');
        }
    }

}

playPauseButton.addEventListener('click', function () {
    if (isPlaying) {
        pauseAudio();
    }
    else {
        playAudio();
    }
});

nextButton.addEventListener('click', function () {
    
    nextSong();

}, false);

prevButton.addEventListener('click', function () {
    
    previouSong();

}, false);

songList.addEventListener('click',function(){
    songIndex = event.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();
},false);



function loadSongs() {
    let songs = songList.getElementsByTagName('li');
    for (i = 0; i < songs.length; i++) {
        songArray.push(songs[i].getAttribute('data-src'));
    }

    loadAudio();
}

loadSongs();



function playAudio() {
    audio.play();
    playPauseButton.querySelector('i.fas').classList.remove('fa-play');
    playPauseButton.querySelector('i.fas').classList.add('fa-pause');
    isPlaying = true;
    record.classList.add('record-animation');

}

function pauseAudio() {
    audio.pause();
    playPauseButton.querySelector('i.fas').classList.remove('fa-pause');
    playPauseButton.querySelector('i.fas').classList.add('fa-play');
    isPlaying = false;
    record.classList.remove('record-animation');

}

function nextSong() {
    songIndex++;
    if (songIndex > 5) {
        songIndex = 0;
    }
    loadAudio();
    playAudio();
}

function previouSong() {
    songIndex = songIndex - 1;
    if (songIndex < 0) {
        songIndex = songArray.length - 1;
    }
    loadAudio();
    playAudio();
}

audio.addEventListener('ended',function(){
    songIndex++;
    loadAudio();
    playAudio();
},false);


function Volume(){
    audio.volSlider();
}

volSlider.addEventListener('input', function(){
    audio.volume = volSlider.value / 100;
},false);