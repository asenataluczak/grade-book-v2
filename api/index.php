<?php
require "./bootstrap.php";

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     header('Access-Control-Allow-Origin: *');
//     header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
//     header('Access-Control-Allow-Headers: token, Content-Type');
//     header('Access-Control-Max-Age: 1728000');
//     header('Content-Length: 0');
//     header('Content-Type: text/plain');
//     die();
// }
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
header('Content-Type: text/plain');

$filename = basename(__FILE__);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = substr($uri, stripos($uri, $filename) + strlen($filename));
$pathSegments = array_values(array_filter(explode('/', $path), fn ($x) => strlen($x) > 0));
$segmentsNumber = count($pathSegments);


if ($pathSegments[0] == 'user') {
    require "./controllers/UserController.php";
    $objFeedController = new UserController();
}

if ($pathSegments[0] == 'course') {
    require "./controllers/CourseController.php";
    $objFeedController = new CourseController();
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}


$strMethodName = $pathSegments[1] . 'Action';
$objFeedController->{$strMethodName}();
