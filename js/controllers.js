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
	$scope.msg="bla";
	function validar(){

		var correcto = true;

		if(document.getElementById('nombre').value.length < 2 ){
	    	correcto = false;
		}

		var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
		var email = document.form1.email.value;
		if (!expresion.test(email)){
	    	correcto = false;
		}

		if(!correcto){
			alert('Algunos campos no están correctos, vuelva a revisarlos');
		}

		return correcto;
	}

});
 
app.controller("ingresoController", function ingresoController($scope, $location){
	$scope.saludo = "Hola desde el controlador login";
	
})