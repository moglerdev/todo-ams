<?php
    header('Content-Type: application/json');
    $uri = $_SERVER['REQUEST_URI'];
    $uris = explode('/', $uri);
    $uris = array_slice($uris, 2);

    foreach($uris as $key => $value){
        if($value == ""){
            unset($uris[$key]);
        }
    }

    if(count($uris) > 0){

        echo json_encode($uris);
        return true;
    }

    http_response_code(404);
?>
{ "code" : 404, "message" : "not found" }
<?php
    return false;
?>