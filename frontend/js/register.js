const registerUser = () => {
    
    const username = document.getElementById('registerUsername').value;
    const fullName = document.getElementById('registerFullName').value;
    const password = document.getElementById('registerPassword').value;
    const rPassword = document.getElementById('registerRPassword').value;

    //console.log(email, password, rPassword);

    if (password === rPassword) {
        let body = {
            username: username,
            fullName: fullName,
            password: password
        }

        fetch('http://localhost:2000/api/v1/user/register', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(json => {
                if (json.status == 200) {
                    return json.json();
                } else {
                    alert('REGISTRATION: failed');
                }

            })
            .then(response => {
                if (response) {
                    alert('REGISTRATION: success');
                    window.location.href = "/login.html";
                }

            })
            .catch(e => {
                console.log(e)
            })

    } else {
        alert('REGISTRATION: Password does not match')
    }
}