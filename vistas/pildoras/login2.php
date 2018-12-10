<?php 


$el_usuario = isset($_GET['usuario']) ? $_GET['usuario'] : $_POST['usuario'];

$el_array = new stdClass();
	$el_array->Nombre = "Juan";
	$el_array->Apellido = "Gómez";
	$el_array->Edad = "18";
$el_array1 = new stdClass();
	$el_array1->Nombre = "Raquel";
	$el_array1->Apellido = "Mamani";
	$el_array1->Edad = "20";
$el_array2 = new stdClass();
	$el_array2->Nombre = "Jorge";
	$el_array2->Apellido = "Miell";
	$el_array2->Edad = "30";



if($el_usuario == 'Juan'){
	$json =json_encode($el_array);
	echo $json;
}else if($el_usuario == 'Raquel'){
	$json =json_encode($el_array1);
		echo $json;
}else if($el_usuario == 'Jorge'){
	$json =json_encode($el_array2);
	echo $json;
}else{
	echo "No encontrado";
}
// switch ($elusuario) {
// 	case 'Juan':

// 		break;
// 	case 'Raquel':
	
// 	break;
// 	case 'Jorge':

// 	break;
	
// 	default:
// 		echo "No encontrado";
// 		break;
// }


 ?>