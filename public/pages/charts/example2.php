<script type="text/javascript">
	$(document).ready(function(){
		var datos = {
			type: "doughnut",
			data: {
				datasets :[{
					data : [
						<?php 
					$sql = "SELECT * FROM articulo";
					global $conexion;
					$query = $conexion->query($sql);
					while ($reg = $query->fetch_object()){
						 echo "'" . $reg->stock . "',";
					}
				
					 ?>
					],
					backgroundColor:[
						"#F7564A",
						"#46BFBD",
						
					]
				}],
				labels : [
					<?php 
					$sql = "SELECT * FROM articulo";
					global $conexion;
					$query = $conexion->query($sql);
					while ($reg = $query->fetch_object()){
						 echo "'" . $reg->nombre . "',";
					}
				
					 ?>
					
				]
			},
			options : {
				responsive : true,
			}
		};



	});






	
</script>