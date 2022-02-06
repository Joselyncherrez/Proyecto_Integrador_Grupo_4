const server = "http://localhost:9000";


function loginUser() {
    userData = {
        user: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value
    }
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
            if (data.code == '500') {
                return alert("El usuario ingresado no está registrado / O la contraseña es incorrecta");
            }
            if (data.data.rol == "USER_ROLE") {
                window.location = "http://localhost:3000/vista_report"
            }
            if (data.data.rol == "ADMIN_ROLE") {
                window.location = "http://localhost:3000/administrador"
            }
        })
        .catch(error => console.error(error));
}

function registrar() {
    userData = {
        user: document.getElementById('inputEmail').value,
        password: document.getElementById('inputPassword').value
    }
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
            window.location = "http://localhost:3000/login"

        })
        .catch(error => console.error(error));

}