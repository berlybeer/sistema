var tabla;

function init()
{
	mostrarform(false);
	listar();
	$("#formulario").on("submit", function(e)
	{
		guardaryeditar(e);
	})

	$("imagenmuestra").hide();

	// $.post("../ajax/usuario.php?op=permisos&id=", function(r){
	// 	$("#permisos").html(r);
	// });

}


function limpiar()
{

	$("#nombre").val("");
	$("#num_documento").val("");
	$("#direccion").val("");
	$("#telefono").val("");
	$("#email").val("");
	$("#cargo").val("");
	$("#login").val("");
	$("#clave").val("");
	$("#imagenmuestra").attr("src","");
	$("#imagenactual").val("");
	$("#idusuario").val("");
}


function mostrarform(flag)
{
	limpiar();
	if(flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled", false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}


function cancelarform()
{
	limpiar();
	mostrarform(false);
}


function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"Processing" : true,
		"ServerSide" : true,
		dom: 'Bfrtip',
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdf'
			],
		"ajax": 
			{
				url : '../ajax/usuario.php?op=listar',
				type : "get",
				dataType : "json",
				error : function(e){
					console.log(e.responseText);
				}
			},

		"bDestroy" : true,
		"iDisplayLength" : 5,
		"order" : [[0, "desc"]]


	}).dataTable();
}



//funcion para guardar o editar

function guardaryeditar(e)
{
	// alert(e);
	e.preventDefault();
	$("#bntGuardar").prop("disabled", true);
	var formData = new FormData($("#formulario")[0]);
	$.ajax({
		url: "../ajax/usuario.php?op=guardaryeditar",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,

		success: function(datos)
		{
			bootbox.alert(datos);
			mostrarform(false);
			$("#tbllistado").dataTable().api().ajax.reload();
		}
	});

	limpiar();

}

function mostrar(id)
{
	$.post("../ajax/usuario.php?op=mostrar",{idusuario:id}, function(data){
		data = JSON.parse(data);
		mostrarform(true);
		$("#nombre").val(data.nombre);
		$("#tipo_documento").val(data.tipo_documento);
		$("#tipo_documento").selectpicker('refresh');
		$("#num_documento").val(data.num_documento);
		$("#direccion").val(data.direccion);
		$("#telefono").val(data.telefono);
		$("#email").val(data.email);
		$("#cargo").val(data.cargo);
		$("#login").val(data.login);
		$("#clave").val(data.clave);
		$('#imagenmuestra').show();
		$('#imagenmuestra').attr("src", "../files/usuarios/"+data.imagen);
		$("#imagenactual").val(data.imagen);
		$("#idusuario").val(data.idusuario);
	
	});

	$.post("../ajax/usuario.php?op=permisos&id="+id, function(r){
		$("#permisos").html(r);
	});
}

function desactivar(idusuario)
{
	bootbox.confirm("¿Esta seguro de desactivar el usuario?", function(result){
		if(result){
			$.post("../ajax/usuario.php?op=desactivar", {idusuario: idusuario}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}

function activar(idusuario)
{
	bootbox.confirm("¿Esta seguro de activar el usuario", function(result){
		if(result){
			$.post("../ajax/usuario.php?op=activar", {idusuario: idusuario}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}


init();
