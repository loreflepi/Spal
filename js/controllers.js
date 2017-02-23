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
 
 
app.controller("registroController", function ($scope){
	$scope.enviar=function() {
	    alert($scope.nombre+ $scope.email+ $scope.colegio);
		}
})
 
app.controller("ingresoController", function ingresoController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	
})

app.controller("contactoController", function contactoController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	
})

app.controller("inicioController", function ($scope){
	$scope.saludo = "Hola desde el controlador login";
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