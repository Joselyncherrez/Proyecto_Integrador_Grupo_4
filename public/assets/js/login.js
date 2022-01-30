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

function registrar(userData = {}) {

    const options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`${server}/api/registrar`, options)
        .then(response => response.json())
        .then(data => {
            alert('Usuario Registrado')

        })
        .catch(error => console.error(error));

}