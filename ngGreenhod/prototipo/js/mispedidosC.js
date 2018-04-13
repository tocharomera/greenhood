$(document).ready(function(){
pedidosC();
});
function pedidosC(){
    $.get("http://localhost:43210/mispedidos",function(pedidos){
        var rslt = $('<table class=" table table-striped table-hover"><tr class="info"><th>Producto</th><th>Productor</th><th>Fecha</th><th>Precio</th><th>Estado</th></tr></table');
        $('#tablaPedidosC').empty().append(rslt);
        for(var i=0; i< pedidos.lenght; ++i){
            var tr = $('<tr/>');
            if(pedidos[i].pedidos && pedidos[i].pedidos.lenght>20)
            tr.addClass('danger');
        tr.append($('<'))    
        }
    }
}