const goToRegister = () => {

    window.location.href = "/register.html";
}

const login = () => { 
    
    let username = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    console.log(username, password)

    let body = {
        username: username,
        password: password
    }

    fetch('http://localhost:3000/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(header => {
            // if (json.status == 200){
            //     return json.json();
            // } else {
            //     alert('Login failed');
            // }

            //console.log(json=)
            if(!header.ok) {
                throw Error(header)
            }

            let token = header.headers.get('x-auth');
            localStorage.setItem('x-auth', token);
            console.log(token);

            return header.json();

        })
        .then(response => {
            
            console.log(response) 
            alert('Login success'); 
            window.location.href = '/index.html'
            
        })
        .catch(e => {
            console.log(e)
            alert('Login failed')
        })
}