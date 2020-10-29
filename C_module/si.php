<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="store.css">
    <link rel="stylesheet" href="fontawesome/css/font-awesome.css">
</head>
<body>
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
</body>
</html>