$(document).ready(function(){
listado();
});
function listado() {
    $.get('http://localhost:43210/almacen', function (productos) {
        var rslt = $('<table class="table table-striped table-hover"><tr class="info"><th>Producto</th><br><th>Categoria</th><th>Cantidad/kg</th><th>Fecha</th><th>Precio €/kg</th><th><input type="button" class= "btn btn-primary" value="Añadir Producto" onclick="añadir()"></th></tr></table>');
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
            td.addClass('btn-group');
            // {"id":3,"Producto":"naranjas","Cantidad":"6kg","Fecha":"10/3/2018","Precio":"5€"}
            td.append($('<button class="btn btn-danger" onclick="borrar(' + productos[i].id + ');"> Borrar Producto</button>'));
            tr.append(td);
            rslt.append(tr);

        
    }

    }, 'json');
}
function añadir() {
    $('#modalProducto').modal('show');
    // $('#btnEnviarProducto').on('click', añadirProducto);
}
function volver() {
    $('#modalProducto').modal('hide');
}

function añadirProducto() {
    var datos = $('#frmAlmacen').serializeArray();
    var Producto = {};
    datos.forEach(function (item) {
        Producto[item.name] = item.value;
        
    });
   
    
    Producto["nombre"]= localStorage.getItem("email");
   // Producto['nombre'] = 'nombreproductor';
    Producto.productor = !(Producto.productor == undefined) ;
    Producto.comprador = !(Producto.comprador == undefined) ;
    
    if(Producto.Producto=="" ||  Producto.Producto.length==0){
        alert("el nombre no puede estar vacio");
        return false;
    }
    if(Producto.Categoria=="" || Producto.Categoria.length==0){
        alert("debes indicar si es: fruta,verdura,conservas o cereales");
        return false;
    }    
    if(Producto.Cantidad=="" || Producto.Cantidad.length==0){
        alert("debes indicar peso en kg");
        return false;
    }    
    if(Producto.Precio=="" || Producto.Precio.length==0){
        alert("debes indicar el precio en euros por cada kg");
        return false;
    }
   
    $.ajax({
        url: 'http://localhost:43210/almacen',
        method: 'POST',
        dataType: 'json',
        data: Producto
    }).then(
        function () {
            //$('#btnEnviarLog').off('click', newUser);
            listado();
            volver();
        },
        function (jqXHR, textStatus, errorThrown) {
            $('errorMsg').html(
                '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
        }
    );
}
function borrar(id) {
    if (!window.confirm("¿Estas seguro?")) return;
    console.log('http://localhost:43210/almacen/' + id);
    
    $.ajax({
        url: 'http://localhost:43210/almacen/' + id,
        method: 'DELETE',
        dataType: 'json',
       
    }).then(
        function (resp) {
            listado();
            volver();
        },
        function (jqXHR, textStatus, errorThrown) {
            $('errorMsg').html(
                '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
        }
    )
}

