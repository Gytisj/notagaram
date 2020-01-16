const checkifLoggedIn = () => {
    const token = localStorage.getItem('x-auth');

    if (!token) {
        alert('Redirecting to login');
        window.location.href = "/login.html";

    } else {
        //getItems();
    }
}

const createPost = () => {

    let token = localStorage.getItem('x-auth');
    let image = document.getElementById('newPostImage').value
    let caption = document.getElementById('newPostCaption').value

    let body = {
        imageURL : image,
        caption : caption
    }

    fetch('http://localhost:2000/api/v1/postList/addPost', {
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

            console.log(response)
            // alert('Item added');
            // window.location.href = '/index.html'
            // getItems();
        })
        .catch(e => {
            console.log(e)
            alert('Item failed')
        })
}

const getPosts = () => {
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

const editPost = (id) => {

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

const deletePost = (id) => {

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

    const token = localStorage.getItem('x-auth');

    fetch('http://localhost:2000/api/v1/user/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            localStorage.removeItem('x-auth');
            //console.log(response)
            //getItems();
            alert('LOGOUT: successful');
            window.location.href = "/login.html";
        })
        .catch(e => {
            console.log(e)
            alert('LOGOUT: failed!')
        })
}


checkifLoggedIn()