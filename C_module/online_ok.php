<?php

require_once("db.php");

$user = $_SESSION['user']->name;
$uId =  $_SESSION['user']->id;
$file = $_FILES['afpho'];
$files = $_FILES['bepho'];
$no = $_POST['nohau'];

$src = time() . $file['name'];
move_uploaded_file(
    $file['tmp_name'],
    "./upload/" . $src
);

$srcs = time() . $files['name'];
move_uploaded_file(
    $files['tmp_name'],
    "./upload/" . $srcs
);


$sql = "INSERT INTO board (writer, wId, nohau ,afpho, bepho, jumsu, cnt) VALUES (?, ? , ? , ? , ? , ? , ? )";
execute($db, $sql, [$user, $uId, $no, $src, $srcs, 0, 0]);
msgAndGo("작성 완료", "online.php");
