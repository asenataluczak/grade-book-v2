<?php
$config = parse_ini_file('../private/credentials.ini');

$mysqli = mysqli_connect($config['db_host'], $config['db_user'], $config['db_password'], $config['db_name'], $config['db_port']);
