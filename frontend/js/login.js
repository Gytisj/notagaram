const goToRegister = () => {
    window.location.href = "/register.html";

}

const login = () => {

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    //console.log(username, password)

    let body = {
        username: username,
        password: password
    }

    fetch('http://localhost:2000/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(header => {

            if (!header.ok) {
                throw Error(header)
            }

            const token = header.headers.get('x-auth');
            localStorage.setItem('x-auth', token);
            //console.log(token);

            return header.json();
        })
        .then(response => {
            //console.log(response)
            alert('LOGIN: success');
            window.location.href = '/index.html'

        })
        .catch(e => {
            console.log(e)
            alert('LOGIN: failed')
        })
}