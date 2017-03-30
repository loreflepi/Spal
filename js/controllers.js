

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
	   
	     var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 var colegio= document.getElementById("colegio").value;
		 var contras=$scope.hash(cont);
		 console.log('http://127.0.0.1:18080/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio);
		 
		 $http.get('http://127.0.0.1:18080/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.mail!=null && response.data.user!=null){
		    	alert("Espera a un correo de verificación por parte del administador.");
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	localStorage.setItem("Nombre de colegio", colegio);
		    	localStorage.setItem("Nombre", nombre);
		    	localStorage.setItem("Apellido", apellido);
		    	localStorage.setItem("colegio", colegio);
		    	localStorage.setItem("mail", mail);
		    }
		 
		    if(response.data.mail==null){
		    	alert("Ya te enceuntras registrado bajo esta dirección de correo electrónico.");
		    }
		
		    if(response.data.user==null){
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
			var hash = SHA256(n);
	    	return (hash);
	    	alert(hash);
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
		alert(contras);
		$http.get('http://162.243.36.251:8080/spal-server/rs/spal/login/?user='+usuario+'&pass='+contras).then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);

		    if(response.data.user!=null && response.data.tipo==2){
		    	alert("Login exitoso");
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	location.href = "#!/tutor";

		    }
		      

		    if(response.data.user!=null && response.data.tipo==1){
		    	alert("Login exitoso");
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	location.href = "#!/administrador";

		    }
		      if (response.data.user==null && response.data.tipo==0){
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

app.controller("tutorController", function ($scope,$http){
	
	$scope.nombre=localStorage.getItem('Nombre de usuario');
	$scope.estudiantes=[{Nombre:"Lorena",Foto:""},{Nombre:"Esteban",Foto:""}];

	$scope.logout=function (){
		localStorage.clear();
		location.href = "#!/ingreso";
	}

})
	
	app.controller("adminController", function ($scope, $http){
	
	
	$scope.estudiantes=[{Nombre:"Lorena",Foto:""},{Nombre:"Esteban",Foto:""}];

	$scope.logout=function (){
		localStorage.clear();
		location.href = "#!/ingreso";
	}

	$scope.tutorRegistro=function(){
		
		$http.get('http://127.0.0.1:18080/spal-server/rs/spal/admin').then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);
		    if (response.data.length>0) {
		 
		    for (var i = 0; i < response.data.length; i++) {
		    
			    if(response.data[i].nombre!=null && response.data[i].apellido!=null && response.data[i].colegio!=0 && response.data[i].user!=null && response.data[i].mail!=null){
			    	localStorage.setItem("Nombre", response.data[i].nombre);
			    	$scope.nomb=localStorage.getItem('Nombre');
					localStorage.setItem("Apellido", response.data[i].apellido);
			    	$scope.apellido=localStorage.getItem('Apellido');
			    	localStorage.setItem("Email", response.data[i].mail);
			    	$scope.email=localStorage.getItem('Email');
			    	localStorage.setItem("Usuario", response.data[i].user);
			    	$scope.usuario=localStorage.getItem('Usuario');
			    	
			    	if (response.data[i].colegio==1) {
			    		localStorage.setItem("Colegio","Colegio la Colina");
			    		$scope.colegio=localStorage.getItem('Colegio');
			    	}
			    	
			    }
			}
			    
		   }
		   else{
			    	alert("No hay usuarios por verificar");
			    }
		  
		}
		function errorCallback(error){
		    console.log(error);
		
		}
	}
})


	app.controller("regestController", function ($scope, $http){
	$scope.hash=function(n){
			var hash = hex_md5(n);
	    	return (hash);
		}

	$scope.agregar=function(){
		 var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
		 var cont= document.getElementById("cont").value;
		 var genero= document.getElementById("genero").value;
		 var contras=$scope.hash(cont);
		 console.log('http://127.0.0.1:18080/spal-server/rs/spal/insertar/?nombre='+nombre+'&apellido='+apellido+'&user='+usuario+'&pass='+contras+'&genero='+genero);
		 
		 $http.get('http://127.0.0.1:18080/spal-server/rs/spal/insertar/?nombre='+nombre+'&apellido='+apellido+'&user='+usuario+'&pass='+contras+'&genero='+genero).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.user!=null){
		    	alert("El estudiante fue agregado exitosamente.");
		    
		    	localStorage.setItem("Genero", genero);
		    	localStorage.setItem("Nombre", nombre);
		    	localStorage.setItem("Apellido", apellido);
		    }
		
		    if(response.data.user==null){
		    	alert("Ya hay un usuario con este mismo nombre de usuario.");
		    }
		}

		function errorCallback(error){
		    console.log(error);
		}
	}
	
})

app.controller("estController", function ($scope, $http){
	var pieData = [{value:40,color:"#0b82e7",highlight: "#0c62ab",label: "Primer dato"},
	{value:60,color:"#0b82e7",highlight: "#0c62ab",label: "Segundo dato"}];
	var ctx = document.getElementById("chart-area").getContext("2d");
	window.myPie = new Chart(ctx).Pie(pieData);	
	
})