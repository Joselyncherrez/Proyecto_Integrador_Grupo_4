var x = 3;

function logearse() {
    if (document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'usuario1') {
        location.replace("/vista_report")

    } else {

        if (x == 0) {
            document.getElementById('times').innerHTML = "No hay más intentos , Recarge la pagina para volver a intentarlo";

        } else {
            document.getElementById('times').innerHTML = "Intentos Restantes: " + x;
            x = x - 1;
        }

    }
    if (document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'grupo4') {
        location.replace("/administrador")

    } else {

        if (x == 0) {
            document.getElementById('times').innerHTML = "No hay más intentos , Recarge la pagina para volver a intentarlo";

        } else {
            document.getElementById('times').innerHTML = "Intentos Restantes: " + x;
            x = x - 1;
        }

    }
}