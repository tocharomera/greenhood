function objManager ( ) {
    var obj = this;

    // id, nombre, apellidos, email, pass, pais, ciudad, calle, numero, letra, piso, cp, urlBase
    // var Id = id;
    // var nombreU = nombre;
    // var apellidosU = apellidos;
    // var emailU = email;
    // var passU = pass;
    // var paisU = pais;
    // var ciudadU = ciudad;
    // var calleU = calle;
    // var numeroU = numero;
    // var letraU = letra;
    // var pisoU = piso;
    // var cpU = cp;

    obj.get = function (email){
        return $.ajax({
           url: urlBase + '?email=' +email,
           dataType: 'json', 
        });
    };

    obj.añadir = function(datos) {
        return $.ajax({
            url: urlBase,
            method: 'POST',
            dataType: 'json',
            data: datos
        });
    };


    obj.editar = function(datos) {
        return $.ajax({
            url: urlBase,
            method: 'PUT',
            dataType: 'json',
            data: datos
        });
    };

    obj.borrar = function(email) {
        return $.ajax({
            url: urlBase + '?email=' + email,
            method: 'DELETE',
        });
    };


    obj.enviarModif = function (datos) {
        return $.ajax({
            url: urlBase,
            method: 'PUT',
            dataType: 'json',
            data: datos
        });
    };

    obj.volver = function (formID) {
        $(formID).hide();
    };
}