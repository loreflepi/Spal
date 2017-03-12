<?php

    $servername = "162.243.36.251:3306";
	$username = "Desarrollo";
	$password = "Hola1234";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password);
	// Check connection
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}

	$sql = "SELECT Name_Tutor FROM dbo.Tutor";
	$result = mysqli_query($conn, $sql);
	$rowcount=mysqli_num_rows($result);

	if ($rowcount > 0) {
	    // output data of each row
	    $arr = array ('a'=>$row["Name_Tutor"]);

    	echo json_encode($arr);
	    
	} else {
	    echo "0 results";
	}

	mysqli_close($conn);
?>
