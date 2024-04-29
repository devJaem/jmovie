const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
let allMovies = [];

// API 정보
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjRjOGQxOTRkYzI4MGE0N2E0MmY5ZGRhMWJjOGMxZiIsInN1YiI6IjY2MjllYjVlODg2MzQ4MDExZmFlMzcyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o72XzIASnnxekdv0Q8nwuya_5kYGc5X4C_VOKl9zJTg'
    }
};

// API 정보 받아오기
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        allMovies = data.results;
        showMovies(allMovies);
    })
    .catch(err => console.error(err));

// 카드를 생성하는 함수
const createMovie = movie => {
    const { id, name, overview, poster_path: posterPath, vote_average: voteAverage } = movie;

    const card = document.createElement('div');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const titleElement = document.createElement('h5');
    const overviewElement = document.createElement('p');
    const voteAverageElement = document.createElement('p');
    
    image.src = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    image.className = "card-img-top";
    image.alt = `${name} Poster`;
    cardBody.className = 'card-body';
    titleElement.className = 'card-title';
    titleElement.textContent = name;
    overviewElement.className = 'card-text';
    overviewElement.textContent = overview;
    voteAverageElement.className = 'text-muted';
    voteAverageElement.textContent = `Rating: ${voteAverage}/10`;

    cardBody.appendChild(titleElement);
    cardBody.appendChild(overviewElement);
    cardBody.appendChild(voteAverageElement);
    card.appendChild(image);
    card.appendChild(cardBody);
    card.setAttribute('id',id);

    return card;
};

//받아온 자료만큼 카드를 그리는 함수 
const showMovies = movies => {
    cardContainer.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovie(movie);
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4';
        colDiv.appendChild(movieCard);
        cardContainer.appendChild(colDiv);

        movieCard.addEventListener('click', () =>{
            const movieId = movieCard.getAttribute('id');
            alert(`Movie ID : ${movieId}`);
        });
    });    
};

// 검색 함수
const searchMovies = () => {
    const searchItem = searchInput.value.toLowerCase();
    const filteredMovies = allMovies.filter(movie =>
        movie.name && movie.name.toLowerCase().includes(searchItem)
    );
    showMovies(filteredMovies);
};

// 검색 이벤트리스너 
searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

// 검색 입력란 커서 (반영))
window.onload = () => {
    searchInput.focus();
};
