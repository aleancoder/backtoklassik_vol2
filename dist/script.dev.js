"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var tracks = [{
  title: 'Chains',
  src: './audio/Chains.mp3'
}, {
  title: 'Connection',
  src: './audio/Connection.mp3'
}, {
  title: 'Lazy Funk',
  src: './audio/Lazy Funk.mp3'
}];
var audio = document.getElementById('audio');
var playPauseBtn = document.getElementById('play-pause');
var seek = document.getElementById('seek');
var currentTimeEl = document.getElementById('current-time');
var durationEl = document.getElementById('duration');
var tracklistEl = document.getElementById('tracklist');
var currentTrackIndex = 0; // Отображение треков

tracks.forEach(function (track, index) {
  var li = document.createElement('li');
  li.textContent = track.title;
  li.addEventListener('click', function () {
    loadTrack(index);
    audio.play();
  });
  tracklistEl.appendChild(li);
});

function loadTrack(index) {
  currentTrackIndex = index;
  audio.src = tracks[index].src;
  updateTracklistUI();
}

function updateTracklistUI() {
  _toConsumableArray(tracklistEl.children).forEach(function (li, idx) {
    li.classList.toggle('active', idx === currentTrackIndex);
  });
}

function formatTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = Math.floor(seconds % 60);
  return "".concat(min, ":").concat(sec.toString().padStart(2, '0'));
}

audio.addEventListener('loadedmetadata', function () {
  seek.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
});
audio.addEventListener('timeupdate', function () {
  seek.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});
seek.addEventListener('input', function () {
  audio.currentTime = seek.value;
});
playPauseBtn.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});
audio.addEventListener('ended', function () {
  var next = (currentTrackIndex + 1) % tracks.length;
  loadTrack(next);
  audio.play();
}); // Загрузка первого трека по умолчанию

loadTrack(0);