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

	if (isset($_GET['nombre']) AND ($_GET['apellido']) AND ($_GET['mail']) AND ($_GET['usuario']) AND ($_GET['cont']) ){
		$nombre_usu=$_GET['nombre'];
		$apellido=$_GET['apellido'];
		$usuario=$_GET['usuario'];
		$mail=$_GET['mail'];
		$cont=$_GET['cont'];
		$colegio=$_GET['colegio'];
		$id_tutor=100;

		$sql = "INSERT INTO dbo.Tutor (ID_Tutor, Name_Tutor, Lastname_Tutor, Email_Tutor, Username_Tutor, Password_Tutor, ID_School)
				VALUES ('".$id_tutor."', '".$nombre_usu."', '".$apellido."', '".$mail."', '".$usuario."', '".$cont."', ".$colegio.")";

		$result = mysqli_query($conn, $sql);

		if ($result) {
		    // output data of each row
		    $arr = array ('confirmacion'=>"exitoso");
		    $id_tutor++;
		} else {
		    $arr = array ('confirmacion'=>"incorrecto_datos ".mysqli_error($conn));

		}

    	echo json_encode($arr);
	}

	else{
	    $arr = array ('confirmacion'=>"incorrecto_parametros");

	    echo json_encode($arr);
	}
	
	mysqli_close($conn);		

?>
