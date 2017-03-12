

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
	     alert($scope.hash($scope.contra));
		}

	$scope.guardar=function(){
		//var nombre= document.getElementById("nombre").value;
		//localStorage.setItem("Nombre de usuario", nombre);
		var datos=$scope.nombre+ $scope.email+ $scope.colegio;
		
	}
	
})
 
app.controller("ingresoController", function ($scope,$http){
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
		$http.get('/php/login.php/?usuario='+usuario+'&contra='+contra).then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response.data);
		    if(response.data.confirmacion=="exitoso"){
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	location.href = "#!/tutor";

		    }
		      if(response.data.confirmacion!="exitoso"){
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
	
})