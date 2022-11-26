<?php
require "./bootstrap.php";

header("Access-Control-Allow-Origin: *");

$filename = basename(__FILE__);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = substr($uri, stripos($uri, $filename) + strlen($filename));
$pathSegments = array_values(array_filter(explode('/', $path), fn ($x) => strlen($x) > 0));
$segmentsNumber = count($pathSegments);

if ($segmentsNumber != 2 || $pathSegments[0] != 'user') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

require "./controllers/UserController.php";

$objFeedController = new UserController();
$strMethodName = $pathSegments[1] . 'Action';
$objFeedController->{$strMethodName}();
