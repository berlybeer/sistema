<?php 

require_once "global.php";

$conexion = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

$sql = 'SET NAMES "' . DB_ENCODE . '"';

$conexion->query($sql);

if($conexion->connect_errno){
	printf("Falló conexion a la base de datos: %s\n" , $conexion->connect_error);
	exit();
}

if(!function_exists('ejecutarConsulta')){
	function ejecutarConsulta($sql)
	{
		global $conexion;
		$query = $conexion->query($sql);
		return $query;


	}

	function ejecutarConsultaSimpleFila($sql)
	{
		global $conexion;
		$query = $conexion->query($sql);
		$row = $query->fetch_assoc();

		return $row;

	}

	function ejecutarConsulta_retornarID($sql)
	{
		global $conexion;
		$query = $conexion->query($sql);
		$id = $conexion->insert_id;
		return $id;

	}

	function limpiarCadena($str)
	{
		global $conexion;
		$str = $conexion->escape_string($str);
		return htmlspecialchars($str);

	}
}





 ?>