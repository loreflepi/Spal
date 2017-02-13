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
 
 
app.controller("registroController", function($scope){
	$scope.enviar=function() {
  if ($scope.miFormulario.$valid) {
    alert("Los datos aqui se habrían enviado al servidor  y estarían validados en la parte cliente");
  }else {
    alert("Hay datos inválidos");
  }
}
})
 
app.controller("ingresoController", function ingresoController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	
})

app.controller("contactoController", function contactoController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	
})