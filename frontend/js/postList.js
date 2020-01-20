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

    const token = localStorage.getItem('x-auth');
    const image = document.getElementById('newPostImage').value
    const caption = document.getElementById('newPostCaption').value

    const body = {
        imageURL: image,
        caption: caption
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
            console.log(header)
            if (!header.ok) {
                throw Error(header)
            }

            //console.log(token);
            return header.json();
        })
        .then(response => {

            getAllPosts()
            //console.log(response)
            // alert('Item added');
            // window.location.href = '/index.html'
            // getItems();
        })
        .catch(e => {
            console.log(e)
            alert('Item failed')
        })
}

const getAllPosts = () => {
    console.log('GETING POSTS');

    const token = localStorage.getItem('x-auth');

    fetch('http://localhost:2000/api/v1/postList/getAllPosts', {
            method: 'GET',
            headers: {
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
            console.log(response);
            renderAllPosts(response);
            
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

const getAllPostComments = (postID) => {
    console.log('GETING POST COMMENTS');

    const token = localStorage.getItem('x-auth');

    fetch(`http://localhost:2000/api/v1/commentList/getComment/${postID}`, {
            method: 'GET',
            headers: {
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
            console.log(response);
            
        })
        .catch(e => {
            console.log(e)
            //alert('FAILLED')
        })
}

const renderAllPosts = (postArr) => {
    // "date": 1579259383502,
    // "likes": 0,
    // "_id": "5e21981566aaa05ec02f3606",
    // "imageURL": "qqqqqqq",
    // "caption": "qqqqqqqqq",
    // "username": "jonas",
    // "userID": "5e2053181c0c7804804ac508",
    // "__v": 0

    const allPostsContainer = document.getElementById('list');
    allPostsContainer.textContent = null;

    postArr.forEach(obj => {
        


        //postContainer
        const postContainer = document.createElement('div');
        postContainer.classList.add('post-container');
        postContainer.dataset.postID = obj._id;

        const userBar = document.createElement('p')
        const image = document.createElement('div');
        const buttonsBar = document.createElement('p')
        const likesBar = document.createElement('p');
        const caption = document.createElement('p');
        const dateBar = document.createElement('p');
        const commentListSection = document.createElement('div');

        //userBar content
        userBar.textContent = `Username: ${obj.username} | UserID: ${obj.userID} | PostID: ${obj._id}`;
        postContainer.appendChild(userBar);

        //image content
        image.textContent = 'img';
        postContainer.appendChild(image);

        //buttonsBar content
        const likeButton = document.createElement('button');
        const commentButton = document.createElement('button');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        likeButton.textContent = 'Like';
        commentButton.textContent = 'Comment';
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        buttonsBar.appendChild(likeButton);
        buttonsBar.appendChild(commentButton);
        buttonsBar.appendChild(editButton);
        buttonsBar.appendChild(deleteButton);

        postContainer.appendChild(buttonsBar);

        //likesBar content
        likesBar.textContent = `Likes: ${obj.likes}`;
        postContainer.appendChild(likesBar);

        //caption content
        caption.textContent =`Caption: ${obj.caption}` ;
        postContainer.appendChild(caption);

        //date content
        dateBar.textContent = `date: ${unixToDate(obj.date)}`;
        postContainer.appendChild(dateBar);

        //commentListSection content
        const viewAllCommentsButton = document.createElement('button');
        commentListSection.dataset.postID = obj._id;
        viewAllCommentsButton.textContent = 'View all comments';

        viewAllCommentsButton.addEventListener('click', (event) => {
            getAllPostComments('5e2053181c0c7804804ac508')
            
            // console.log(event.target.parentNode.dataset.postID);
            // console.log(event);
            
        })

        commentListSection.appendChild(viewAllCommentsButton);
        postContainer.appendChild(commentListSection);


        



        allPostsContainer.appendChild(postContainer);
    });
}

const renderAllComments = (commentsArr) => {

    const allPostsContainer = document.getElementById('list');
    
    allPostsContainer.textContent = null;

    commentsArr.forEach(obj => {
        

    });
}


//UNIX timestamp conversion to user friendly date
const unixToDate = (unixTimestamp) =>{
    const date = new Date(unixTimestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    // const hour = date.getHours();
    // const min = date.getMinutes();
    // const sec = date.getSeconds();
    const time = `${month} ${day}, ${year}`;
    return time;
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
getAllPosts()