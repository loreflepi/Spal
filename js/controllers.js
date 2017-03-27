

app.controller("homeController", function indexController($scope){
	$scope.usuarios = [
		{
			nombre : "Israel Parra",
			web : "https://www.uno-de-piera.com",
			edad : "32 años",
			profesion : "programador web"
		},
		{
			nombre : "Pepito",
			web : "http://pepito.com",
			edad : "? años",
			profesion : "vender palotes!"
		}
	]
})
 
 
app.controller("registroController", function ($scope,$http){
	$scope.hash=function(n){
		var hash = hex_md5(n);
    	return (hash);
	}


	$scope.enviar=function() {
	    //alert($scope.nombre+ $scope.email+ $scope.colegio);
	     //alert($scope.hash($scope.contra));
	     var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 var colegio= document.getElementById("colegio").value;
		 var contras=$scope.hash(cont);
		 console.log('http://162.243.36.251/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio);
		 
		 $http.get('http://162.243.36.251/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.confirmacion=="exitoso"){
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	localStorage.setItem("Nombre de colegio", colegio);
		    	localStorage.setItem("Nombre", nombre);
		    	localStorage.setItem("Apellido", apellido);
		    	localStorage.setItem("colegio", colegio);
		    	localStorage.setItem("mail", mail);
		    }
		    var email = response.data.confirmacion.includes("Email_Tutor");
		 
		    if(email==true){
		    	alert("Ya te enceuntras registrado bajo esta dirección de correo electrónico.");
		    }
		    var usuarior = response.data.confirmacion.includes("Username_Tutor");
		    if(usuarior==true){
		    	alert("Ya hay un usuario con este mismo nombre de usuario.");
		    }
		}

		function errorCallback(error){
		    console.log(error);
		}
	}
	
})
 
app.controller("ingresoController", function ($scope,$http){
	$scope.hash=function(n){
			var hash = hex_md5(n);
	    	return (hash);
		}

	$scope.guardar=function(){
		var usuario= document.getElementById("usu").value;
		var contra= document.getElementById("contra").value;
		localStorage.setItem("Nombre de usuario", usuario);
		localStorage.setItem("contraseña", contra);
		$scope.login();
	}

	$scope.cargar=function(){
		/*Obtener datos almacenados*/
		var usuario = localStorage.getItem("Nombre de usuario");
		var contra = localStorage.getItem("contraseña");
		/*Mostrar datos almacenados*/    
		document.getElementById("usu").innerHTML = usuario;
		document.getElementById("contra").innerHTML = contra;
		//alert(usuario+" "+contra);
	}

	$scope.login=function(){

		var usuario= document.getElementById("usu").value;
		var contra= document.getElementById("contra").value;
		var contras=$scope.hash(contra);
		$http.get('http://162.243.36.251/spal-server/rs/spal/login/?user='+usuario+'&pass='+contras).then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);

		    if(response.data.user!=null){
		    	alert("Hola");
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	location.href = "#!/tutor";

		    }
		      else{
		    	alert("Verifica tu usuario y/o contraseña");

		    }
		}
		function errorCallback(error){
		    console.log(error);
		
		}
	}
	
})

app.controller("contactoController", function contactoController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	
})

app.controller("inicioController", function ($scope){
	
	$scope.showDivs=function (n) {
	  var i;
	  var x = document.getElementsByClassName("mySlides");
	  if (n > x.length) {
	  	slideIndex = 1
	  }    
	  if (n < 1) {
	  	slideIndex = x.length
	  }
	  for (i = 0; i < x.length; i++) {
	     x[i].style.display = "none";  
	  }
	  x[slideIndex-1].style.display = "block";  
	}
	var slideIndex = 1;
	$scope.showDivs(slideIndex);

	$scope.plusDivs=function (n) {
	  $scope.showDivs(slideIndex += n);
	}

	
})

app.controller("tutorController", function ($scope){
	
	$scope.nombre=localStorage.getItem('Nombre de usuario');
	$scope.estudiantes=[{Nombre:"Lorena",Foto:""},{Nombre:"Esteban",Foto:""}];

	$scope.logout=function (){
		localStorage.clear();
		location.href = "#!/ingreso";
	}

})
	
	app.controller("adminController", function ($scope, $http){
	
	$scope.nombre=localStorage.getItem('Nombre');
	$scope.apellido=localStorage.getItem('Apellido');
	$scope.colegio=localStorage.getItem('Colegio');
	$scope.estudiantes=[{Nombre:"Lorena",Foto:""},{Nombre:"Esteban",Foto:""}];

	$scope.logout=function (){
		localStorage.clear();
		location.href = "#!/ingreso";
	}

	$scope.tutorRegistro=function(){
		
		$http.get('http://162.243.36.251/spal-server/rs/spal/admin').then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);
		    if(response.data.confirmacion=="exitoso"){
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	

		    }
		      if(response.data.confirmacion=="incorrecto_datos"){
		    	alert("Verifica tu usuario y/o contraseña");

		    }
		}
		function errorCallback(error){
		    console.log(error);
		
		}
	}
})


	app.controller("regestController", function ($scope, $http){
	$scope.saludo = "Hola desde el controlador login";
	
})