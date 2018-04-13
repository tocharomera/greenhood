$(document).ready(function () {
    listado();
});

function listado() {
    $.get('http://localhost:43210/almacen', function (productos) {
        var rslt = $('<form/>');
        var tab = $('<table class="table table-striped table-hover"><tr class="info"><th>Producto</th><th>Categoria</th><th>Cantidad/kg</th><th>Fecha</th><th>Precio €/kg</th><th></th></tr></table>');
        rslt.append(tab);
        $('#tablaAlmacen').empty().append(rslt);
        for (var i = 0; i < productos.length; ++i) {
            var tr = $('<tr/>');
            if (productos[i].Producto && productos[i].Producto.length > 20)
                tr.addClass('danger');
            tr.append($('<td><input type="button" class="btn btn-link" value="' + productos[i].Producto + '" onclick="ver(' + productos[i].id + ');"></td>'));
            tr.append($('<td><input type="button" class="btn btn-link" value="' + productos[i].Categoria + '" onclick="ver(' + productos[i].id + ');"></td>'));
            tr.append($('<td><input type="button" class="btn btn-link" value="' + productos[i].Cantidad + '" onclick="ver(' + productos[i].id + ');"></td>'));
            tr.append($('<td><input type="button" class="btn btn-link" value="' + productos[i].Fecha + '" onclick="ver(' + productos[i].id + ');"></td>'));
            tr.append($('<td><input type="button" class="btn btn-link" value="' + productos[i].Precio + '" onclick="ver(' + productos[i].id + ');"></td>'));
            var td = $('<td/>');
            var form = $('<form/>');
            //td.addClass('btn-group');
            // {"id":3,"Producto":"naranjas","Cantidad":"6kg","Fecha":"10/3/2018","Precio":"5€"}
            form.append($('<input type="number" id="txtCantidad' + productos[i].id + '" value="0" min="1" max="'+productos[i].Cantidad+'">'));
            // idProducto, productor, nombreProducto, precio, cantidad, categoria, fecha
            form.append($('<button type="button" class="btn btn-info" onclick="mng.addProducto(' + productos[i].id + ', \'Mario Lucena\', \'' + productos[i].Producto + '\', ' +
                productos[i].Precio + ', \'#txtCantidad' + productos[i].id + '\', \'' + productos[i].Categoria + '\', \'' + productos[i].Fecha + '\');"><span class="glyphicon glyphicon-shopping-cart"></span></button>'));
            td.append(form);
            tr.append(td);
            tab.append(tr);


        }

    }, 'json');
    // }
    // function añadir() {
    //     $('#modalProducto').modal('show');
    //     // $('#btnEnviarProducto').on('click', añadirProducto);
    // }
    // function volver() {
    //     $('#modalProducto').modal('hide');
    // }

    // function añadirProducto() {
    //     var datos = $('#frmAlmacen').serializeArray();
    //     var Producto = {};
    //     datos.forEach(function (item) {
    //         Producto[item.name] = item.value;

    //     });


    //     Producto["nombre"]= localStorage.getItem("email");
    //    // Producto['nombre'] = 'nombreproductor';
    //     Producto.productor = !(Producto.productor == undefined) ;
    //     Producto.comprador = !(Producto.comprador == undefined) ;

    //     if(Producto.Producto=="" ||  Producto.Producto.length==0){
    //         alert("el nombre no puede estar vacio");
    //         return false;
    //     }
    //     if(Producto.Categoria=="" || Producto.Categoria.length==0){
    //         alert("debes indicar si es: fruta,verdura,conservas o cereales");
    //         return false;
    //     }    
    //     if(Producto.Cantidad=="" || Producto.Cantidad.length==0){
    //         alert("debes indicar peso en kg");
    //         return false;
    //     }    
    //     if(Producto.Precio=="" || Producto.Precio.length==0){
    //         alert("debes indicar el precio en euros por cada kg");
    //         return false;
    //     }

    // $.ajax({
    //     url: 'http://localhost:43210/almacen',
    //     method: 'POST',
    //     dataType: 'json',
    //     data: Producto
    // }).then(
    //     function () {
    //         //$('#btnEnviarLog').off('click', newUser);
    //         listado();
    //         volver();
    //     },
    //     function (jqXHR, textStatus, errorThrown) {
    //         $('errorMsg').html(
    //             '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
    //     }
    // );
}


