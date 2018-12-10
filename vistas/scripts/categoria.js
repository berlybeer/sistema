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
	$("#idcategoria").val("");
	$("#nombre").val("");
	$("#descripcion").val("");
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
				url : '../ajax/categoria.php?op=listar',
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
		url: "../ajax/categoria.php?op=guardaryeditar",
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
	$.post("../ajax/categoria.php?op=mostrar",{idcategoria:id}, function(data){
		data = JSON.parse(data);
		mostrarform(true);
		$("#nombre").val(data.nombre);
		$("#descripcion").val(data.descripcion);
		$("#idcategoria").val(data.idcategoria);
	})
}

function desactivar(idcategoria)
{
	bootbox.confirm("¿Esta seguro de desactivar la categoria", function(result){
		if(result){
			$.post("../ajax/categoria.php?op=desactivar", {idcategoria: idcategoria}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}

function activar(idcategoria)
{
	bootbox.confirm("¿Esta seguro de activar la categoria", function(result){
		if(result){
			$.post("../ajax/categoria.php?op=activar", {idcategoria: idcategoria}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}


init();