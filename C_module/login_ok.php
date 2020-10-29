<?php

require_once("db.php");

$id = $_POST['id'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE `id` = ? AND `password` = ? ";
$user = fetch($db, $sql, [$id, $password]);
if ($user == null) {
    msgAndGo("아이디 또는 비밀번호가 일치하지 않습니다.", "index.php");
    exit;
}

$_SESSION['user'] = $user;

msgAndGo("로그인 완료", "index.php"); 
