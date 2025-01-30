// de4f638120dcadf919b8e8ffa729673c
const global = {
    curretPage: window.location.pathname
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
            ${
                show.backdrop_path
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


//Fetch data using api
async function fetchApiData(endpoint) {
    const API_KEY = 'de4f638120dcadf919b8e8ffa729673c';
    const API_LINK = 'https://api.themoviedb.org/3/';

    const responce = await fetch(`${API_LINK}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await responce.json(); 
    return data
}

function init() {
    switch (global.curretPage) {
        case '/':
        case '/index.html':
            displayPopularMovies()
            break;
        case '/shows.html':
            displayPopularTv()
            break;
        case '/search.html':
            console.log("Search")
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

