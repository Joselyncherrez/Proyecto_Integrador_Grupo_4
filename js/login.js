var x = 3;

function logearse() {
    if (document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'grupo4') {
        location.replace("index.html")

    } else {

        if (x == 0) {
            document.getElementById('times').innerHTML = "No hay mas intentos , Recarge la pagina para volver a intentarlo";

        } else {
            document.getElementById('times').innerHTML = "Numero de Intento " + x;
            x = x - 1;
        }

    }
}