// import { response } from "express";
// import { json } from "body-parser";


const registerUser = () => {
    //console.log('test');
    let email = document.getElementById('registerEmail').value
    let password = document.getElementById('registerPassword').value
    let rPassword = document.getElementById('registerRPassword').value
    console.log(email, password, rPassword);

    if (password === rPassword) {
        let body = {
            username: email,
            password: password
        }


        fetch('http://localhost:3000/api/v1/user/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(json => {
            if (json.status == 200){
                return json.json();
            } else {
                alert('Registracion failed');
            }

        })
        .then(response => {
            if (response) {
                alert('Registracion success');
                window.location.href = "/login.html";
            }
            
        })
        .catch(e => {
            console.log(e)
        })
    }
}

console.log('dsfsdf')