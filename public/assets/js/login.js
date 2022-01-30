var x = 3;
const server = "http://localhost:9000";
const api = require('./api');

function loginUser(userData = {}) {

    const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/login`, options)
        .then(response => response.json())
        .then(data => {
            if (data.data.rol == "USER_ROLE") {
                window.location = "http://localhost:3000/vista_report"
            }
            if (data.data.rol == "ADMIN_ROLE") {
                window.location = "http://localhost:3000/administrador"
            }

        })
        .catch(error => console.error(error));

}

function logearse() {
    const data = {
        user: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value
    }
    loginUser(data);
    /*
    if (document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'usuario1') {
        location.replace("/vista_report")

    } else {

        if (x == 0) {
            document.getElementById('times').innerHTML = "No hay más intentos , Recarge la pagina para volver a intentarlo";

        } else {
            //document.getElementById('times').innerHTML = "Intentos Restantes: " + x;
            x = x - 1;
        }

    }
    if (document.getElementById('inputPassword').value == 'ciclo59' && document.getElementById('inputEmail').value == 'grupo4') {
        location.replace("/administrador")

    } else {

        if (x == 0) {
            document.getElementById('times').innerHTML = "No hay más intentos , Recarge la pagina para volver a intentarlo";

        } else {
            //document.getElementById('times').innerHTML = "Intentos Restantes: " + x;
            x = x - 1;
        }

    }*/
}