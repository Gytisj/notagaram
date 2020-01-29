const getLoggedUserInfo = () =>{
    const token = localStorage.getItem('x-auth');

    fetch('http://localhost:2000/api/v1/user/getFullName', {
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
            getAllPostsById1(response);
        })
        .catch(e => {
            console.log(e);
        })
}

const getAllPostsById1 = (userObj) => {
    console.log('GETING POSTS BY ID');


    const token = localStorage.getItem('x-auth');

    fetch('http://localhost:2000/api/v1/user/getAllPostsByID', {
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
            renderProfileInfo(response, userObj);
            
        })
        .catch(e => {
            console.log(e)
            //alert('FUCK ! WE FAILLED')
        })
}

const renderProfileInfo = (posts, userObj) => {

    let image = userObj.image;
    let fullName = userObj.fullName;
    let followers = userObj.followers;
    let following = userObj.following;
    let username = userObj.username;
    let postCount = posts.postList;

    if (image == undefined) {
        let picDiv = document.getElementById('uploadPic');
        picDiv.style.display = 'inline-block';

        profileStatsRender(fullName, followers, following, username, postCount);
    } else {
        let picDiv = document.getElementById('uploadPic');
        picDiv.style.display = 'none';

        //Image upload
        let imgTag = document.createElement('img');
        imgTag.setAttribute('id', 'profilePhoto');
        imgTag.src = userObj.image;
        
        let imageDiv = document.getElementById('profilePic');
        imageDiv.appendChild(imgTag);

       profileStatsRender(fullName, followers, following, username, postCount);
    }
}

const profileStatsRender = (fullName, followers, following, username, posts) => {
     //User Info display
     let usernameDiv = document.getElementById('username');

     let nameP = document.createElement('p');
     nameP.setAttribute('id', 'usernameForEdit');
     let headerName = document.getElementById('headerName');
     headerName.textContent = `${username}`
     nameP.textContent = `${username}`;
     usernameDiv.appendChild(nameP);

    let postsDiv = document.getElementById('posts');
    let followersDiv = document.getElementById('followers');
    let followingDiv = document.getElementById('following');
     let followersCount = document.createElement('p');
     followersCount.setAttribute('id', 'number');
     let followingCount = document.createElement('p');
     followingCount.setAttribute('id', 'number');
     let postCount = document.createElement('p');
     postCount.setAttribute('id', 'number');
     let followersCountText = document.createElement('p');
     followersCountText.setAttribute('id', 'infoP');
     let followingCountText = document.createElement('p');
     followingCountText.setAttribute('id', 'infoP');
     let postCountText = document.createElement('p');
     postCountText.setAttribute('id', 'infoP');
     followersCountText.textContent = 'Followers';
     followingCountText.textContent = 'Following';
     postCountText.textContent = 'Posts';
     followersCount.innerHTML = `${followers}`;
     followingCount.innerHTML = `${following}`;
     postCount.innerHTML = `${posts}`;
     postsDiv.appendChild(postCount);
     postsDiv.appendChild(postCountText);
     followersDiv.appendChild(followersCount);
     followersDiv.appendChild(followersCountText);
     followingDiv.appendChild(followingCount);
     followingDiv.appendChild(followingCountText);

}

getLoggedUserInfo();
