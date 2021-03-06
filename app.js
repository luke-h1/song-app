const form = document.getElementById('form');
const query = document.getElementById('query');
const result = document.getElementById('results');
const pagination = document.getElementById('more');
const errorEl = document.getElementById('error');
const API_URL = `https://api.lyrics.ovh`;


function showError(message){
  errorEl.innerHTML = message;
  setTimeout(() => { 
    errorEl.innerHTML = ''; 
  }, 2000)
}

async function getSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

async function songPaginationFetch(url) {
  const MOD_URL = `https://cors-anywhere.herokuapp.com/${url}`;
  const res = await fetch(MOD_URL);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  let output = '';
  data.data.forEach((song) => {
    output += ` 
    <div class="grid-container"> 
      <div class="card"> 
          <h3 class="card-title">${song.artist.name}</strong> - ${song.title}</h3> 
          <div class="list-item"> 
          <img src="${song.album.cover}" class="card-image"/> 
          <ul class="songs">
              <button class="btn" data-artist=${song.artist.name} data-songtitle="${song.title}">Get Lyrics </button>                               
            </ul>  
            <div class="link-item">
            <br>
            <a href="${song.artist.link}" target="_blank" class="link"><button class="btn">Go To Artist</button><a/>   
            </div> 
            <div class="preview-container"> 
          </div> 
          </div> 
          </div> 
          </div> 
    `;

    if (data.prev || data.next) {
      pagination.innerHTML = `
  ${
    data.prev
      ? `<button class="btn" onClick="songPaginationFetch(${data.prev})">Previous</button`
      : ''
  } 
  ${
    data.next
      ? `<button class="btn" onClick="songPaginationFetch(${data.next})">Next</button`
      : ''
  }
      `;
    } else {
      pagination.innerHTML = '';
    }
  });
  result.innerHTML = `<ul>${output}</ul>`;
}

async function getLyrics(artist, title) {
  const res = await fetch(`${API_URL}/v1/${artist}/${title}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  result.innerHTML = `
  <h2><strong>${artist}</strong> - ${title}</h2> 
  <span>${lyrics}</span>`;
  pagination.innerHTML = '';
}

// EVENT LISTENERS
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = query.value.trim();
  if (!searchTerm) {
    showError('enter a valid song / artist')
  } else {
    getSongs(searchTerm);
  }
});

// get song lyric button
result.addEventListener('click', (e) => {
  console.log(e.target);
  const clickedEl = e.target;
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const title = clickedEl.getAttribute('data-songtitle');
    getLyrics(artist, title);
  }
});