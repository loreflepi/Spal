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

	if (isset($_GET['usuario']) AND ($_GET['contra']) ){
		$nombre_usu=$_GET['usuario'];
		$contra=$_GET['contra'];

		$sql = "SELECT Username_Tutor, Password_Tutor FROM dbo.Tutor WHERE Username_Tutor='".$nombre_usu."' AND Password_Tutor='".$contra."'";
		$result = mysqli_query($conn, $sql);
		$rowcount=mysqli_num_rows($result);

		if ($rowcount == 1) {
		    // output data of each row
		    $arr = array ('confirmacion'=>"exitoso");
		} else {
		    $arr = array ('confirmacion'=>"incorrecto_datos");
		}

    	echo json_encode($arr);
	}

	else{
	    $arr = array ('confirmacion'=>"incorrecto_parametros");

	    echo json_encode($arr);
	}
	
	mysqli_close($conn);		

?>
