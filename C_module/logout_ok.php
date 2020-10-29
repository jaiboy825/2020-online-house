<?php

require_once("db.php");

unset($_SESSION['user']);

msgAndGo("로그아웃 완료", "index.php"); 
