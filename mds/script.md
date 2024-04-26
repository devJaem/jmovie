1. TMDB에 회원가입하고 인기영화 API 주소와, key를 확보한다.
2. html 에서 실제 동적으로 동작해야하는 요소들을 가지고 온다.
3. api로 받아온 JSON파일을 저장할 배열을 선언한다.
``` jsx
const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
let allMovies = []; // 저장할 배열
```

4. API 정보와, 키를 받아온다
    
    ```jsx
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '개인 키값'
      }
    };
    
    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
    ```
    
    - fetch 문은 향후 카드생성, 랜더링 함수가 구현되면 .then 구문을 수정해야한다.

    5. 먼저 JSON 영화 데이터를 활용해서 카드를 만드는 함수를 생성한다
    
    ```jsx
    const createMovie = movie => {
        // json 내부의 키값중, 사용할 값을 생성한다.
        const { id, name, overview, poster_path, vote_average } = movie;
    	
    		// 부트스트랩 -> card를 활용해서, 각 항목을 태그로 감싸놓는다
        const card = document.createElement('div');
        const image = document.createElement('img');
        const cardBody = document.createElement('div');
        const titleElement = document.createElement('h5');
        const overviewElement = document.createElement('p');
        const voteAverageElement = document.createElement('p');
        
        // JSON의 이미지 정보를 추춣해서 내 Img 태그에 넣는다
        image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
        image.className = "card-img-top";
        image.alt = `${name} Poster`;
    
    		// 카드 전체 공간
        cardBody.className = 'card-body';
    		// 영화 제목 
        titleElement.className = 'card-title';
        titleElement.textContent = name;
    		// 설명
        overviewElement.className = 'card-text';
        overviewElement.textContent = overview;
    		// 평점
        voteAverageElement.className = 'text-muted';
        voteAverageElement.textContent = `Rating: ${vote_average}/10`;
    
    		// 실제 카드를 생성하기위한 정보를 적제한다.
        cardBody.appendChild(titleElement);
        cardBody.appendChild(overviewElement);
        cardBody.appendChild(voteAverageElement);
        card.appendChild(image);
        card.appendChild(cardBody);
        // id 속성 설정
        card.setAttribute('id',id);
    
        return card;
    };
    ```
    
6. createMovie() 를 기준으로, 실제 랜더링을 하는 함수를 만든다.
    
    ```jsx
    //받아온 자료만큼 카드를 그리는 함수 
    const showMovies = movies => {
        // 랜더링이 될때마다 기존 카드를 삭제한다
        cardContainer.innerHTML = ''; 
        
        // 반복문을 활용하여 movie 를 모두 생성한다.
        movies.forEach(movie => {
            const movieCard = createMovie(movie);
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-4';
            colDiv.appendChild(movieCard);
            cardContainer.appendChild(colDiv);
    
            // 카드 클릭시 이벤트 리스너로
            // alert 창으로 id를 표출한다.
            movieCard.addEventListener('click', () =>{
                const movieId = movieCard.getAttribute('id');
                alert(`Movie ID : ${movieId}`);
            });
        });    
    };
    ```
    
7. 검색 함수와, 버튼 클릭, 엔터키 입력 이벤트리스너, 검색창 커서 포커스 를 추가한다.
    
    ```jsx
    // 검색 함수
    const searchMovies = () => {
    		// 입력받은 검색어를 소문자로 바꿔준다
        const searchItem = searchInput.value.toLowerCase();
        // 1. 전체영화 배열에서 filter 함수 사용
        // 2. 각 영화 객체의 이름(movie.name)이 있고, 검색어(searchItem)포함하는지 확인
        //    대소문자를 구분하지 않기 위해 모든 문자열을 소문자로 변환
        const filteredMovies = allMovies.filter(movie =>
            movie.name && movie.name.toLowerCase().includes(searchItem)
        );
        // 필터링된 영화 전달
        showMovies(filteredMovies);
    };
    
    // 검색 이벤트리스너 
    searchButton.addEventListener('click', searchMovies); // 검색버튼 클릭
    searchInput.addEventListener('keyup', event => { 
        if (event.key === 'Enter') { // 엔터버튼 입력
            searchMovies();
        }
    });
    
    // 검색 입력란 커서
    window.onload = () => {
        searchInput.focus(); // 페이지 로드시 검색란에 포커스
    };
    
    ```
    
8. 이후 최종적으로 fetch 함수를 수정해준다
``` jsx
fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        allMovies = data.results;
        showMovies(allMovies);
    }) // 모든 데이터를 배열에 저장, 필터링된 값도 저장한다.
    .catch(err => console.error(err));