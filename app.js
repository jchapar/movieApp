const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=45683cbb6a8af699dc7727a6b6fdd6f6&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=45683cbb6a8af699dc7727a6b6fdd6f6&query="';


const header = document.getElementById('header');
const main = document.getElementById('main');
const form = document.getElementById('form');
const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const search = document.getElementById('search');
const login = document.getElementById('login');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');


// Login to main screen
loginBtn.addEventListener('submit', (e) => {
    e.preventDefault();

    login.style.display = 'none';
    header.style.display = 'flex';
    main.style.display = 'flex';
});

// Logout to login in screen
logoutBtn.addEventListener('click', () => {
    login.style.display = 'flex';
    header.style.display = 'none';
    main.style.display = 'none';
});


// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results);
}

// Show movies within the DOM
function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = 
        `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
                <a class="btn" id="add-btn">Add</a>
            </div>
        `;
        main.appendChild(movieElement);
    })
}

// Function to movie rating color
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }
});
