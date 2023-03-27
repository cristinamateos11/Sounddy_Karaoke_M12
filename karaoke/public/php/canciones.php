<?php
// header('Access-Control-Allow-Origin: *');
// print_r(file_get_contents('php://input'));

error_reporting(E_ALL);
ini_set("display_errors", 1);

$data = [];

try {
    $dbh = new PDO('mysql:host=localhost;dbname=karaoke;charset=utf8', 'root', 'thos');
    
    $query = "SELECT * FROM karaoke";
    $sql = $query;
    
    $sth = $dbh->prepare($sql);
    $sth->execute($data);
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
echo json_encode($result);
