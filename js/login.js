var x = 3;

function logearse() {
    if (document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'grupo4') {
        location.replace("vista_report.html")

    } else {

        if (x == 0) {
            document.getElementById('times').innerHTML = "No hay más intentos , Recarge la pagina para volver a intentarlo";

        } else {
            document.getElementById('times').innerHTML = "Intentos Restantes: " + x;
            x = x - 1;
        }

    }
}