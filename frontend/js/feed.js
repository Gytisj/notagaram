const renderAllFollowingPosts = (postArr, location) => {

    const allPostsContainer = document.getElementById(`${location}`);

    postArr.forEach(obj => {
        
        //postContainer
        const postContainer = document.createElement('li');
        postContainer.classList.add('post-container');
        postContainer.dataset.postID = obj._id;
        let userid = obj.userID;

        const userBar = document.createElement('p');
        userBar.setAttribute('onclick', `userPopUp('${userid}')`);
        const image = document.createElement('img');
        const buttonsBar = document.createElement('p')
        const likesBar = document.createElement('p');
        const caption = document.createElement('p');
        const dateBar = document.createElement('p');
        const commentListSection = document.createElement('div');

        //userBar content
        userBar.textContent = `${obj.username}`;
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

const getAllFeedPosts = () => {

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

const checkifLoggedIn1 = () => {
    const token = localStorage.getItem('x-auth');

    if (!token) {
        alert('Redirecting to login');
        window.location.href = "/login.html";

    } else {
        getAllFollowPosts();
    }
};

const userPopUp = (userId) => {

    fetch(`http://localhost:2000/api/v1/user/getSingleUser/${userId}`, {
            method: 'GET'
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }
            return header.json();
        })
        .then(response => {
            getAllPostsById(response);
        })
        .catch(e => {
            console.log(e);
        })
}
const getAllPostsById = (userObj) => {
    
    let id = userObj._id;

    fetch(`http://localhost:2000/api/v1/postList/getAllPostsUserPosts/${id}`, {
            method: 'GET'
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }

            return header.json();
        })
        .then(response => {
            renderProfilePopUp(response, userObj);
            
        })
        .catch(e => {
            console.log(e)
            //alert('FUCK ! WE FAILLED')
        })
}

// const renderProfilePopUp = (postCount, userObj) => {
    
//     let image = userObj.imageURL;
//     let fullName = userObj.fullName;
//     let followers = userObj.followers.length;
//     let following = userObj.following.length;
//     let username = userObj.username;
//     let postNumber = postCount;

//     let userDiv = document.getElementById('userInfo');
//     // userDiv.style.position = 'absolute';

//     let userPopUpDiv = document.createElement('div')
//     userPopUpDiv.setAttribute('id', 'popUpDiv');
//     userPopUpDiv.classList.add('show', 'hide');

//     let followBtn = document.createElement('button');
//     followBtn.textContent = 'Follow';

//     userDiv.appendChild(userPopUpDiv);

//     let fullNameDiv = document.createElement('div');
//     fullNameDiv.setAttribute('id', 'usernameAndFollowBtn');
//      let nameP = document.createElement('h3');
//      nameP.setAttribute('id', 'usernameH3');
//      nameP.textContent = `${username}`;
//      fullNameDiv.appendChild(nameP);
//      fullNameDiv.appendChild(followBtn);
//      userPopUpDiv.appendChild(fullNameDiv);
     

//      let statDiv = document.createElement('div');
//      statDiv.setAttribute('id', 'statdiv');
//      let followersCount = document.createElement('p');
//      followersCount.setAttribute('id', 'infoP');
//      let followingCount = document.createElement('p');
//      followingCount.setAttribute('id', 'infoP');
//      let posterCounter = document.createElement('p');
//      posterCounter.setAttribute('id', 'infoP');
//      followersCount.textContent = `Followers: ${followers}`;
//      followingCount.textContent = `Following: ${following}`;
//      posterCounter.textContent = `Posts: ${postNumber}`
//      let nameDisplayDiv = document.createElement('p');
//      nameDisplayDiv.setAttribute('id', 'fullName');
//      nameDisplayDiv.style.fontSize = '20px';
//      nameDisplayDiv.textContent = fullName;
//      statDiv.appendChild(posterCounter);
//      statDiv.appendChild(followersCount);
//      statDiv.appendChild(followingCount);
//      userDiv.appendChild(statDiv);
//      userDiv.appendChild(nameDisplayDiv);

//     if (image) {

//         let imagePlace = document.getElementById('photoPlace');

//         //Image upload
//         let imgTag = document.createElement('img');
//         imgTag.src = image;
//         imgTag.style.width = '150px';
//         imgTag.style.height = '150px';
//         imgTag.style.borderRadius = '50%';
    
//         imagePlace.appendChild(imgTag);

//     }

// }

checkifLoggedIn1();

