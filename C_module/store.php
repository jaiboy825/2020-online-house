<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="store.css">
    <link rel="stylesheet" href="fontawesome/css/font-awesome.css">
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <script src="js/app.js"></script>
</head>

<body>
    <div class="wrapper"></div>
    <div class="buyContainer">
        <input type="text" class="buyName" placeholder="이름">
        <input type="text" class="buyAddress" placeholder="주소">
        <div class="buySuc">구매 완료</div>
    </div>
    <div class="canvasContainer"></div>
    <!-- 헤더 영역-->
    <header>
        <div class="header">
            <!-- 홈, 온라인 집들이, 스토어, 전문가, 시공 견적 -->
            <div class="logo">내 집 꾸미기 <i class="fa fa-heart"></i></div>
            <div class="menu">
                <a href="index.php">
                    <div class="menus">홈</div>
                </a>
                <a href="#">
                    <div class="menus">온라인 집들이</div>
                </a>
                <a href="store.php">
                    <div class="menus">스토어</div>
                </a>
                <a href="#">
                    <div class="menus">전문가</div>
                </a>
                <a href="#">
                    <div class="menus">시공 견젹</div>
                </a>
            </div>
            <div class="lr">
                <a href="#">
                    <div class="lrs">로그인</div>
                </a>
                <a href="#">
                    <div class="lrs">회원가입</div>
                </a>
            </div>
        </div>
    </header>
    <div class="storeCenter">
        <div class="main">
            <div class="noneMent">일치하는 상품이 없습니다.</div>
            <div class="productContainer">
            </div>
            <div class="cartContainer">
                <input type="text" id="search" placeholder="검색">
                <div class="Goal">이곳에 상품을 넣어주세요.</div>
                <div class="allTotal">0원</div>
                <div class="buy">구매하기</div>
                <div class="cart"></div>
            </div>
        </div>
    </div>
</body>

</html>