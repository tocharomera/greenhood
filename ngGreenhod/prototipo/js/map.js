$(document).ready(function() {
  var map;
  var ajaxRequest;
  var plotlist;
  var plotlayers = [];
  // set up the map
  map = new L.Map('mapa');
  var geocoder = new L.Control.Geocoder.nominatim();

  // create the tile layer with correct attribution
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib =
    'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {
    minZoom: 8,
    maxZoom: 20,
    attribution: osmAttrib
  });

  // start the map in South-East England
  map.setView(new L.LatLng(40.427, -3.109), 5);
  map.addLayer(osm);
  map.on('locationfound', onLocationFound);
  function onLocationError(e) {}
  map.on('locationerror', onLocationError);

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    //.bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circleMarker(e.latlng, radius)
      .bindPopup('Estas aquí!')
      .addTo(map);
  }

  if (Modernizr.geolocation) {
    map.locate({ setView: true, maxZoom: 6 });
  } else {
  }
  function GetLatlong() {
    $.get('http://localhost:43210/usuariosGreen').then(function(response) {
      var usuarios = JSON.parse(response);

      usuarios.forEach(usuario => {
        var address =
          'Calle ' +
          usuario.calle +
          ' ' +
          usuario.numero +
          ',' +
          usuario.ciudad +
          ' ' +
          usuario.cp;
        (', España');
        var latlng;
        geocoder.geocode(address, results => {
          // console.log(results[0]);
          var latlng = new L.LatLng(
            results[0].center.lat,
            results[0].center.lng
          );
          markertomap(latlng, usuario);
        });

        // markertomap(latitude, longitude, usuario);
      });
    });
  }
  GetLatlong();
  function markertomap(latlng, usuario) {
    if (usuario.productor) {
      var productos = $.get(
        'http://localhost:43210/almacen?_search=' +
          JSON.stringify(usuario.nombre).toLowerCase()
        //   ,
        // function(response) {
        //   var productosusuario = JSON.parse(response);
        //   var prods = productosusuario.reduce((obj, item) => {
        //     obj[item.Producto] = item;
        //     return obj;
        //   }, {});
        //   return prods;
        // }
      );

      var sombrero = L.icon({
        iconUrl: '../img/Straw_Hat.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [45, 45], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      var marker = new L.marker(latlng, {
        icon: sombrero,
        draggable: false, // Make the icon dragable
        title: usuario.nombre, // Add a title
        opacity: 1
      }).bindPopup(
        'Productor: ' +
          '<a href="http://localhost:3000/prototipo/html/PerproductorPubl.html">' +
          usuario.nombre +
          '</a><br>Productos:<ul id="markertemplate">' +
          '</ul>'
      );
      var template =
        '{{#productos}}' +
        '<li> {{Producto}} </li>' +
        '{{/productos}}';
      map.addLayer(marker);
      marker.on('popupopen', () => {
        productos.then(productos => {
          var arr = JSON.parse(productos);
          var html = Mustache.to_html(template, { productos: arr });
          $('#markertemplate').html(html);
        });
      });
      // $('#markertemplate').html(template);

      // });
    }
  }
});
