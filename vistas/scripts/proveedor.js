var tabla;

function init()
{
	mostrarform(false);
	listar();
	$("#formulario").on("submit", function(e)
	{
		guardaryeditar(e);
	})
}


function limpiar()
{
	$("#nombre").val("");
	$("#num_documento").val("");
	$("#direccion").val("");
	$("#idtelefono").val("");
	$("#email").val("");
	$("#idpersona").val("");
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
				url : '../ajax/persona.php?op=listarp',
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
	e.preventDefault();
	$("#bntGuardar").prop("disabled", true);
	var formData = new FormData($("#formulario")[0]);
	$.ajax({
		url: "../ajax/persona.php?op=guardaryeditar",
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
	$.post("../ajax/persona.php?op=mostrar",{idpersona:id}, function(data){
		data = JSON.parse(data);
		mostrarform(true);
		$("#nombre").val(data.nombre);
		$("#tipo_documento").val(data.tipo_documento);
		$("#tipo_documento").selectpicker('refresh');
		$("#num_documento").val(data.num_documento);
		$("#direccion").val(data.direccion);
		$("#telefono").val(data.telefono);
		$("#email").val(data.email);
		$("#idpersona").val(data.idpersona);

	})
}

function eliminar(idpersona)
{
	bootbox.confirm("¿Esta seguro de eliminar el proveedor", function(result){
		if(result){
			$.post("../ajax/persona.php?op=eliminar", {idpersona: idpersona}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}


init();