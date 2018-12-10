<?php 

require_once "../../../config/conexion.php";

 ?>

<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>ChartJS</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

</head>
<body>
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- ChartJS -->
<!-- <script src="../../bower_components/chart.js/Chart.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<!-- FastClick -->
<script src="../../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../../dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>

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
		var canvas = document.getElementById('pieChart').getContext('2d');
		window.pie  = new Chart(canvas, datos);


		// $.ajax({
		// 	url: "../../../ajax/articulo.php?op=chart",
		// 	success:function(response){
		// 		var canvos = document.getElementById('myChart').getContext('2d');
		// 		window.pie  = new Chart(canvos, response);

		// 	}
		// });
		$.ajax({
		url : "../../../ajax/articulo.php?op=chart",
		type : "GET",
		success : function(data){
			console.log(data);

			var nombre = [];
			var stock = [];

	

			var len = data.length;
			console.log(len);

			for (var i = 0; i < len; i++) {
				nombre.push(data[i].nombre);
				stock.push(data[i].stock);
			}

			console.log(nombre);
			console.log(stock);

			var ctx = $("#myChart");

			var data1 = {
				labels : nombre,
				datasets : [
					{
						label : "bbbbbbb",
						data : stock,
						backgroundColor:[
						"#F7564A",
						"#46BFBD",
						"#F4BFBD",
						
					],

					}
				]
			};

			var chart1 = new Chart(ctx, {
				type : "doughnut",
				data : data1
			});

			




		},
		error : function(data) {
			console.log(data);
		}
		});


	});






	
</script>
<section class="content">
      <div class="row">
        <div class="col-md-6">
			<div class="box box-danger">
		            <div class="box-header with-border">
		              <h3 class="box-title">Donut Chart</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
		              </div>
		            </div>
		            <div class="box-body">
		              <canvas id="pieChart" style="height:250px"></canvas>
		            </div>
		            <!-- /.box-body -->
		      </div>
		     </div>
		            <!-- /.box-body -->
		</div>
	</section>

	 <section class="content">
      <div class="row">
        <div class="col-md-6">
			<div class="box box-danger">
		            <div class="box-header with-border">
		              <h3 class="box-title">Mysql Chart</h3>

		              <div class="box-tools pull-right">
		                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
		                </button>
		                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
		              </div>
		            </div>
		            <div class="box-body">
		            	<p id="calvo"></p>
		            	<p id="canoso"></p>
		              <canvas id="myChart" style="height:250px"></canvas>
		            </div>
		            <!-- /.box-body -->
		      </div>
		     </div>
		            <!-- /.box-body -->
		</div>
	</section>
</body>
    
</html>