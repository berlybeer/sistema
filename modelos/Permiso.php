<?php 

require "../config/conexion.php";

class Permiso
{
	public function __construct()
	{

	}


	public function listar()
	{
		$sql = "SELECT * FROM permiso";
		return ejecutarConsulta($sql);
	}


}



 ?>