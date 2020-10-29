<?php

session_start();

$host = "localhost";
$dbname = "skils";
$charset = "utf8mb4";
$user = "root";
$pass = "";



$db = new PDO(
    "mysql:host={$host}; dbname={$dbname}; charset={$charset}",
    $user,
    $pass,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
    ]
);


function execute($db, $sql, $param = [])
{
    $q = $db->prepare($sql);
    return $q->execute($param);
}

function fetch($db, $sql, $param = []){
    $q = $db->prepare($sql);
    $q->execute($param);
    return $q->fetch();
}

function fetchAll($db, $sql, $param = []){
    $q = $db->prepare($sql);
    $q->execute($param);
    return $q->fetchAll();
}


function msgAndGo($msg, $go)
{
    echo "<script>";
    echo "alert('{$msg}');";
    echo "location.href='{$go}'";
    echo "</script>";
}


