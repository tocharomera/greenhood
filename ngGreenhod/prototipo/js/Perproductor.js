var mailProductor = localStorage.getItem('email');
if (!mailProductor){
    alert('Lo siento, tienes que iniciar sesión para ver esta página');
}

var srv = new DAO('http://localhost:43210/usuariosGreen/');

function buscaUserProd(mail) {
    srv.get(mail).then(function (usuarios) {
        if (usuarios.length == 1) {

            // llamamos al template que tenemos en el html
            $('#fichaProductor').html(Mustache.render(
                $('#prodTemplate').html(),usuarios[0]
            ));

            // $('#prodNombre').text(usuarios[0].nombre);
            // $('#prodApellidos').text(usuarios[0].apellidos);
            // $('#prodEmail').text(usuarios[0].email);
            // $('#prodPais').text(usuarios[0].pais);
            // $('#prodCiudad').text(usuarios[0].ciudad);
            // $('#prodDireccion').text(usuarios[0].calle);
            // $('#prodNumero').text(usuarios[0].numero);
            // $('#prodPiso').text(usuarios[0].piso);
            // $('#prodLetra').text(usuarios[0].letra);
            // $('#prodCP').text(usuarios[0].cp);


        }
    }

    );
}

function editarProductor() {
    
    $('#modalEditarProd').modal('show');
    srv.get(mailProductor).then(function (usuarios) {
        if (usuarios.length == 1) {
            $('#nombreE').val(usuarios[0].nombre);
            $('#prodApellidosE').val(usuarios[0].apellidos);
            $('#prodEmailE').val(usuarios[0].email);
            $('#prodPaisE').val(usuarios[0].pais);
            $('#prodCiudadE').val(usuarios[0].ciudad);
            $('#prodDireccionE').val(usuarios[0].calle);
            $('#prodNumeroE').val(usuarios[0].numero);
            $('#prodPisoE').val(usuarios[0].piso);
            $('#prodLetraE').val(usuarios[0].letra);
            $('#prodCPE').val(usuarios[0].cp);
            // $('#btnEnviarEditProd').off('click', enviarModificado);
            $('#btnEnviarEditProd').on('click', enviarProdModif);
        } else {
            alert("oh oh.... parece que te has equivocado.");
        }
    }
    
    );

}


function enviarProdModif() {
    var datos = $('#modalEditarProductor').serializeArray();
    var envio = {};
    datos.forEach(function (item) {
        envio[item.name] = item.value;
    });
    // if(usuarios.nombre=="" ||  usuarios.nombre.length==0){
    //      alert("el nombre no puede estar vacio");
    //      return false;
    //  }
    // if(usuarios.pais=="" ||  usuarios.pais.length==0){
    //     alert("el pais no puede estar vacio");
    //     return false;
    //  }
    //  if(usuarios.ciudad== ""|| usuarios.ciudad.length==0){
    //     alert("debes rellenar tu ciudad para poder situarte");
    //      return false;
    //  }
    //  if(usuarios.cp== ""|| usuarios.cp==0){
    //     alert("debes poner tu cp para poder situarte");
    //      return false;
    //  }
   
   
   
    srv.change(envio).then(
        function () {
            volverProd();
            buscaUserProd(mailProductor);
        },
        function (jqXHR, textStatus, errorThrown) {
            $('errorMsg').html(
                '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
        }
    );

}



function editaPass() {
    $('#modalEditarPass').modal('show');

}



function volverProd() {
        // le quita la duncion la boton .off
        //si le dejamos, el .on se acumula...
        $('#btnEnviarEditProd').off('click', enviarProdModif);
        $('#modalEditarProd').modal('hide');



}


$(document).ready(function () {
    buscaUserProd(mailProductor);
});
