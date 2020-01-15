const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');

    if (!token) {
        alert('baaam');
        window.location.href = "/login.html";

    } else {
        getItems();
    }
}

const createItem = () => {

    let token = localStorage.getItem('x-auth');
    let item = document.getElementById('newItem').value

    let body = {
        item: item
    }

    fetch('http://localhost:3000/api/v1/todo/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            //console.log(token);
            return header.json();
        })
        .then(response => {

            //console.log(response)
            alert('Item added');
            // window.location.href = '/index.html'
            getItems();
        })
        .catch(e => {
            console.log(e)
            alert('Item failed')
        })
}

const getItems = () => {
    console.log('GETING ITEMS later!!!');

    let token = localStorage.getItem('x-auth');

    fetch('http://localhost:3000/api/v1/user/getAllToDoItems', {
            method: 'GET',
            //body: JSON.stringify(body), 
            headers: {
                // 'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            return header.json();
        })
        .then(response => {

            const unordereList = document.getElementById('list');
            unordereList.textContent = null;

            response.forEach(element => {
                const listItem = document.createElement('li');
                const titleContainer = document.createElement('p');
                const checkInput = document.createElement('input');
                const deleteBtn = document.createElement('button');
                checkInput.type = 'checkbox';
                // console.log('asdfsad', checkInput);

                if (element.completed) {
                    checkInput.checked = true;
                } else {
                    checkInput.checked = false;
                }

                titleContainer.textContent = element.item;
                deleteBtn.textContent = 'DELETE';

                listItem.appendChild(titleContainer)
                listItem.appendChild(checkInput);
                listItem.appendChild(deleteBtn);
                unordereList.appendChild(listItem);

                checkInput.addEventListener('click', (event) => {

                    if (event.target.checked) {

                        console.log(element._id)
                        //element.completed = true;
                        console.log('chekced')
                        editItem(element._id)

                    } else {
                        //element.selected = false;
                        console.log(element._id)
                        console.log('unchecked')
                        editItem(element._id)
                    }

                })

                deleteBtn.addEventListener('click', (event) => {
                    deleteItem(element._id);


                })

            });

        })
        .catch(e => {
            console.log(e)
            //alert('FUCK ! WE FAILLED')
        })
}

const editItem = (id) => {

    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/todo/updateSingle/${id}`, {
            method: 'PATCH',
            //body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            //console.log(token);
            return header.json();
        })
        .then(response => {

            //console.log(response)
            alert('Event status updated!');
        })
        .catch(e => {
            console.log(e)
            alert('Event set failled!')
        })

}

const deleteItem = (id) => {

    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/user/deleteSingle/${id}`, {
            method: 'DELETE',
            //body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            //console.log(token);
            return header.json();
        })
        .then(response => {

            //console.log(response)
            getItems();
            console.log('Event deleted')
            //alert('Event deleted!');
        })
        .catch(e => {
            console.log(e)
            alert('Event deletion failled!')
        })
}

const logout = () => {

    let token = localStorage.getItem('x-auth');
    //localStorage.removeItem('x-auth');
    console.log('loginuos lauk')
    fetch('http://localhost:3000/api/v1/user/logout', {
            method: 'GET',
            //body: JSON.stringify(body), 
            headers: {
                // 'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            //console.log(token);
            return header.json();
        })
        .then(response => {
            localStorage.clear();
            console.log(response)
            //getItems();
            console.log('Successfully logouted!')
            //alert('Event deleted!');
        })
        .catch(e => {
            console.log(e)
            //alert('Logout failled!')
        })
}

const deleteTokens = () => {

    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/user/logout/${id}`, {
            method: 'DELETE',
            //body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            //console.log(token);
            return header.json();
        })
        .then(response => {

            //console.log(response)
            getItems();
            console.log('Successfully logouted!')
            //alert('Event deleted!');
        })
        .catch(e => {
            console.log(e)
            alert('Logout failled!')
        })



}

checkifLoggedIn()