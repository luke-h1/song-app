const form = document.getElementById('form');
const query = document.getElementById('query');
const result = document.getElementById('results');
const pagination = document.getElementById('more');
const API_URL = `https://api.lyrics.ovh`;

async function getSongs(term) {
  const res = await fetch(`${API_URL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

// getSongs('drake')

function showData(data) {
  let output = '';
  data.data.forEach((song) => {
    output += `
    <ul class="songs">
    <li><span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <div class="btn-container"> 
    <button class="btn" data-artist=${song.artist.name} data-songtitle="${song.title}">Get Lyrics </button> 
    </div> 
    </li> 
    </ul>
        `;
  });
  result.innerHTML = `<ul>${output}</ul>`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = query.value.trim();
  if (!searchTerm) {
    console.log('123456');
  } else {
    getSongs(searchTerm);
  }
});
