const renderAllFollowingPosts = (postArr, location) => {

    const allPostsContainer = document.getElementById(`${location}`);
    // allPostsContainer.textContent = null;

    postArr.forEach(obj => {
        
        //postContainer
        const postContainer = document.createElement('li');
        postContainer.classList.add('post-container');
        postContainer.dataset.postID = obj._id;

        const userBar = document.createElement('p')
        const image = document.createElement('img');
        const buttonsBar = document.createElement('p')
        const likesBar = document.createElement('p');
        const caption = document.createElement('p');
        const dateBar = document.createElement('p');
        const commentListSection = document.createElement('div');

        //userBar content
        userBar.textContent = `Username: ${obj.username} | UserID: ${obj.userID} | PostID: ${obj._id}`;
        postContainer.appendChild(userBar);

        //image content
        image.src = obj.imageURL;
        image.style.width = '300px';
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

const toProfile = () => {
    window.location.href = './index.html';
}

//UNIX timestamp conversion to user friendly date
const unixToDate = (unixTimestamp) =>{
    const date = new Date(unixTimestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    // const sec = date.getSeconds();
    const time = `${min} ${hour}, ${month} ${day}, ${year}`;
    return time;
}

let pageNumber = 1;

const pageAdd = (id) => {
    pageNumber = pageNumber + 1
    if (id === 'loadMore') {
        getAllFollowPosts();
    } else {
        getAllPosts();
    }
}

const btn = document.querySelectorAll('.loadMore');
btn.forEach((e) => {
    e.addEventListener('click', (event) => {
        let id = event.target.id;
        pageAdd(id);
    })
})

const getAllPosts = () => {

    const token = localStorage.getItem('x-auth');
    let list = document.getElementById('list1');
    list = list.id;

    fetch(`http://localhost:2000/api/v1/feedList/getAllPosts/${pageNumber}`, {
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
            renderAllFollowingPosts(response, list);
        })
        .catch(e => {
            console.log(e)
        })
}


const getAllFollowPosts = () => {

    const token = localStorage.getItem('x-auth');
    let list = document.getElementById('list');
    list = list.id;

    fetch(`http://localhost:2000/api/v1/postList/getAllFollowerPosts/${pageNumber}`, {
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
            renderAllFollowingPosts(response, list);
        })
        .catch(e => {
            console.log(e)
        })
}

const checkifLoggedIn = () => {
    const token = localStorage.getItem('x-auth');

    if (!token) {
        alert('Redirecting to login');
        window.location.href = "/login.html";

    } else {
        getAllFollowPosts();
    }
};
checkifLoggedIn();

