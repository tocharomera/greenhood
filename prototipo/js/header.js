var UsuarioManager = new (function () {
    var obj = this;



    var srv = new DAO('http://localhost:43210/usuariosGreen/');

    obj.signin = function () {
        $('#modalPlace').html(Mustache.render(
            $('#signTemplate').html()
        ));
        $('#modalSignin').on('hidden.bs.modal', function (e) {
            $('#modalPlace').empty();
          }).modal('show');
         
        // $('#modalSignin').modal('show');
        // $('#btnEnviarSign').on('click', buscaUser);
    };

    //BUSCAMOS UN USUARIO CON METODO AJAX
    obj.buscaUser = function (mail) {


        // obj.validar('email');
        // obj.validar('pass');

        srv.get(mail).then(function (usuario) {
            if (usuario.length == 1) {
                $('#userName').text(usuario[0].nombre);
                obj.guardarLocal();
                obj.volver();
                $('#menuLogin').show();
                $('#liLog').hide();
                $('#signin').hide();
                $('#liLogout').css('display', 'inline-block');
            } else {
                alert('Ese usuario no existe');
            }
        }
        );
    };


    obj.login = function () {
        $('#modalPlace').html(Mustache.render(
            $('#logTemplate').html()
        ));
        $('#modalLogin').on('hidden.bs.modal', function (e) {
            $('#modalPlace').empty();
          }).modal('show');

        // $('#modalLogin').modal('show');
        // $('#btnEnviarLog').off('click', obj.newUser);
    };


    obj.logout = function () {
        alert('Hasta tu próxima compra');
        localStorage.removeItem("email");
        localStorage.setItem("logged", false);
        $('#menuLogin').hide();
        $('#signin').show();
        $('#liLog').show();
        $('#liLogout').css('display', 'none');
    };

    obj.newUser = function () {    

        var datos = $('#formLogin').serializeArray();
        var user = {};

        

        datos.forEach(function (item) {
            // if (!obj.validar(item.name)) {
            //     var valido = false;
            //     return;
            // }
            user[item.name] = item.value;
        
            // if (!valido){
            //     return;
            // }
        });

        

        user.productor = !(user.productor == undefined);
        user.comprador = !(user.comprador == undefined);

        srv.add(datos).then(
            function () {
                $('#liLogout').css('display', 'inline-block');
                localStorage.setItem("email", user.email);
                localStorage.setItem("logged", true);
                $('#menuLogin').show();
                $('#userName').text(user.nombre);
                $('#liLog').hide();
                $('#signin').hide();
                obj.volver();
            },
            function (jqXHR, textStatus, errorThrown) {
                $('errorMsg').html(
                    '<p class="error">ERROR: ' + jqXHR.status + ': ' + jqXHR.statusText + '</p>');
            }
        );

    };


    obj.volver = function () {
        // le quita la duncion la boton .off
        //si le dejamos, el .on se acumula...
        // $('#btnEnviarLog').off('click', newUser);
        $('#modalLogin').modal('hide');
        $('#modalSignin').modal('hide');
    };



    obj.guardarLocal = function () {
        if (typeof (Storage) !== "undefined") {
            // supported
            var mail = $('input[name="email"]').val();
            srv.get(mail).then(function (usuario) {
                localStorage.setItem("email", usuario[0].email);
                localStorage.setItem("logged", true);
            });
        }
    };



    obj.validar = function (name) {
        var control = $('[name="' + name + '"');
        var valido = true;

        control.each(function (i, item) {
            item.setCustomValidity('');
         
            switch (item.dataset.validacion) {
                
                // VAMOS HACIENDO UN CASE POR CADA TIPO DE VALIDACION QUE TENEMOS
                case 'email':
                    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                    if (!emailRegex.test(control.val()))
                        item.setCustomValidity('No es un email válido');
                    else
                        item.setCustomValidity('');
                    break;

                case 'pass':
                    if (!control.val() || control.val().length <= 6)
                        item.setCustomValidity('No es una password válida');
                    else
                        item.setCustomValidity('');
                    break;

                case 'txt_r':
                    if (!control.val() || control.val().length < 1)
                        item.setCustomValidity('El texto introducido no es válido');
                    else
                        item.setCustomValidity('');
                    break;
                
                case 'pass2':
                    var Pass = document.getElementById("passN").value ;
                    console.log(Pass);
                    if ( !control.val() || control.val() != Pass)
                        item.setCustomValidity('Las contraseñas deben ser iguales');
                    else
                        item.setCustomValidity('');
                    break;


            }

            if (item.validationMessage) {
                if ($('#err_' + name).length) {
                    $('#err_' + name).text(item.validationMessage);
                } else {
                    control.after('<div id="err_' + name + '" class="text-danger">' + item.validationMessage + '</div>');
                    control.parent().parent().addClass('has-error');
                }
                var valido = false;

            } else {
                control.parent().parent().removeClass('has-error');
                $('#err_' + name).remove();
            }



        });

        return valido;

    };

})();



//BUSCAMOS UN USUARIO CON MÉTODO GET

// function buscaUser() {
//     $.get('http://localhost:43210/usuariosGreen?email=' + $('input[name="email"]').val(), function (usuarios) {
//         usuarios = JSON.parse(usuarios);
//         if (usuarios.length == 1) {
//             alert("EMAIL ENCONTRADO: " + usuarios[0].nombre);

//         } else {
//             alert("EL USUARIO NO ESTÁ EN LA BBDD");
//         }
//     });
// }



$(document).ready(function () {
    $('#menuLogin').hide();
    var email = localStorage.getItem('email');
    if (email) {
        UsuarioManager.buscaUser(email);
    }
});

