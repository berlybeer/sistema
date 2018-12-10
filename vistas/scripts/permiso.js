var tabla;

function init()
{
	mostrarform(false);
	listar();
}

function mostrarform(flag)
{

	if(!flag)
	{
		$("#listadoregistros").show();
		$("#btnagregar").hide();
	}

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
				url : '../ajax/permiso.php?op=listar',
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







init();