
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>	Noticias varias</title>
	<link rel="stylesheet" href="externa.css" rel="stylesheet">
	<style>
		#noticias li {
			display: inline-block;
			margin-right: 30px;
		}
		#noticias li a {
			padding: 5px 10px;
			background-color: white;
			color: black;
			text-decoration: none;
		}
		#noticias li a:hover{
			background-color: rgb(255,153,0);
			color: white;
		}
		#contenidos_externos, #noticia{
			margin-top: 10px;
			padding: 20px;
			border: 1px solid green;
		}
	</style>
	<script
  		src="https://code.jquery.com/jquery-3.3.1.min.js"
  		integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  		crossorigin="anonymous">
  	</script>
  	<script>
  	$(document).ready(function(){
  		$("#login").submit(function(){
  			// var datosFormulario={
  			// 	usuario:$("#usuario").val(),
  			// 	contra:$("#contra").val() 
  			// }

  			// var datosFormulario = $(this).serialize();

  			var datosFormulario = {idcategoria:$("#idcategoria").val()};
  			
  			// $.getJSON("login2.php",datosFormulario, procesarDatos);
  			console.log(datosFormulario);
  			$.post("../../ajax/categoria.php?op=mostrar",datosFormulario,function(data){
  				var obj = JSON.parse(data);
  				$("#contenidos_externos").html(data);
  				$("#descripcion").val(obj.nombre);
  				$("#descripcion2").val(obj.descripcion);
  			});
  			return false;

  		});



  			function procesarDatos(e){
  				var data = JSON.parse(e);
  				$("#contenidos_externos").html(e);
  				$("#contenidos_externos2").html(e);
  				$("#descripcion").val(data.nombre);
  				$("#descripcion2").val(e.nombre);


  			}


  	});

  	</script>

</head>
<body>

	<div class="cabecera">
		<p class="logo">Procesando respuesta del servidor</p>
	</div>
	<div class="contenido">
		<div class="principal">
			<form method="get" action="login.php" id="login">
				<table>
					<tr>
						<td>
							<label for="idcategoria">idcategoria:</label>
						</td>
						<td>
							<input type="text" name="idcategoria" id="idcategoria">
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<input type="submit" id="boton" name="boton" value="Enviar">
						</td>						
					</tr>
				</table>
			</form>
			
			<div id="contenidos_externos"></div>
			<div id="contenidos_externos2"></div>
			<input type="text" class="form-control" name="descripcion" id="descripcion" maxlegth="256" placeholder="Descripcion">
			<input type="text" class="form-control" name="descripcion2" id="descripcion2" maxlegth="256" placeholder="Descripcion2">
		</div>

	</div>
</body>
</html>