var checkBox = document.getElementById('.checkbox');
var queryString = decodeURIComponent(window.location.search);
if (queryString) {
  queryString = queryString.slice(1);
  pair = queryString.split('=');
  var busca = JSON.parse(pair[1]);
  if (queryString) {
    search(busca.busqueda).then(busq => {
      $('#result')
        .empty()
        .append(busq);
    });
  }
}
function search(producto) {
  return $.get('http://localhost:43210/almacen?_search=' + producto).then(
    function(response) {
      var productos = JSON.parse(response);
      var rslt = $(
        '<table class="table table-striped table-hover">' +
          '<tr class="info"><th>Producto</th><br><th>Cantidad/kg</th>' +
          '<th>Categoria</th><th>Fecha</th><th>Precio €/kg</th></tr></table>'
      );
      for (var i = 0; i < productos.length; ++i) {
        var tr = $('<tr/>');
        tr.append(
          '<td><a href="http://localhost:3000/prototipo/html/PerproductorPubl.html">' +
            productos[i].Producto +
            '</a></td>'
        );
        tr.append('<td>' + productos[i].Cantidad + '</td>');
        tr.append('<td>' + productos[i].Categoria + '</td>');
        tr.append('<td>' + productos[i].Fecha + '</td>');
        tr.append('<td>' + productos[i].Precio + '</td>');
        var td = $('<td/>');
        tr.append(td);
        rslt.append(tr);
      }
      return rslt;
    }
  );
}
var moreon;
function more() {
  moreon = moreon ? false : true;
  var moreform = $(
    ' <div class="form-group ">' +
      '<div class="checkbox checkbox-primary col-lg-6 col-md-6 col-sm-6">' +
      '<input type="checkbox" onclick="categoria(' +
      'conservas' +
      ', this)" class="styled" id="conservas" value="conservas" name="conservas">' +
      '<label for="conservas">' +
      'Conservas' +
      '</label>' +
      '</div>' +
      '<div class="checkbox checkbox-primary col-lg-6 col-md-6 col-sm-6">' +
      '<input type="checkbox" onclick="categoria(' +
      'cereales' +
      ', this)" class="styled" id="cereales" value="cereales" name="cereales">' +
      '<label for="cereales">' +
      'Cereales' +
      '</label>' +
      '</div>' +
      '</div>'
  );
  if (moreon) {
    $('#more').append(moreform);
  } else {
    $('#more')
      .children(moreform)
      .remove();
  }
}
function categoria(categoria, element) {
  if (element.checked == true && $('input:checked').length < 1) {
  search(categoria).then(result => {
    $('#result')
      .empty()
      .append(result);
  });
}
   else if ($('input:checked').length > 1) {
        search('').then(result => {
          $('#result').empty().append(result);
        });
    
  } else {
    $('#result').empty();
    if ($('input:checked').length != 0) {
      search($('input:checked').val()).then(result => {
        $('#result').append(result);
      });
    }
 }
}
$('#filtro_home').on('submit', function(e) {
  e.preventDefault();
  var datos = $('#filtro_home').serializeArray();
  var filtersearch = new search();
  datos.forEach(function(item) {
    filtersearch[item.name] = item.value;
  });
  search(filtersearch.name).then(result => {
    $('#result')
      .empty()
      .append(result);
  });
});
