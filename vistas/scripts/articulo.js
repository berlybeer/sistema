

var tabla;

function init()
{
	mostrarform(false);
	listar();
	$("#formulario").on("submit", function(e)
	{
		guardaryeditar(e);
	})

	$.post("../ajax/articulo.php?op=selectCategoria", function(r){
		$("#idcategoria").html(r);
		$("#idcategoria").selectpicker('refresh');
	});

	$("imagenmuestra").hide();
}


function limpiar()
{
	$("#codigo").val("");
	$("#nombre").val("");
	$("#descripcion").val("");
	$("#stock").val("");
	$("#imagenmuestra").attr("src", "");
	$("#imagenactual").val("");
	$("#print").hide();
	$("#idarticulo").val("");
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
				url : '../ajax/articulo.php?op=listar',
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
		url: "../ajax/articulo.php?op=guardaryeditar",
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
	$.post("../ajax/articulo.php?op=mostrar",{idarticulo:id}, function(data){
		data = JSON.parse(data);
		mostrarform(true);
		$("#idcategoria").val(data.idcategoria);
		$("#idcategoria").selectpicker('refresh');
		$("#codigo").val(data.codigo);
		$("#nombre").val(data.nombre);
		$("#stock").val(data.stock);
		$("#descripcion").val(data.descripcion);
		$("#imagenmuestra").show();
		$("#imagenmuestra").attr("src", "../files/articulos/"+data.imagen);
		$("#imagenactual").val(data.imagen);
		$("#idarticulo").val(data.idarticulo);
		generarbarcode();
	})
}

function desactivar(idarticulo)
{
	bootbox.confirm("¿Esta seguro de desactivar el articulo?", function(result){
		if(result){
			$.post("../ajax/articulo.php?op=desactivar", {idarticulo: idarticulo}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}

function activar(idarticulo)
{
	bootbox.confirm("¿Esta seguro de activar el articulo", function(result){
		if(result){
			$.post("../ajax/articulo.php?op=activar", {idarticulo: idarticulo}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}

function generarbarcode()
{
	codigo=$("#codigo").val();
	JsBarcode("#barcode", codigo);
	$("#print").show();

}

function imprimir()
{
	$("#print").printArea();
}


init();