

app.controller("homeController", function ($scope){

})

app.controller("barraController", function ($scope,$window){


	if(localStorage.getItem("Nombre de usuario admin")!=null){
		$scope.logeadoa=true;
		$scope.esconder=true;
	}

	if(localStorage.getItem("Nombre de usuario")!=null){
		$scope.logeado=true;
		$scope.esconder=true;
	}


	$scope.recargat=function() {
		localStorage.clear();
		$logeado=false;
		$esconder=true;
		location.href = "#!/ingreso";
		location.reload();

	}

	$scope.recargaa=function() {
		localStorage.clear();
		$esconder=true;
		$logeadoa=false;
		location.href = "#!/ingreso";
		location.reload();

	}

})
 
 
app.controller("registroController", function ($scope,$http){
	
	$scope.hash=function(n){
		var hash = SHA256(n);
    	return (hash);
	}

    $scope.imageUpload = function(event){
    	 var preview=document.querySelector('img[id=foto]');
         var file = document.querySelector('input[type=file]').files[0]; 
         var reader = new FileReader();
   		 var b;
          reader.onload = $scope.imageIsLoaded=function(){
          
          	preview.src=reader.result;
          	$scope.dir=document.getElementById("foto").getAttribute("src");

          	

          } 


          if (file) {
          	  reader.readAsDataURL(file); 
          }
          else{
          	preview.src="";
          }

    }

	$scope.enviar=function() {
	
	     var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 var colegio= document.getElementById("colegio").value;
		 var contras=$scope.hash(cont);
		 
		 //console.log('http://198.199.64.141:9081/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio+'&imagen='+imagen);
		 
		 $http.get('http://198.199.64.141:9081/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.mail!=null && response.data.user!=null){
		    	
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	localStorage.setItem("Nombre de colegio", colegio);
		    	localStorage.setItem("Nombre", nombre);
		    	localStorage.setItem("Apellido", apellido);
		    	localStorage.setItem("colegio", colegio);
		    	localStorage.setItem("mail", mail);
		    	var parameter = JSON.stringify({ima:$scope.dir,usu:usuario});
	          	$http.post("http://198.199.64.141:9081/spal-server/rs/spal/update/",parameter).then(success, error);
	          	function success(data) {
	          		alert("Espera a un correo de verificación por parte del administador.");
	        		console.log(data);
	      		}
		        function error(data) {
	  				console.log("Error subiendo imagen");
	    	    }
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

	$scope.login=function(){

		var usuario= document.getElementById("usu").value;
		var contra= document.getElementById("contra").value;
		var contras=$scope.hash(contra);
	
		$http.get('http://198.199.64.141:9081/spal-server/rs/spal/login/?user='+usuario+'&pass='+contras).then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);

		    if(response.data.user!=null && response.data.tipo==2){
				localStorage.setItem("contraseña", contras);
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	location.href = "#!/tutor";
				$logeado=true;
				location.reload();
		    }
		      
		    if(response.data.user!=null && response.data.tipo==1){
		    	localStorage.setItem("Nombre de usuario admin", usuario);
		    	localStorage.setItem("contraseña", contras);
		    	location.href = "#!/administrador";
		    	$logeadoa=true;
				location.reload();
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

app.controller("contactoController", function ($scope, $http){

	$scope.envio= function(){
	var email= document.getElementById("email").value;
		var asunto= document.getElementById("asunto").value;
		var mensaje=document.getElementById("mensaje").value;;
	
		$http.get('http://198.199.64.141:9081/spal-server/rs/spal/contacto/?email='+email+'&asunto='+asunto+'&mensaje='+mensaje).then(successCallback, errorCallback);

		function successCallback(response){
		    console.log(response);

		    if(response.data.email!=null){
		    	alert("Se envió tu correo");
		
		    }
		   
		      if (response.data.email==null ){
		    	alert("No se pudo enviar tu correo");

		    }
		}
		function errorCallback(error){
		    console.log(error);
		
		}
	}
 
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

app.controller("tutorController", function ($scope,$http,$route){
	
	$scope.nombre=localStorage.getItem('Nombre de usuario');
	//console.log('http://198.199.64.141:9081/spal-server/rs/spal/estudiantes/?tutor='+$scope.nombre);
	$http.get('http://198.199.64.141:9081/spal-server/rs/spal/estudiantes/?tutor='+$scope.nombre).then(successCallback, errorCallback);

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
		$logeado=false;
		location.href = "#!/ingreso";
		location.reload();
	}

	$scope.guardar=function(nombre){
		localStorage.setItem("Nombre estudiante", nombre);
		 console.log(nombre);
	}

})
	
	app.controller("adminController", function ($scope, $http){

	$http.get('http://198.199.64.141:9081/spal-server/rs/spal/admin').then(successCallback, errorCallback);

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
		$loagadmin=false;
		location.href = "#!/ingreso";
		location.reload();
	}

	$scope.acceso=function(id, email){
		$http.get('http://198.199.64.141:9081/spal-server/rs/spal/administrador/?id='+id+'&email='+email).then(successCallback, errorCallback);

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
		
		$http.get('http://198.199.64.141:9081/spal-server/rs/spal/admin').then(successCallback, errorCallback);

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

	 $scope.imageUpload = function(event){
    	 var preview=document.querySelector('img[id=foto]');
         var file = document.querySelector('input[type=file]').files[0]; 
         var reader = new FileReader();
   		 var b;
          reader.onload = $scope.imageIsLoaded=function(){
          
          	preview.src=reader.result;
          	$scope.dir=document.getElementById("foto").getAttribute("src");

          	

          } 


          if (file) {
          	  reader.readAsDataURL(file); 
          }
          else{
          	preview.src="";
          }

    }


	$scope.agregar=function(){
		 var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
		 var cumple= document.getElementById("cumple").value;
		 var genero= document.getElementById("genero").value;
		
		 //console.log('http://198.199.64.141:9081/spal-server/rs/spal/insertar/?nombre='+nombre+'&apellido='+apellido+'&user='+usuario+'&genero='+genero+'&cumple='+cumple);
		 
		 $http.get('http://198.199.64.141:9081/spal-server/rs/spal/insertar/?nombre='+nombre+'&apellido='+apellido+'&user='+usuario+'&genero='+genero+'&cumple='+cumple).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.user!=null){
		    
		    	localStorage.setItem("Genero", genero);
		    	localStorage.setItem("Nombre", nombre);
		    	localStorage.setItem("Apellido", apellido);
		    	localStorage.setItem("usuario", usuario);
		    	var parameter = JSON.stringify({ima:$scope.dir,usu:usuario});
	          	$http.post("http://198.199.64.141:9081/spal-server/rs/spal/updatest/",parameter).then(success, error);
	          	function success(data) {
	          		alert("Insertado correctamente.");
	        		console.log(data);
	      		}
		        function error(data) {
	  				console.log("Error subiendo imagen");
	    	    }
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

	 $http.get('http://198.199.64.141:9081/spal-server/rs/spal/reporte/?user='+localStorage.getItem('Nombre de usuario')).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    
		    $scope.reportes=response.data;
		}

		function errorCallback(error){
		    console.log(error);
		}

		$scope.filterBySearch = function (item) {
        return Object.keys($scope.search || {}).every(function (key) {
            var value = $scope.search[key]; 
            return (value === undefined) || 
                   (value === null) ||
                   value === item[key];
        });
    }

	
})

app.controller("olvidoController", function ($scope, $http){
		
	$scope.cambiar=function() {
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 console.log('http://198.199.64.141:9081/spal-server/rs/spal/cambio/?email='+mail+'&contra='+cont);
		 
		 $http.get('http://198.199.64.141:9081/spal-server/rs/spal/cambio/?email='+mail+'&contra='+cont).then(successCallback, errorCallback);

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

app.controller("nuevaController", function ($scope, $http){

	$scope.imageUpload = function(event){
    	 var preview=document.querySelector('img[id=foto]');
         var file = document.querySelector('input[type=file]').files[0]; 
         var reader = new FileReader();
   		 var b;
          reader.onload = $scope.imageIsLoaded=function(){
          
          	preview.src=reader.result;
          	$scope.dir=document.getElementById("foto").getAttribute("src");

          } 


          if (file) {
          	  reader.readAsDataURL(file); 
          }
          else{
          	preview.src="";
          }

    }

	$scope.enviar=function() {
	
	     var nombre= document.getElementById("nombre").value;
	     var apellido= document.getElementById("apellido").value;
	     var usuario= document.getElementById("usuario").value;
	     var mail= document.getElementById("email").value;
		 var cont= document.getElementById("cont").value;
		 var colegio= document.getElementById("colegio").value;
		 var contras=$scope.hash(cont);
		 
		 //console.log('http://198.199.64.141:9081/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio+'&imagen='+imagen);
		 
		 $http.get('http://198.199.64.141:9081/spal-server/rs/spal/registro/?nombre='+nombre+'&apellido='+apellido+'&mail='+mail+'&user='+usuario+'&pass='+contras+'&colegio='+colegio).then(successCallback, errorCallback);

		function successCallback(response){
			console.log(response.data);
		    if(response.data.mail!=null && response.data.user!=null){
		    	
		    	localStorage.setItem("Nombre de usuario", usuario);
		    	localStorage.setItem("Nombre de colegio", colegio);
		    	localStorage.setItem("Nombre", nombre);
		    	localStorage.setItem("Apellido", apellido);
		    	localStorage.setItem("colegio", colegio);
		    	localStorage.setItem("mail", mail);
		    	var parameter = JSON.stringify({ima:$scope.dir,usu:usuario});
	          	$http.post("http://198.199.64.141:9081/spal-server/rs/spal/update/",parameter).then(success, error);
	          	function success(data) {
	          		alert("Espera a un correo de verificación por parte del administador.");
	        		console.log(data);
	      		}
		        function error(data) {
	  				console.log("Error subiendo imagen");
	    	    }
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