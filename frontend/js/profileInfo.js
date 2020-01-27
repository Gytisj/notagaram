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
            // console.log(response);
            getAllPostsById(response);
        })
        .catch(e => {
            console.log(e);
        })
}

const getAllPostsById = (userObj) => {
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
        imgTag.src = userObj.image;
        imgTag.style.width = '150px';
        imgTag.style.height = '150px';
        imgTag.style.borderRadius = '50%';
        
        let imageDiv = document.getElementById('profilePic');
        imageDiv.appendChild(imgTag);

       profileStatsRender(fullName, followers, following, username, postCount);
    }
}

const profileStatsRender = (fullName, followers, following, username, posts) => {
     //User Info display
     let userInfoDiv = document.getElementById('profileInfo');
     let fullNameDiv = document.createElement('div');
     let nameP = document.createElement('h3');
     nameP.textContent = `Hey, ${username}`;
     fullNameDiv.appendChild(nameP);
     userInfoDiv.appendChild(fullNameDiv);

     let statDiv = document.createElement('div');
     statDiv.setAttribute('id', 'statdiv');
     let followersCount = document.createElement('p');
     followersCount.setAttribute('id', 'infoP');
     let followingCount = document.createElement('p');
     followingCount.setAttribute('id', 'infoP');
     let postCount = document.createElement('p');
     postCount.setAttribute('id', 'infoP');
     followersCount.textContent = `Followers: ${followers}`;
     followingCount.textContent = `Following: ${following}`;
     postCount.textContent = `Posts: ${posts}`
     let nameDisplayDiv = document.createElement('p');
     nameDisplayDiv.setAttribute('id', 'fullName');
     nameDisplayDiv.style.fontSize = '20px';
     nameDisplayDiv.textContent = fullName;
     statDiv.appendChild(followersCount);
     statDiv.appendChild(followingCount);
     statDiv.appendChild(postCount);
     userInfoDiv.appendChild(statDiv);
     userInfoDiv.appendChild(nameDisplayDiv);
}

getLoggedUserInfo();
