<?php
  echo header("Access-Control-Allow-Origin: *"); // Allow cross origin resource sharing
  
  $translate = array("sports"=>"Sports", "matches"=>"Matches", "poolResults"=>"Match_Results");
  $req = $translate[$_REQUEST["option"]];
  
  // Build error response message
  $error = array("error"=>"Oops... something went wrong with your request", "received"=>"--Received--\nMethod: ".$_SERVER["REQUEST_METHOD"]);
  foreach ($_REQUEST as $req_key => $req_value) { // Add request key:value pairs in error message
    $error["received"] .= ",\n".$req_key.": ".$req_value;
  }
  
  if ( !$_REQUEST ) { // If there is no request (eg. normal web traffic) display help screen
    include "index.html";
    die();
    
  }
  //else if (false) {
  else if (!$_POST["option"] || ($req != "Sports" && $req != "Matches" && $req != "Match_Results")) { // Check for expected request method and values
    
    //echo json_encode($error);
    if ($_SERVER["REQUEST_METHOD"] != "POST") { // If not POST demand POST
      die(json_encode(array_merge($error, array("advice"=>"Please use POST method"))));
    }
    else { // Must be wrong key: value pair in POST request
      die(json_encode(array_merge($error, array("advice"=>"POST syntax = option: tableName, sport: sportName\n\nWHERE tableName === [sports || matches || poolResults]\nAND sport is optional and must be the name of a target sport\n\nSee https://ubilamp.hopto.org for more information"))));
    }
  
  }
  else { // We got this far - it must be a valid request!
    $sport = $_POST["sport"];
    if ($sport) {
      $req .= " WHERE Sport = '".addslashes($sport)."'"; // Insert sport name into mysqli query
    }
    $servername = "localhost";
    $username = "###";
    $password = "###"; // sterilised
    
    $conn = new mysqli($servername, $username, $password);  // Create connection
    
    if ($conn->connect_error) { // Check connection
      die("Connection failed: Access denied<br>See Chris for details");
    }
    $sql = "SELECT * FROM the2018games.".$req;
    $result = mysqli_query($conn, $sql); // Make selection
    
    $array = array(); // initialise carrier array
    
    if (mysqli_num_rows($result) > 0) { // output data of each row
      while($row = mysqli_fetch_assoc($result)) {
        if ($sport) {
          $row = array_diff($row, array("sport"=>$sport));
        }
        array_push($array, $row);
      }
      echo json_encode($array);
    }
    else { // If empty table
      die(json_encode(array_merge($error, array("error"=>"Nothing to see here...", "advice"=>"No data within selection"))));
    }
  }
?>
