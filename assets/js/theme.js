$(document).ready(function() {
    $('a.thumb').click(function(event) {
        event.preventDefault();
        var content = $('.modal-body');
        content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);
        content.html($(this).html());
        $(".modal-profile").modal({ show: true });
    });

    $('#formCorreo').on('submit', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            $.ajax({
                url: 'api/correo/correo.php',
                type: "POST",
                data: $(this).serialize(),
                async: true,
                success: function(response) {
                    var response = JSON.parse(response);
                    if (response.success == 1) {
                        $(document).ready(function() {
                            $("#ModalConf").modal("show");
                            document.getElementById("formCorreo").reset();
                        });
                    } else {
                        $(document).ready(function() {
                            $("#ModalErr").modal("show");
                        });
                    }
                }
            });
        }
    });
});

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function validarFormulario() {

    var txtNombre = document.getElementById('nombre').value;
    var txtCorreo = document.getElementById('correo').value;
    var numCelular = document.getElementById('celular').value;
    var numRuc = document.getElementById('ruc').value;
    var txtAsunto = document.getElementById('asunto').value;
    var txtEmpresa = document.getElementById('empresa').value;
    var txtMensaje = document.getElementById('mensaje').value;

    if (txtNombre == null || txtNombre.length == 0 || /^\s+$/.test(txtNombre)) {
        alert('ERROR: El campo nombre no debe estar vacío');
        document.getElementById("nombre").select();
        return false;
    }

    if (!(/\S+@\S+\.\S+/.test(txtCorreo))) {
        alert('ERROR: Debe escribir un correo válido');
        document.getElementById("correo").select();
        return false;
    }

    if (numCelular == null || numCelular.length == 0 || isNaN(numCelular) || numCelular.length < 9) {
        alert('ERROR: El campo celular debe contener 9 dígitos');
        document.getElementById("celular").select();
        return false;
    }

    if (numRuc == null || numRuc.length == 0 || isNaN(numRuc) || numRuc.length < 11 || numRuc.length > 11) {
        alert('ERROR: El campo RUC debe contener 11 dígitos');
        document.getElementById("ruc").select();
        return false;
    }

    if (txtAsunto == null || txtAsunto.length == 0 || /^\s+$/.test(txtAsunto)) {
        alert('ERROR: El campo asunto no debe estar vacío');
        document.getElementById("asunto").select();
        return false;
    }

    if (txtEmpresa == null || txtEmpresa.length == 0 || /^\s+$/.test(txtEmpresa)) {
        alert('ERROR: El campo empresa no debe estar vacío');
        document.getElementById("empresa").select();
        return false;
    }

    if (txtMensaje == null || txtMensaje.length == 0 || /^\s+$/.test(txtMensaje) || txtMensaje.length > 500) {
        alert('ERROR: El campo mensaje no debe estar vacío o contener mas de 500 caracteres');
        document.getElementById("mensaje").select();
        return false;
    }

    return true;
}