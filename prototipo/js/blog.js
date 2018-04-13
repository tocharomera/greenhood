function listar() {
    $.get('http://localhost:43210/blog', function (envios) {
        var rslt = $('<div class="row"/>');
        $('#listado').empty().append(rslt);
        for (var i = 0; i < envios.length; ++i) {
            var col = $('<div class="col-xs-12 col-sm-4"/>');
            var thumbnail = $('<div class="thumbnail"/>');
            thumbnail.append($('<img src="' + envios[i].foto + '" width="60%" alt="foto de patatas" />'));
            thumbnail.append($('<div  class="caption"><h3>' + envios[i].titulo + '</h3><p>' + envios[i].resumen + '...</p><p><button class="btn btn-link" onclick="ver(' + envios[i].id + ');"> LEER MÁS </button></p>'));
            col.append(thumbnail);
            rslt.append(col);
        }
    }, 'json');
}
function ver(id) {
    $.get('http://localhost:43210/blog/' + id, function (envios) {

        var rslt = $('<h3>' + envios.titulo + '</h3>');
        $('#listado').empty().append(rslt);
        $('#listado').append($('<img class="center-block" src="' + envios.foto + '" width="40%" itemprop="image">'));
        $('#listado').append($('<p class=""> ' + envios.texto + '</p>'));


        $('#listado').append($('<input type="button" value="Volver" onclick="atras()">'));
        $('#listado').append($('<input type="button" value="Editar" onclick="editar(' + id + ')">'));
    }, 'json');
}

function volverBlog() {
    $('#btnEnviarBlog').off('click', enviarNuevoBlog);
    $('#btnEnviarBlog').off('click', enviarModificacionesBlog);
    $('#modalBlog').modal('hide'); 
    
}
function atras() {
    listar();
}

function editar(id) {
    $.ajax({
        url: 'http://localhost:43210/blog/' + id,
        dataType: 'json',
    }).then(
        function (item) {
            $('#titulo').val(item.titulo);
            $('#foto').val(item.foto);
            $('#resumen').val(item.resumen);
            $('#texto').val(item.texto);
            $('#id').val(item.id);

            $('#btnEnviarBlog').on('click', enviarModificacionesBlog);
            $('#modalBlog').modal('show');
        }
    )
}

function valido(item) {
    if (item.titulo == "" || item.titulo.length == 0) {
        alert("Escribe un titulo para el articulo");
        return false;
    }
    if (item.reusmen == "" || item.resumen.length == 0) {
        alert("Escribe un breve resumen sobre el tema");
        return false;
    }
    if (item.texto == "" || item.texto.length == 0) {
        alert("Escribe el arituclo completo");
        return false;
    }
    if (item.foto == "" || item.foto == 0) {
        alert("Solo necesitas la url de la imagen");
        return false;
    }
    return true;
}



function añadirBlog() {
    $('#modalBlog').modal('show');
    $('#titulo').val("");
    $('#foto').val("");
    $('#resumen').val("");
    $('#texto').val("");
    $('#id').val(0);
    $('#btnEnviarBlog').on('click', enviarNuevoBlog);
}

function enviarNuevoBlog() {
    var datos = $('#frmBlog').serializeArray();
    var blog = {};
    datos.forEach(function (item) {

        blog[item.name] = item.value;
    });
    if (valido(blog))
    $.ajax({
        url: 'http://localhost:43210/blog',
        method: 'POST',
        dataType: 'json',
        data: blog
    }).then(
        function () {
            listar();
            volverBlog();
        },
        function (jqXHR, textStatus, errorThrown) {
            $('errorMsg').html(
                '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
        }
    );

}
function enviarModificacionesBlog() {
    var datos = $('#frmBlog').serializeArray();
    var blog = {};
    datos.forEach(function (item) {
        blog[item.name] = item.value;
    });
    if (valido(blog))
    $.ajax({
        url: 'http://localhost:43210/blog',
        method: 'PUT',
        dataType: 'json',
        data: blog
    }).then(
        function () {
            volverBlog();
            ver(blog.id);
        },
        function (jqXHR, textStatus, errorThrown) {
            $('errorMsg').html(
                '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
        }
    );

}
$(document).ready(function () {
    listar();
    $('#btnVolverBlog').click(atras);


});
