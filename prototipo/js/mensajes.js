$(document).ready(function(){
    listado();
    });

    
    function listado() {
        $.get('http://localhost:43210/almacen', function (productos) {
            var rslt = $('<table class="table table-striped table-hover"><tr class="info"><th>Producto</th><br><th>Cantidad/kg</th><th>Fecha</th><th>Precio €/kg</th><th><input type="button" class= "btn btn-primary" value="Añadir Producto" onclick="añadir()"></th></tr></table>');
            $('#tablaAlmacen').empty().append(rslt);
            for (var i = 0; i < productos.length; ++i) {
                var tr = $('<tr/>');
                if (productos[i].Producto && productos[i].Producto.length > 20)
                    tr.addClass('danger');
                tr.append($('<td><input type="button" class="btn btn-link" value="' + productos[i].Producto + '" onclick="ver(' + productos[i].id + ');"></td>'));
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