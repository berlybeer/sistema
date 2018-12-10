

var tabla;

function init()
{
	mostrarform(false);
	listar();
	$("#formulario").on("submit", function(e)
	{
		guardaryeditar(e);
	});

	$.post("../ajax/ingreso.php?op=selectProveedor", function(r){
			$("#idproveedor").html(r);
			$("#idproveedor").selectpicker('refresh');

	});

}


function limpiar()
{
	$("#idproveedor").val("");
	$("#proveedor").val("");
	$("#serie_comprobante").val("");
	$("#num_comprobante").val("");
	$("#impuesto").val("0");

	$("#total_compra").val("");
	$(".filas").remove();
	$("#total").html("0");

	var now = new Date();
	console.log(now);
	console.log(now.getDate());
	var day = ("0" + now.getDate()).slice(-2);
	console.log(day);
	console.log(now.getMonth());
	var month = ("0" + (now.getMonth()+1)).slice(-2);
	console.log(month);
	var today = now.getFullYear()+"-"+(month)+"-"+(day);
	$('#fecha_hora').val(today);

	$("#tipo_comprobante").val("Boleta");
	$("#tipo_comprobante").selectpicker('refresh');


}


function mostrarform(flag)
{
	limpiar();
	if(flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		// $("#btnGuardar").prop("disabled", false);
		$("#btnagregar").hide();
		listarArticulos();

	
		$("#btnGuardar").hide();
		$("#btnCancelar").show();
		detalles=0;
		$("#btnAgregarArt").show();

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
	// detalles=0;
	// $("#btnGguardar").hide();
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
				url : '../ajax/ingreso.php?op=listar',
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


function listarArticulos()
{
	tabla=$('#tblarticulos').dataTable(
	{
		"Processing" : true,
		"ServerSide" : true,
		dom: 'Bfrtip',
		buttons: [
			
			],
		"ajax": 
			{
				url : '../ajax/ingreso.php?op=listarArticulos',
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
	// $("#bntGuardar").prop("disabled", true);
	var formData = new FormData($("#formulario")[0]);
	console.log(formData);
	$.ajax({
		url: "../ajax/ingreso.php?op=guardaryeditar",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,

		success: function(datos)
		{
			bootbox.alert(datos);
			mostrarform(false);
			listar();
			// $("#tbllistado").dataTable().api().ajax.reload();
		}
	});

	limpiar();

}

function mostrar(id)
{
	$.post("../ajax/ingreso.php?op=mostrar",{idingreso:id}, function(data){
		data = JSON.parse(data);
		mostrarform(true);
		$("#idproveedor").val(data.idproveedor);
		$("#idproveedor").selectpicker('refresh');
		$("#tipo_comprobante").val(data.tipo_comprobante);
		$("#tipo_comprobante").selectpicker('refresh');
		$("#serie_comprobante").val(data.serie_comprobante);
		$("#num_comprobante").val(data.num_comprobante);
		$("#fecha_hora").val(data.fecha);
		$("#impuesto").val(data.impuesto);
		$("#idingreso").val(data.idingreso);

		DE
		$("#btnGuardar").hide();
		$("#btnCancelar").show();
		$("#btnAgregarArt").hide();


	});

	$.post("../ajax/ingreso.php?op=listarDetalle&id="+id, function(r){
		$("#detalles").html(r);
	});
}

function anular(idingreso)
{
	bootbox.confirm("¿Esta seguro de anular el ingreso?", function(result){
		if(result){
			$.post("../ajax/ingreso.php?op=anular", {idingreso: idingreso}, function(e){
				bootbox.alert(e);
				$("#tbllistado").dataTable().api().ajax.reload();
			})
		}
	})
}


var impuesto=18;
var cont=0;
var detalles=0;

$("#btnGuardar").hide();
$("#tipo_comprobante").change(marcarImpuesto);

function marcarImpuesto()
{
	var tipo_comprobante=$("#tipo_comprobante option:selected").text();
	if(tipo_comprobante =='Factura'){
		$("#impuesto").val(impuesto);
	}else{
		$("#impuesto").val("0");
	}
}


function agregarDetalle(idarticulo, articulo){
	var cantidad = 1;
	var precio_compra = 1;
	var precio_venta = 1;

	if(idarticulo!=""){
		var subtotal=cantidad*precio_compra;
		var fila = '<tr class="filas" id="fila'+cont+'">'+
		'<td><button type="button" class="btn btn-danger" onclick="eliminarDetalle('+cont+')">X</button></td>'+
		'<td><input type="hidden" name="idarticulo[]" value="'+idarticulo+'">'+articulo+'</td>'+
		'<td><input type="number" name="cantidad[]" id="cantidad[]" value="'+cantidad+'"></td>'+
		'<td><input type="number" name="precio_compra[]" id="precio_compra[]" value="'+precio_compra+'"></td>'+
		'<td><input type="number" name="precio_venta[]" value="'+precio_venta+'"></td>'+
		'<td><span name="subtotal" id="subtotal'+cont+'">'+subtotal+'</span></td>'+
		'<td><button type="button" onclick="modificarSubtotales()" class="btn btn-info"><i class="fa fa-refresh"></i></td>'+
		'</tr>';

		cont++;
		detalles=detalles+1;
		$('#detalles').append(fila);
		modificarSubtotales();
	}else{
		alert("Error al ingresar el detalle, revisar los datos del articulo");
	}
}

function modificarSubtotales()
{
	var cant = document.getElementsByName("cantidad[]");
	var prec = document.getElementsByName("precio_compra[]");
	var sub = document.getElementsByName("subtotal");

	for (var i = 0; i < cant.length; i++){
		var inpC = cant[i];
		var inpP = prec[i];
		var inpS = sub[i];

		inpS.value=inpC.value * inpP.value;
		x = document.getElementsByName("subtotal");
		x[i].innerHTML = inpS.value;
	}

	calcularTotales();
}

function calcularTotales(){
	var sub = document.getElementsByName("subtotal");
	var total = 0.0;
	for(var i = 0; i < sub.length; i++){
		total += document.getElementsByName("subtotal")[i].value;
	}

	$("#total").html("S/. " + total);
	$("#total_compra").val(total);
	evaluar();
}

function evaluar(){
	if(detalles>0)
	{
		$("#btnGuardar").show();
	}else{
		$("#btnGguardar").hide();
		cont=0;
	}
}

function eliminarDetalle(indice){
	$("#fila"+indice).remove();
	calcularTotales();
	detalles=detalles-1;
	evaluar();
}




init();