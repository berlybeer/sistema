<?php 

class Persona
{
	private $nombre;
	private $estatura;


	public function mostrar(){
		echo $this->nombre . ' mide ' . $this->estatura;
	}


	public function setName($name){
		$this->nombre = $name;
	}

	public function setEstatura($estatura){
		$this->estatura = $estatura;
	}

	public function getName(){
		return $this->name;
	}

	public function getEstatura(){
		return $this->estatura;
	}
}


 ?>