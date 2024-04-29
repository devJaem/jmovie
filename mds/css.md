- 구글폰트 - ‘Gowun Dodum’ 폰트를 가지고 와서 모든 영역에 적용
- 헤더영역에 이미지를 넣고, 이미지를 전체 헤더 배경으로사용
- J-Movie (제목) 왼쪽에 정렬
- 검색입력, 검색버튼 (우측에 정렬)
- style.css

``` css
@import url("https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap");

/* 전체 영역 */
* {
    font-family: "Gowun Dodum", sans-serif;
}

/* 헤더 영역 */
.header-image-container {
    position: fixed;
    width: 100%;
    display: block;
    z-index: 1000;
}

.header-image {
    width: 100%;
    height: 20vh; 
    object-fit: cover;
}

.header-flex-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20vh; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%; 
}

.image-title {
    font-size: 3vh; 
    color: white;
    font-weight: bold;
    text-shadow: 0.2vh 0.2vh 0.4vh rgba(0, 0, 0, 0.5);
}

.container {
    padding-top: 22vh; 
}

/* 검색, 입력 영역 */
.search-container {
    display: flex;
    width: 25%; 
}

.search-input {
    flex-grow: 1;
    margin-right: 0.5%;
}

.input-group .form-control {
    height: 3vh; 
    border-radius: 0.5vh; 
    border: 1px solid #ccc;
}

.input-group .btn {
    height: 3vh; 
    border-radius: 0 0.5vh 0.5vh 0;
    background-color: #007bff;
    color: white;
}

/* 카드 영역 */
.card-body {
    padding: 1.5%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 8%; /* 그림자 효과 */
}

.card-img-top {
    width: 100%; 
    height: auto; 
    border-top-left-radius: 1%; 
    border-top-right-radius: 1%;
}

.card-body {
    padding: 1.5%; 
}

.card-title {
    margin-bottom: 1%; 
}

.card-text {
    font-size: 90%; 
    color: #555; 
}
```