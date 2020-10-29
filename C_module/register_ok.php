<?php

require_once("db.php");

$id = $_POST['id'];
$name = $_POST['name'];
$password = $_POST['password'];
$file = $_FILES['uPho'];
$capcha = $_POST['cap'];
$capCheck = $_POST['capcha'];

if($capcha != $capCheck){
    msgAndGo("자동입력방지 문자를 잘못 입력하였습니다.", "index.php");
    exit;
}

$src = time() . $file['name'];
move_uploaded_file(
    $file['tmp_name'],
    "./upload/" . $src
);


$sql = "SELECT * FROM users WHERE `id` = ?";
$user = fetch($db, $sql, [$id]);
if ($user == null) {
    $sql = "INSERT INTO users (id, password, name, photo) VALUES (?, ? , ?, ?)";
    execute($db, $sql, [$id, $name, $password, $src]);
    msgAndGo("회원가입 완료", "index.php");
    exit;
}
msgAndGo("중복되는 아이디입니다. 다른 아이디를 사용해주세요.", "index.php");
