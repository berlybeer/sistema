  
<?php 


session_start();

if (!isset($_SESSION["nombre"])){
  header("Location: login.html");
}else{


  echo "<p>ingresaste</p>";

  if ($_SESSION['almacen']==1){
   echo "<p>tienes acceso a almacen</p>";
   print_r($_SESSION);

  }else{
    echo "<p>no tiens acceso a almacen</p>";
    print_r($_SESSION);
  }



}

 ?>
