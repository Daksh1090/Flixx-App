// de4f638120dcadf919b8e8ffa729673c
const global = {
  curretPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalpage: 1,
    totalResults: 0
  },
};


const popularMovieImg = document.querySelectorAll('.card-img-top')

//Show current Active nav Option
function activeLinks() {
  const links = document.querySelectorAll('.nav-link')
  links.forEach((link) => {
    if (link.getAttribute('href') === global.curretPage) {
      link.classList.add('active')
    }
  })
}

//Disaplay Top 20 popular Movies
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular');
  // console.log(results)
  results.forEach(movie => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${movie.backdrop_path
        ?
        `<img
              src="https://image.tmdb.org/t/p/original${movie.backdrop_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
        :
        `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
      }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date
      }</small>
            </p>
          </div>
        `
    document.getElementById('popular-movies').appendChild(div)
  })
}

//Display Top 20 popular TV Show
async function displayPopularTv() {
  const { results } = await fetchApiData('tv/popular')
  console.log(results)
  results.forEach(tv => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML =
      `
          <a href="tv-details.html?id=${tv.id}">
            ${tv.backdrop_path
        ?
        `
                 <img
              src="https://image.tmdb.org/t/p/w500${tv.backdrop_path}"
              class="card-img-top"
              alt="${tv.name}"
            />`
        :
        `
             <img
              height="148px" src="images/no-image.jpg"
              class="card-img-top"
              alt="${tv.name}"
            />`
      }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${tv.first_air_date
      }</small>
            </p>
          </div>
        `
    document.getElementById("popular-shows").appendChild(div)
  })
}


//Display Movie Details

async function displayMovieDatails() {
  const id = window.location.search.split('=')[1]
  const movie = await fetchApiData(`movie/${id}`)

  displayBackDrops('movie', movie.backdrop_path)
  console.log(movie)
  const div = document.createElement('div');
  div.innerHTML =
    `
    <div class="details-top">
          <div>
          ${movie.backdrop_path
      ?
      `<img
              src="https://image.tmdb.org/t/p/original${movie.poster_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
      :
      `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
    }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)
    } / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genres) => `<li>${genres.name}`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.
      budget.toLocaleString('en-US')}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString('en-US')}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((companie) => companie.name).join(', ')}</div>
        </div>
    `
  document.getElementById('movie-details').appendChild(div)
}


// Display TV Show Details
async function displayTvShowDetails() {
  const id = window.location.search.split('=')[1]

  const show = await fetchApiData(`tv/${id}`)
  console.log(show)
  const div = document.createElement('div')
  div.innerHTML =
    `
     <div class="details-top">
     <div>
            ${show.backdrop_path
      ?
      `
                <img
              src="https://image.tmdb.org/t/p/w500${show.backdrop_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
      :
      `
            <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
    }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genres) => `<li>${genres.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_air_date}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company) => company.name).join(', ')}</div>
        </div>
      </div>
        `
  document.getElementById('show-details').appendChild(div)
}


// Display backDrops In detail page
function displayBackDrops(type, path) {
  const overlayDiv = document.createElement('div')
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`

  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overlayDiv)
  } else {
    document.getElementById('show-details').appendChild(overlayDiv)
  }
}

//Display Slide Of Movie

async function displaySlideMovies() {
  const { results } = await fetchApiData('movie/now_playing')
  // console.log(results[0])

  results.forEach(movie => {
    const sliderDiv = document.createElement('sliderDiv')
    sliderDiv.classList.add('swiper-slide')

    sliderDiv.innerHTML =
      `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
    `
    document.querySelector('.swiper-wrapper').appendChild(sliderDiv)
    initeSwiper();
  })
}


function initeSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}


async function search() {
  const queryStrig = window.location.search;
  const urlParam = new URLSearchParams(queryStrig)
  global.search.type = urlParam.get('type')
  global.search.term = urlParam.get('search-term')

  
  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await fetchSearchData();

    global.search.page = page;
    global.search.totalpage = total_pages;
    global.search.totalResults = total_results; 

    console.log(total_pages)
    console.log(page)
    if(results.length === 0){
      alertShow("No Result Found");
      return;
    }

    displaySearchedResults(results)

  } else {
    alertShow("Plase enter name first");
  }

}


function displaySearchedResults(data){
  
  document.querySelector('#search-results').innerHTML = ''
  data.forEach((item) => {

    const searchDiv = document.createElement('div')
    searchDiv.classList.add('card')
    searchDiv.innerHTML = 
  `
          <a href="${global.search.type}-details.html?id=${item.id}">
           ${
            item.backdrop_path
            ?
            `<img src="https://image.tmdb.org/t/p/original${item.poster_path}" class="card-img-top" alt="" />`
            :
            `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${global.search.type === 'movie' ? item.title : item.name}"
              />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? item.title : item.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type === 'movie' ? item.release_date : item.first_air_date}</small>
            </p>
          </div>
  `
  document.getElementById('search-results-heading').innerHTML = `
  <h2>${data.length} of ${global.search.totalResults} for ${global.search .term}</h2>`

  document.getElementById('search-results').appendChild(searchDiv)
  })
  displayPagesOfSearch();
}


function displayPagesOfSearch(){

  const pageDiv = document.createElement('div')
  pageDiv.classList.add('pagination')
 
  pageDiv.innerHTML =`
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalpage}</div>
  `

  document.querySelector('#search-results').appendChild(pageDiv)

  if(global.search.page === 1){
    document.querySelector('#prev').disabled = true
  }
  if(global.search.page === global.search.totalpage){
    document.querySelector('#next').disabled = true
  }

  document.querySelector("#next").addEventListener('click', async () => {
    global.search.page++;
    const {results} = await fetchSearchData();
  
    displaySearchedResults(results)
  })

  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
   const {results} = await fetchSearchData();

   displaySearchedResults(results)
  })
 
}

function alertShow(message, classname){
  const alert = document.createElement('alert');
  alert.appendChild(document.createTextNode(message))
  alert.classList.add('alert', classname)
  document.querySelector('#alert').appendChild(alert)
  
  setTimeout(()=>{
    alert.remove();
  },3000)
}

//Fetch data using api
async function fetchApiData(endpoint) {
  const API_KEY = 'de4f638120dcadf919b8e8ffa729673c';
  const API_LINK = 'https://api.themoviedb.org/3/';

  const responce = await fetch(`${API_LINK}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await responce.json();
  return data
}

async function fetchSearchData(endpoint) {
  const API_KEY = 'de4f638120dcadf919b8e8ffa729673c';
  const API_LINK = 'https://api.themoviedb.org/3/';

  const responce = await fetch(`${API_LINK}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
  const data = await responce.json();
  return data
}

function init() {
  switch (global.curretPage) {
    case '/':
    case '/index.html':
      displaySlideMovies()
      displayPopularMovies()
      break;
    case '/shows.html':
      displayPopularTv()
      break;
    case '/search.html':
      search();
      break;
    case '/movie-details.html':
      displayMovieDatails()
      break;
    case '/tv-details.html':
      displayTvShowDetails()
      break
  }
  activeLinks()
}

document.addEventListener('DOMContentLoaded', init)

