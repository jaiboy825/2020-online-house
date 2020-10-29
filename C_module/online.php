<?php
require_once("db.php");
$sql = "SELECT * FROM board ORDER BY id";
$list = fetchAll($db, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>내집꾸미기</title>
    <link rel="stylesheet" href="store.css">
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <script src="js/online.js"></script>
    <link rel="stylesheet" href="fontawesome/css/font-awesome.css">
</head>

<body>
    <div class="wrapper"></div>
    <div class="owContainer">
        <form action="online_ok.php" method="post" enctype="multipart/form-data">
            <div class="owHead">온라인 집들이 글 작성</div>
            <input type="file" name="bepho" accept="image/*" required class="regiInput">
            <input type="file" name="afpho" accept="image/*" required class="regiInput">
            <textarea name="nohau" id="nohau" cols="30" rows="5" placeholder="노하우" required class="regiInput"></textarea>
            <input type="submit" value="작성 완료">
        </form>
    </div>
    <div class="scorePop">
        <form action="score_ok.php" method="post">
            <div class="scoreHead">점수</div>
            <input type="hidden" class="scoreHidden" value="" id="sh" name="sh">
            <div class="jumCons">
                1점 : <input type="radio" name="score" id="score1" value="1" checked>
                2점 : <input type="radio" name="score" id="score2" value="2">
                3점 : <input type="radio" name="score" id="score3" value="3">
                4점 : <input type="radio" name="score" id="score4" value="4">
                5점 : <input type="radio" name="score" id="score5" value="5">
            </div>
            <input type="submit" value="점수 주기" class="jumjo">

        </form>
    </div>
    <header>
        <div class="header">
            <!-- 홈, 온라인 집들이, 스토어, 전문가, 시공 견적 -->
            <div class="logo">내 집 꾸미기 <i class="fa fa-heart"></i></div>
            <?php if (isset($_SESSION['user'])) : ?>
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
        </div>
    </header>
    <div class="onlineContainer">
        <div class="online_head">
            <div class="oWrite">글쓰기</div>
        </div>
        <div class="online">
            <div class="onlineList">
                <?php
                foreach ($list as $item) :
                    ?>
                    <div class="ws">
                        <div class="wsimgContainer">
                            <img src="/upload/<?= $item->afpho ?>" alt="">
                            <img src="/upload/<?= $item->bepho ?>" alt="" class="beimgs">
                        </div>
                        <p>글쓴이 : <?= $item->writer ?>(<?= $item->wId ?>)</p>
                        <div class="noCon">
                            <p>노하우 : <?= $item->nohau ?></p>
                        </div>
                        <p>평점 : <?= $item->jumsu ?> </p>
                        <?php
                            $sql = "SELECT `board_id` FROM `board_score` WHERE `users_id` = ?";
                            $lists = fetch($db, $sql, [$_SESSION['user']->id]);
                            ?>
                        <?php if ($item->wId == $_SESSION['user']->id) : ?>
                        <?php elseif ($lists == null) : ?>
                            <div class="score" data-id="<?= $item->id ?>">평점 주기</div>
                        <?php elseif ($item->id != $lists->board_id) : ?>
                            <div class="score" data-id="<?= $item->id ?>">평점 주기</div>
                        <?php endif; ?>
                    </div>
                <?php
                endforeach;
                ?>
            </div>
        </div>
    </div>
</body>

</html>