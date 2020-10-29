<?php

require_once("db.php");

$user = $_SESSION['user']->id;
$board_id = $_POST['sh'];
$score = $_POST['score'] * 1;
$sql = "SELECT `jumsu`, `cnt` FROM `board` WHERE `id` = ?";
$rs = fetch($db, $sql, [$board_id]);
$dbScore = ($rs->jumsu)*1;
$dbCnt = ($rs->cnt)*1;
$allScore = $dbScore * $dbCnt;
$realCnt = $dbCnt + 1;
$realScore = ($allScore + $score)/$realCnt;
var_dump($realScore);
$sqls = "UPDATE `board` SET `jumsu`= ? , `cnt`= ? WHERE `id` = ? ";
execute($db, $sqls, [$realScore, $realCnt, $board_id]);
$sqlss = "INSERT INTO board_score (board_id, users_id) VALUES (?,?)";
execute($db, $sqlss, [$board_id, $user]);
msgAndGo("점수 주기 성공", "online.php");
