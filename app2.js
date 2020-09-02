const form = document.getElementById('form'); 
const query = document.getElementById('query');
const result = document.getElementById('results');
const errorEl = document.getElementById('error');
const API_URL = `https://theaudiodb.com/api/v1/json/1/search.php?s=`; 



async function getData(term){
  const res = await fetch(`${API_URL}${term}`)
  const data = await res.json();
  console.log(data);
  showDataDOM(data);
}



function showDataDOM(data){
  let output = '';
  data.artists.forEach((artist) => {
    output += `
    <div class="row">
      <div class="card-image">
      <img src="${artist.strArtistThumb}">
      <span class="card-title"><strong>${artist.strArtist}</strong></span>
        </div> 
        <p>Country: ${artist.strCountry}</p> 
        <div class="card-content">
        <ul class="songs-ul">
        <li class="item">Genre: ${artist.strGenre}</li>
        <li class="item">Style: ${artist.strStyle}</li>
        <li class="item"></li>
        <li class="item"></li>

        </ul>           
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
    </div> 
    
    `
  })
  result.innerHTML = `${output}`
}




form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const searchTerm = query.value.trim();
  getData(searchTerm);
})







      