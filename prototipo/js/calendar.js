$(function() {
    var eventData = [];
    $.get("http://localhost:43210/almacen").then(function(res){
        response = JSON.parse(res);
        response.forEach(function(producto, i){
            eventData.push({
           date : producto.Fecha,
           badge : true,
           title : producto.Producto
        });
       });
       eventDataReady();
    });
    function eventDataReady() {
    $("#calendar").zabuto_calendar({
        action: function () {
            return myDateFunction(this.id, false);
        },
        action_nav: function () {
            return myNavFunction(this.id);
        },
        data: eventData,
        language: "es",
        cell_border: false,
        today: true,
        show_days: false,
        weekstartson: 0,
        nav_icon: {
            prev: '<i class="fa fa-chevron-circle-left text-success"></i>',
            next: '<i class="fa fa-chevron-circle-right text-success"></i>'
        }
    });

}
function myDateFunction(id, fromModal) {
    $("#date-popover").hide();
    
    var date = $("#" + id).data("date");
    var hasEvent = $("#" + id).data("hasEvent");
   
    $.get('http://localhost:43210/almacen?_search=' + date).then(
    function(response) {
      var productos = JSON.parse(response);
    
      var rslt = $(
          
        '<table class="table table-hover">' +
          '<tr class=""><th>Producto</th><br><th>Cantidad/kg</th>' +
          '<th>Fecha</th><th>Precio €/kg</th></tr></table>'
      );
      
      $("#date-popover-content")
        .empty()
        .append(rslt);
      for (var i = 0; i < productos.length; ++i) {
        var tr = $('<tr/>');
        tr.append('<td>' + productos[i].Producto + '</td>');
        tr.append('<td>' + productos[i].Cantidad + '</td>');
        tr.append('<td>' + productos[i].Fecha + '</td>');
        tr.append('<td>' + productos[i].Precio + '</td>');
        var td = $('<td/>');
        tr.append(td);
        rslt.append(tr);
      }
    }
  );
    
    $("#date-popover").show();
    return true;
}

function myNavFunction(id) {
    $("#date-popover").hide();
    var nav = $("#" + id).data("navigation");
    var to = $("#" + id).data("to");
    console.log('nav ' + nav + ' to: \ + to.month + ' / ' + to.year');
}

});