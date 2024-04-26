- 일단 기본적인 HTML 구분을 만들어 보자
    - Flex를 이용한 헤더를 만들었다 .
    - 카드부분 이후에 script.js 에서 랜더링 시킬 예정이라 div만 작성했다.
    - 헤더에는 헤더 이미지, 타이틀인 J-Movie, 검색창 영역을 미리 만들었다 .
    - index.html
        
        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>J movie</title>
            <link rel="stylesheet" href="style.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        		<!-- header 디자인 -->
            <header class="header-image-container">
                <img src="image/header.jpeg" alt="Header Image" class="header-image"/>
                <div class="header-flex-container">
                    <div class="image-title">J-Movie</div>
                    <div class="search-container">
                        <input type="text" class="form-control search-input" id="search-text" placeholder="영화 검색">
                        <button type="button" class="btn btn-primary" id="search-button">Search</button>
                    </div>
                </div>
            </header>
            <div class="container mb-3">
                <!-- 카드 배열위치 -->
                <div class="row" id="card-container"></div>
            </div>
            <script src="script.js"></script>
        </body>
        </html>
        
        ```