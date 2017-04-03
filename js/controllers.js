

app.controller("homeController", function indexController($scope){

})
 
 
app.controller("registroController", function ($scope,$http){
	
	$scope.hash=function(n){
		var hash = SHA256(n);
    	return (hash);
	}

    $scope.imagenes = [];

    $scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
         
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
        	$scope.imagenes.splice(e.target.result);
            $scope.imagenes.push(e.target.result);

        });
    }



	$scope.enviar=function() {
	   	 var foto= document.getElementById("foto").value;
	     var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 var colegio= document.getElementById("colegio").value;
		 var contras=$scope.hash(cont);
		 console.log('http://127.0.0.1:18080/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio+'&foto='+foto);
		 
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
	
		$http.get('http://127.0.0.1:18080/spal-server/rs/spal/login/?user='+usuario+'&pass='+contras).then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);

		    if(response.data.user!=null && response.data.tipo==2){
		    	alert("Login exitoso");
				localStorage.setItem("contraseña", contras);
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	location.href = "#!/tutor";

		    }
		      

		    if(response.data.user!=null && response.data.tipo==1){
		    	alert("Login exitoso");
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	localStorage.setItem("contraseña", contras);
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

	$http.get('http://127.0.0.1:18080/spal-server/rs/spal/estudiantes').then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);
		    if (response.data.length>0) {
		    
		    	$scope.estudiantes=response.data;
		 	
		   }
		   else{
			    	alert("No hay estudiantes asociados");
			    }
		  
		}
		function errorCallback(error){
		    console.log(error);
		
		};

	$scope.logout=function (){
		localStorage.clear();
		location.href = "#!/ingreso";
	}

})
	
	app.controller("adminController", function ($scope, $http){

	$http.get('http://127.0.0.1:18080/spal-server/rs/spal/admin').then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);
		    if (response.data.length>0) {
		    
		    	$scope.tutores=response.data;
		 	
		   }
		   else{
			    	alert("No hay usuarios por verificar");
			    }
		  
		}
		function errorCallback(error){
		    console.log(error);
		
		};


	$scope.logout=function (){
		localStorage.clear();
		location.href = "#!/ingreso";
	}

	$scope.acceso=function(id, email){
		$http.get('http://127.0.0.1:18080/spal-server/rs/spal/administrador/?id='+id+'&email='+email).then(successCallback, errorCallback);

		function successCallback(response){
		    var nueva=[];
		    if (response.data.id!=null) {
		    	var elimina=0;
		    	for (var i = 0; i < $scope.tutores.length; i++) {
		    		if($scope.tutores[i].id!=id){
		    			nueva.push($scope.tutores[i]);
		    			//console.log(elimina);
		    		}
		    	}
		    	
		    	$scope.tutores=nueva;
		 				    
		   }
		   else{
			    	alert("Error");
			    }
		  
		}
		function errorCallback(error){
		    console.log(error);
		
		}

	}

	$scope.tutorRegistro=function(){
		
		$http.get('http://127.0.0.1:18080/spal-server/rs/spal/admin').then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);
		    if (response.data.length>0) {
		    	for (var i = 0; i < response.data.length; i++) {
		    		if(response.data[i].acceso==1){
		    			response.data[i].eliminar=true;
		    			response.data[i].verificar=false;
		    		}
		    		else{
		    			response.data[i].eliminar=false;
		    			response.data[i].verificar=true;
		    		}
		    	}
		    	$scope.tutores=response.data;
		 	
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
			var hash = SHA256(n);
	    	return (hash);
		}

	$scope.agregar=function(){
		 var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
		 var cumple= document.getElementById("cumple").value;
		 var genero= document.getElementById("genero").value;
		
		 console.log('http://127.0.0.1:18080/spal-server/rs/spal/insertar/?nombre='+nombre+'&apellido='+apellido+'&user='+usuario+'&genero='+genero+'&cumple='+cumple);
		 
		 $http.get('http://127.0.0.1:18080/spal-server/rs/spal/insertar/?nombre='+nombre+'&apellido='+apellido+'&user='+usuario+'&genero='+genero+'&cumple='+cumple).then(successCallback, errorCallback);

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

app.controller("olvidoController", function ($scope, $http){
		
	$scope.cambiar=function() {
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 console.log('http://127.0.0.1:18080/spal-server/rs/spal/cambio/?email='+mail+'&contra='+cont);
		 
		 $http.get('http://127.0.0.1:18080/spal-server/rs/spal/cambio/?email='+mail+'&contra='+cont).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.mail!=null && response.data.pass!=null){
		    	alert("Cambio de contraseña exitoso.");
		    }
		 
		    if(response.data.mail==null && response.data.pass==null){
		    	alert("No te encuentras registrado con este Email.");
		    }
		}

		function errorCallback(error){
		    console.log(error);
		}
	}
})