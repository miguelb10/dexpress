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
    var txtAsunto = document.getElementById('asunto').value;
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

    if (txtAsunto == null || txtAsunto.length == 0 || /^\s+$/.test(txtAsunto)) {
        alert('ERROR: El campo asunto no debe estar vacío');
        document.getElementById("asunto").select();
        return false;
    }

    if (txtMensaje == null || txtMensaje.length == 0 || /^\s+$/.test(txtMensaje) || txtMensaje.length > 500) {
        alert('ERROR: El campo mensaje no debe estar vacío o contener mas de 500 caracteres');
        document.getElementById("mensaje").select();
        return false;
    }

    return true;
}