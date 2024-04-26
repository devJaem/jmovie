const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
let allMovies = [];

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjRjOGQxOTRkYzI4MGE0N2E0MmY5ZGRhMWJjOGMxZiIsInN1YiI6IjY2MjllYjVlODg2MzQ4MDExZmFlMzcyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o72XzIASnnxekdv0Q8nwuya_5kYGc5X4C_VOKl9zJTg'
    }
};

// api 정보를 받아와서 showMovies()실행 
fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        allMovies = data.results;
        showMovies(allMovies);
    }) // 모든 데이터를 배열에 저장
    .catch(err => console.error(err));

// 카드를 생성하는 함수
const createMovie = movie => {
    const { id, name, overview, poster_path, vote_average } = movie;

    const card = document.createElement('div');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const titleElement = document.createElement('h5');
    const overviewElement = document.createElement('p');
    const voteAverageElement = document.createElement('p');
    
    card.className = 'card mb-4'; 
    //부트스트랩 여백
    
    image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    image.className = "card-img-top";
    image.alt = `${name} Poster`;

    cardBody.className = 'card-body';

    titleElement.className = 'card-title';
    titleElement.textContent = name;

    overviewElement.className = 'card-text';
    overviewElement.textContent = overview;

    voteAverageElement.className = 'text-muted';
    voteAverageElement.textContent = `Rating: ${vote_average}/10`;


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
    cardContainer.innerHTML = ''; // 기존 카드 삭제
    
    movies.forEach(movie => {
        const movieCard = createMovie(movie);
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4';
        //부트스트랩 카드 배치갯수
        colDiv.appendChild(movieCard);
        cardContainer.appendChild(colDiv);

        // 카드 클릭 이벤트 리스너
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
    console.log(filteredMovies); // 필터링된 결과 확인
    showMovies(filteredMovies);
};

// 검색 이벤트리스너 
searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

// 검색 입력란 커서
window.onload = () => {
    searchInput.focus(); // 페이지 로드 시 검색 입력란에 포커스 주기
};
