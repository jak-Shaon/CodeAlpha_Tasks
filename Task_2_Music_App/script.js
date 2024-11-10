let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();
let tracks = [];
let isLoading = false;

function fetchDeezerJsonp(url, callback) {
  const script = document.createElement('script');
  script.src = `${url}&output=jsonp&callback=${callback.name}`;
  document.body.appendChild(script);
}

function handleDeezerResponse(data) {
  isLoading = false;
  document.getElementById("loading-indicator").classList.remove("loading");
  if (data && data.data) {
    tracks = data.data; // Store the list of tracks
    displayTracks(tracks);
  } else {
    console.error("No results found");
  }
}

document.getElementById("search-btn").addEventListener("click", () => {
  if (!isLoading) {
    isLoading = true;
    document.getElementById("loading-indicator").classList.add("loading");
    const query = document.getElementById("search-input").value;
    const apiUrl = `https://api.deezer.com/search?q=${query}`;
    fetchDeezerJsonp(apiUrl, handleDeezerResponse);
  }
});

// Add event listener to clear button
document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("search-input").value = "";
  document.getElementById("music-items").innerHTML = "";
});

document.getElementById("play").addEventListener("click", () => {
  if (!isPlaying && tracks.length > 0) {
    playSong(currentSongIndex);
  }
});

document.getElementById("pause").addEventListener("click", () => {
  pauseSong();
});

document.getElementById("next").addEventListener("click", () => {
  nextSong();
});

document.getElementById("prev").addEventListener("click", () => {
  prevSong();
});

document.getElementById("volume-control").addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Function to display the list of tracks
function displayTracks(tracks) {
  const musicItems = document.getElementById("music-items");
  musicItems.innerHTML = ""; // Clear previous results

  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} - ${track.artist.name}`;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      playSong(currentSongIndex);
    });
    musicItems.appendChild(li);
  });
}

// Function to play the selected song
function playSong(index) {
  const track = tracks[index];
  audio.src = track.preview; // Set the preview URL
  audio.play();
  isPlaying = true;

  // Update UI with the current song details
  document.getElementById("song-title").textContent = `${track.title} - ${track.artist.name}`;
  document.getElementById("album-cover").src = track.album.cover_medium;
  document.getElementById("album-cover").style.display = "block";
}

// Function to pause the song
function pauseSong() {
  audio.pause();
  isPlaying = false;
}

// Function to play the next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % tracks.length;
  playSong(currentSongIndex);
}

// Function to play the previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + tracks.length) % tracks.length;
  playSong(currentSongIndex);
}
