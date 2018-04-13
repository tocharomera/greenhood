function LineaPedido(idProducto, productor, nombreProducto, precio, cantidad, categoria, fecha) {
    this.id = 0;
    this.productor = productor;
    this.idProducto = idProducto;
    this.producto = nombreProducto;
    this.cantidad = cantidad;
    this.precio = precio;
    this.categoria = categoria;
    this.fecha = fecha;

}

var carrito = new (function () {
    var obj = this;
    obj.lineas = [];
    if (localStorage && localStorage['CarritoCompra'])
        obj.lineas = JSON.parse(localStorage['CarritoCompra']);

    function guardaCarrito() {
        if (localStorage)
            localStorage['CarritoCompra'] = JSON.stringify(obj.lineas);
    }
    /**
     * 
     */
    obj.add = function (idProducto, productor, nombreProducto, precio, cantidad, categoria, fecha) {
        var ln = new LineaPedido(idProducto, productor, nombreProducto, precio, cantidad, categoria, fecha); //Carga primera linea
        if (obj.lineas.length == 0) {
            ln.id = 1;
        } else {
            var old = obj.lineas.find(function (item) { return item.idProducto == idProducto; }); //Añade nueva cantidad 
            if (old) {
                old.cantidad += 1;
                old.precio = precio;
                old.precioTotal = (old.cantidad * old.precio).toFixed(2);
                guardaCarrito();
                return;
            }
            ln.id = obj.lineas[obj.lineas.length - 1].id + 1;
        }
        obj.lineas.push(ln);
        guardaCarrito();
    };
    obj.remove = function (id) {
        var ind = obj.lineas.findIndex(function (item) { return item.id == id; });
        if (ind !== -1) {
            obj.lineas.splice(ind, 1);
            guardaCarrito();
        } else
            console.warn('Elemento no encontrado');
    };
    obj.vaciar = function () {
        obj.lineas = [];
        if (localStorage)
            localStorage.removeItem('CarritoCompra');
    };
})();






function CarritoManager() {
    var obj = this;
    var listaProductos;

    function PintaProductos(lst) {
        var total;
        var tmpl = $('#tmplListadoProducto').html();

        console.log(lst);

        var rslt = Mustache.render(tmpl, { filas: lst });
        $('#filtroResult').html(rslt);
    }
    var cachePlantillaCarrito = null;

    function PintaCarrito() {
        var tmpl = cachePlantillaCarrito;
        console.log(carrito.lineas);
        var total = 0;
        carrito.lineas.forEach(function (item) {
            console.log(item.precio + ' ' + item.cantidad);
            total += (item.cantidad * item.precio);


        });
        // for (var index = 0; index < carrito.lineas.length; index++) {
        //     console.log(carrito.lineas[index]);
        //     var efuera = carrito.lineas[index].precio;
        //     var precio = efuera[index];
        //     total += precio;
        //     console.log(total);
        // }


        var rslt = Mustache.render(tmpl, { filas: carrito.lineas, total: total.toFixed(2) });
        $('#listadoCarrito').html(rslt);
    }

    obj.Refresca = function () {
        if (cachePlantillaCarrito)
            PintaCarrito();
        else
            $.get('carrito.template.html', function (plantilla) {
                cachePlantillaCarrito = plantilla;
                PintaCarrito();
            });
    };
    obj.ListarProductos = function () {
        if (listaProductos)
            PintaProductos(listaProductos);
        else
            $.ajax({
                url: 'http://localhost:43210/almacen',
                dataType: 'json',
            }).then(
                function (resp) {
                    listaProductos = resp;
                    PintaProductos(listaProductos);
                },
                function (jqXHR, textStatus, errorThrown) {
                    // reject(jqXHR, textStatus, errorThrown);
                }
            );
    };
    obj.addProducto = function (idProducto, productor, nombreProducto, precio, cantidad, categoria, fecha) {
        var cntr = $(cantidad);
        var cant = cntr.val();
        if (cntr[0].validationMessage) {
            alert("Error en la cantidad: " + cntr[0].validationMessage);
            return;
        }
        carrito.add(idProducto, productor, nombreProducto, precio, +cant, categoria, fecha);
        obj.Refresca();
        $.ajax({
            url: 'http://localhost:43210/almacen/' + idProducto,
            method: 'GET',
            dataType: 'json',
        }).then(
            function (Producto) {
                Producto.Cantidad -= cant;
                $.ajax({
                    url: 'http://localhost:43210/almacen',
                    method: 'PUT',
                    dataType: 'json',
                    data: Producto
                }).then(
                    function () {
                        listado();
                    },
                    function (jqXHR, textStatus, errorThrown) {
                        $('errorMsg').html(
                            '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
                    }
                );
            },
            function (jqXHR, textStatus, errorThrown) {
                $('errorMsg').html(
                    '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
            }
        );
    };

    obj.drag = function (ev, id) {
        ev.dataTransfer.setData("id_producto", id);
    };

    obj.allowDrop = function (ev) {
        ev.preventDefault();
    };

    obj.drop = function (ev) {
        ev.preventDefault();
        var id = ev.dataTransfer.getData("id_producto");
        var prod = listaProductos.find(function (item) { return item.id == id; });
        if (prod) {
            var precioTotal = prod.coste * prod.id;
            carrito.add(prod.id, prod.nombre, prod.Producto, prod.Fecha, prod.coste, precioTotal);
            mng.Refresca();
        }
    };

    obj.Filtra = function (texto) {
        if (!listaProductos) return;
        if (!texto || texto == "") {
            PintaProductos(listaProductos);
            return;
        }
        var rslt = listaProductos.filter(function (item) {


            return item.Producto.toUpperCase().startsWith(texto.toUpperCase());
        });
        PintaProductos(rslt);
    };
}