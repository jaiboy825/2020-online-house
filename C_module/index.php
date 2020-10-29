<?php
require_once("db.php");

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>내 집 꾸미기</title>
    <link rel="stylesheet" href="app.css">
    <link rel="stylesheet" href="fontawesome/css/font-awesome.css">
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <script src="js/app2.js"></script>
</head>

<body>
    <div class="wrapper"></div>
    <div class="registerContainer">
        <form action="register_ok.php" method="post" enctype="multipart/form-data">
            <div class="regiHead">회원가입</div>
            <input type="text" name="id" placeholder="아이디" required class="regiInput">
            <input type="text" name="name" placeholder="이름" required class="regiInput">
            <input type="password" name="password" placeholder="비밀번호" required class="regiInput">
            <input type="file" name="uPho" accept="image/*" required class="regiInput">
            <div class="capchaContainer"></div>
            <input type="hidden" name="cap" value="" class="caps">
            <input type="text" name="capcha" placeholder="Capcha 문구" required class="regiInput">
            <input type="submit" value="회원가입">
        </form>
    </div>

    <div class="loginContainer">
        <form action="login_ok.php" method="post">
            <div class="logiHead">로그인</div>
            <input type="text" name="id" placeholder="아이디" required class="loginInput">
            <input type="password" name="password" placeholder="비밀번호" required class="loginInput">
            <input type="submit" value="로그인">
        </form>
    </div>


    <!-- 헤더 영역-->
    <header>
        <div class="header">
            <!-- 홈, 온라인 집들이, 스토어, 전문가, 시공 견적 -->
            <div class="logo">내 집 꾸미기 <i class="fa fa-heart"></i></div>
            <?php if (!isset($_SESSION['user'])) : ?>
                <div class="menu">
                    <a href="index.php">
                        <div class="menus">홈</div>
                    </a>
                    <a href="#" title="로그인 후 이용하실 수 있습니다">
                        <div class="menus">온라인 집들이</div>
                    </a>
                    <a href="store.php" title="로그인 후 이용하실 수 있습니다.">
                        <div class="menus">스토어</div>
                    </a>
                    <a href="#" title="로그인 후 이용하실 수 있습니다.">
                        <div class="menus">전문가</div>
                    </a>
                    <a href="#" title="로그인 후 이용하실 수 있습니다.">
                        <div class="menus">시공 견젹</div>
                    </a>
                </div>
                <div class="lr">
                    <div class="lrs login">로그인</div>
                    <div class="lrs register">회원가입</div>
                </div>
            <?php elseif (isset($_SESSION['user'])) : ?>
                <div class="menu">
                    <a href="index.php">
                        <div class="menus">홈</div>
                    </a>
                    <a href="online.php">
                        <div class="menus">온라인 집들이</div>
                    </a>
                    <a href="store.php">
                        <div class="menus">스토어</div>
                    </a>
                    <a href="spe.php">
                        <div class="menus">전문가</div>
                    </a>
                    <a href="si.php">
                        <div class="menus">시공 견젹</div>
                    </a>
                </div>
                <div class="ls">
                    <div class="users">
                        <?= $_SESSION['user']->name ?> ( <?= $_SESSION['user']->id ?> )
                    </div>
                    <a href="logout_ok.php">
                        <div class="logout">로그아웃</div>
                    </a>
                </div>
            <?php endif; ?>
            <div class="mobiles">
                <i class="fa fa-bars"></i>
                <div class="mobile_menu">
                    <div class="m_menus">홈</div>
                    <div class="m_menus">온라인 집들이</div>
                    <div class="m_menus">스토어</div>
                    <div class="m_menus">전문가</div>
                    <div class="m_menus">시공 견적</div>
                </div>
            </div>
        </div>
    </header>
    <!-- 슬라이더 영역 -->
    <div class="mainContainer">
        <div class="main">
            <input type="radio" name="sLabel" id="active1" class="sInput" checked>
            <input type="radio" name="sLabel" id="active2" class="sInput">
            <input type="radio" name="sLabel" id="active3" class="sInput">
            <input type="radio" name="sLabel" id="active4" class="sInput">
            <div class="view_box">
                <div class="slider">
                    <img src="resources/slider/interior-4158033.jpg" alt="사진" title="사진">
                    <img src="resources/slider/wall-416060_1280.jpg" alt="사진" title="사진">
                    <img src="resources/slider/interior-3530343_1920.jpg" alt="사진" title="사진">
                </div>
            </div>
            <div class="controller">
                <label for="active2" class="left" data-idx="1"><i class="fa fa-angle-left"></i></label>
                <label for="active3" class="left" data-idx="2"><i class="fa fa-angle-left"></i></label>
                <label for="active4" class="left" data-idx="3"><i class="fa fa-angle-left"></i></label>
                <label for="active1" class="left" data-idx="4"><i class="fa fa-angle-left"></i></label>

                <label for="active2" class="right" data-idx="1"><i class="fa fa-angle-right"></i></label>
                <label for="active3" class="right" data-idx="2"><i class="fa fa-angle-right"></i></label>
                <label for="active4" class="right" data-idx="3"><i class="fa fa-angle-right"></i></label>
                <label for="active1" class="right" data-idx="4"><i class="fa fa-angle-right"></i></label>
            </div>
        </div>
    </div>
    <!-- 온라인 영역-->

    <div class="onlineContainer">
        <div class="online">
            <div class="online_head">
                <h3>온라인 집들이</h3>
                <br>
                <hr><br>
                <p>멋지게 꾸며진 다른 집들을 온라인에서 구경해보세요!</p>
            </div>
            <div class="online_body">
                <div class="onlines">
                    <div class="online_img">
                        <img src="resources/housewarming_party/1_before.jpg" alt="사진" title="사진" class="beimg">
                        <img src="resources/housewarming_party/1_after.jpg" alt="사진" title="사진" class="afimg">
                    </div>
                    <div class="online_info">
                        <h3>작성자 아이디 : user1</h3>
                        <h4>평점 : 4점</h4>
                        <a href="#">더 보기</a>
                    </div>
                </div>
                <div class="onlines">
                    <div class="online_img">
                        <img src="resources/housewarming_party/2_before.jpg" alt="사진" title="사진" class="beimg">
                        <img src="resources/housewarming_party/2_after.jpg" alt="사진" title="사진" class="afimg">
                    </div>
                    <div class="online_info">
                        <h3>작성자 아이디 : user2</h3>
                        <h4>평점 : 3점</h4>
                        <a href="#">더 보기</a>

                    </div>
                </div>
                <div class="onlines">
                    <div class="online_img">
                        <img src="resources/housewarming_party/3_before.jpg" alt="사진" title="사진" class="beimg">
                        <img src="resources/housewarming_party/3_after.jpg" alt="사진" title="사진" class="afimg">
                    </div>
                    <div class="online_info">
                        <h3>작성자 아이디 : user3</h3>
                        <h4>평점 : 5점</h4>
                        <a href="#">더 보기</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 전문가 영역 -->
    <div class="specialContainer">
        <div class="special">
            <div class="special_head">
                <h3>전문가</h3>
                <a href="#">더 보기</a>
                <br>
                <hr> <br>
                <p>업계 최고 수준의 전문가들을 만나보세요.</p>
            </div>
            <div class="special_body">
                <div class="card">
                    <div class="front"><img src="resources/specialist/specialist1.jpg" alt="사진" title="사진"></div>
                    <div class="back">
                        <h3>이름 : 전문가1</h3>
                        <h4>아이디 : specialist1</h4>
                        <a href="#">자세히 보기</a>
                    </div>
                </div>
                <div class="card">
                    <div class="front"><img src="resources/specialist/specialist2.jpg" alt="사진" title="사진"></div>
                    <div class="back">
                        <h3>이름 : 전문가2</h3>
                        <h4>아이디 : specialist2</h4>
                        <a href="#">자세히 보기</a>
                    </div>
                </div>
                <div class="card">
                    <div class="front"><img src="resources/specialist/specialist3.jpg" alt="사진" title="사진"></div>
                    <div class="back">
                        <h3>이름 : 전문가3</h3>
                        <h4>아이디 : specialist3</h4>
                        <a href="#">자세히 보기</a>
                    </div>
                </div>
                <div class="card">
                    <div class="front"><img src="resources/specialist/specialist4.jpg" alt="사진" title="사진"></div>
                    <div class="back">
                        <h3>이름 : 전문가4</h3>
                        <h4>아이디 : specialist4</h4>
                        <a href="#">자세히 보기</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 후기 영역 -->
    <div class="reviewContainer">
        <div class="review">
            <div class="review_head">
                <h3>후기</h3>
                <br>
                <hr><br>
                <p>다양한 후기를 확인해보세요!</p>
            </div>
            <div class="review_body">
                <div class="reviews">
                    <div class="review_info">
                        <div class="rspe">
                            <p>전문가 이름 : <strong>전문가2</strong></p>
                            <p>전문가 아이디 : <strong>specialist2</strong></p>
                        </div>
                        <div class="rwri">
                            <p>작성자 이름 : <strong>박재현</strong></p>
                            <p>작성자 아이디 : <strong>park</strong></p>
                        </div>
                        <div class="rwMain">
                            <h4>원하던 아이언맨 컨셉으로 너무 잘 꾸며주셨습니다!</h4>
                            <p>비용 : 3,200,000</p>
                            <p>평점 : 5</p>
                        </div>
                        <a href="#">더 보기</a>
                    </div>
                    <img src="resources/review/living-room-1032732_1280.jpg" alt="사진" title="사진">
                </div>
                <div class="reviews">
                    <div class="review_info">
                        <div class="rspe">
                            <p>전문가 이름 : <strong>전문가4</strong></p>
                            <p>전문가 아이디 : <strong>specialist4</strong></p>
                        </div>
                        <div class="rwri">
                            <p>작성자 이름 : <strong>김정수</strong></p>
                            <p>작성자 아이디 : <strong>kim</strong></p>
                        </div>
                        <div class="rwMain">
                            <h4>요구사항대로 부드러운 느낌을 잘 살려주셨습니다.</h4>
                            <p>비용 : 5,500,000</p>
                            <p>평점 : 4</p>
                        </div>
                        <a href="#">더 보기</a>
                    </div>
                    <img src="resources/review/window-3042834_1920.jpg" alt="사진" title="사진">
                </div>
            </div>
        </div>
    </div>
    <!-- 푸터 -->
    <footer>
        <div class="footer">Copyright (C) 2020 by MyHome Inc All Rights Reserved.</div>
    </footer>
</body>

</html>