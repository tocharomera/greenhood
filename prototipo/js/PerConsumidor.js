var mailProductor = localStorage.getItem('email');

function buscaUserConsu() {
   
 
    var srv = new DAO('http://localhost:43210/usuariosGreen/');

    srv.get(mailProductor).then(function (consumidores) {
        if (consumidores.length == 1) {
            $('#fichaConsumidor').html(Mustache.render(
                $('#consTemplate').html(),consumidores[0]
            ));         
        }
            
        
    }

    );
}
function editarConsumidor() {
    $('#modalEditarConsu').modal('show');
    if(consumidores.nombre=="" ||  Consumidores.nombre.length==0){
        alert("el nombre no puede estar vacio");
        return false;
    }
    if(consumidores.pais=="" ||  consumidores.pais.length==0){
        alert("el pais no puede estar vacio");
        return false;
    }
    if(consumidores.ciudad== ""|| consumidores.ciudad.length==0){
        alert("debes rellenar tu ciudad para poder situarte");
        return false;
    }
    if(consumidores.cp== ""|| consumidores.cp==0){
        alert("debes poner tu cp para poder situarte");
        return false;
    }
   
    $.ajax({
        url: 'http://localhost:43210/usuariosGreen?email=' + mailProductor,
        method: 'GET',
        dataType: 'json'
    }).then(function (consumidores) {
        if (consumidores.length == 1) {
            $('#ConsuNombreE').val(consumidores[0].nombre);
            $('#ConsuApellidosE').val(consumidores[0].apellidos);
            $('#ConsuEmailE').val(consumidores[0].email);
            $('#ConsuPaisE').val(consumidores[0].pais);
            $('#ConsuCiudadE').val(consumidores[0].ciudad);
            $('#ConsuDireccionE').val(consumidores[0].calle);
            $('#ConsuNumeroE').val(consumidores[0].numero);
            $('#ConsuPisoE').val(consumidores[0].piso);
            $('#ConsuLetraE').val(consumidores[0].letra);
            $('#ConsuCPE').val(consumidores[0].cp);

            
        } 
    }

    );
}
function añadir() {
    $('#modalConsumidor').modal('show');
}


$(document).ready(function () {
    buscaUserConsu();
});