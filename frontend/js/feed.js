const renderAllFollowingPosts = (postArr, location) => {
  const allPostsContainer = document.getElementById(`${location}`);

  if (location == "list") {
    postArr.forEach(async obj => {
      getUserInfoFollowing(obj, location);
    });
  } else {
    postArr.forEach(obj => {
      //postContainer
      const postContainer = document.createElement("li");
      postContainer.classList.add("col-4", "post-container");
      const image = document.createElement("img");

      //image content
      image.setAttribute("id", "myOwnPicture");
      image.src = obj.imageURL;
      image.style.width = "100%";
      image.style.height = "300px";
      image.addEventListener("click", e => {
        //window.location.href = '/picture.html';
        getUserInfo(obj, location);
      });
      postContainer.appendChild(image);
      allPostsContainer.appendChild(postContainer);
    });
  }
};

const renderFollowingPosts = (user, obj, location) => {
  const allPostsContainer = document.getElementById(`${location}`);
  const li = document.createElement("li");

  //User info and back button
  let userAndBackBtnDiv = document.createElement("div");
  userAndBackBtnDiv.setAttribute("id", "userAndBackBtnDiv");
  li.appendChild(userAndBackBtnDiv);

  //username and photo
  let usernameAndPhoto = document.createElement("div");
  usernameAndPhoto.setAttribute("id", "usernameAndPhoto");
  userAndBackBtnDiv.appendChild(usernameAndPhoto);
  let userImage = document.createElement("img");
  userImage.setAttribute("id", "userImage");
  userImage.src = user.imageURL;
  let username = document.createElement("p");
  username.textContent = `${user.username}`;
  usernameAndPhoto.appendChild(userImage);
  usernameAndPhoto.appendChild(username);
  userAndBackBtnDiv.appendChild(usernameAndPhoto);

  //Image
  let imageDiv = document.createElement("div");
  imageDiv.setAttribute("id", "imageDiv");
  let image = document.createElement("img");
  image.src = obj.imageURL;
  image.style.width = "100%";
  image.style.height = "800px";
  imageDiv.appendChild(image);
  li.appendChild(imageDiv);

  //Likes, comments and follow button
  let likeAndCommentDiv = document.createElement("div");
  likeAndCommentDiv.setAttribute("id", "likeAndCommentDiv");
  likeAndComment = document.createElement("div");
  let likesBtn = document.createElement("img");
  likesBtn.src = `./png's/heart.svg`;
  likesBtn.style.width = "90px";
  likesBtn.style.height = "70px";
  likesBtn.addEventListener("click", e => {
    console.log("Like");
  });
  let commentBtn = document.createElement("img");
  commentBtn.src = `./png's/comment.svg`;
  commentBtn.style.width = "90px";
  commentBtn.style.height = "70px";
  commentBtn.addEventListener("click", e => {
    console.log("Comment");
    renderSoloPicture(user, obj, location);
  });
  likeAndComment.appendChild(likesBtn);
  likeAndComment.appendChild(commentBtn);
  likeAndCommentDiv.appendChild(likeAndComment);
  li.appendChild(likeAndCommentDiv);
  allPostsContainer.appendChild(li);
};

let getUserInfo = obj => {
  let userId = obj.userID;

  fetch(`http://localhost:2000/api/v1/user/getSingleUser/${userId}`, {
    method: "GET"
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header.json();
    })
    .then(response => {
      renderSoloPicture(response, obj, location);
    })
    .catch(e => {
      console.log(e);
    });
};

let getUserInfoFollowing = (obj, location) => {
  let userId = obj.userID;

  fetch(`http://localhost:2000/api/v1/user/getSingleUser/${userId}`, {
    method: "GET"
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header.json();
    })
    .then(response => {
      renderFollowingPosts(response, obj, location);
    })
    .catch(e => {
      console.log(e);
    });
};

const renderSoloPicture = (user, obj, location) => {
  //User info and back button
  let userAndBackBtnDiv = document.createElement("div");
  userAndBackBtnDiv.setAttribute("id", "userAndBackBtnDiv");
  pictureDiv.appendChild(userAndBackBtnDiv);

  //username and photo
  let usernameAndPhoto = document.createElement("div");
  usernameAndPhoto.setAttribute("id", "usernameAndPhoto");
  userAndBackBtnDiv.appendChild(usernameAndPhoto);
  let userImage = document.createElement("img");
  userImage.setAttribute("id", "userImage");
  userImage.src = user.imageURL;
  let username = document.createElement("p");
  username.textContent = `${user.username}`;
  usernameAndPhoto.appendChild(userImage);
  usernameAndPhoto.appendChild(username);

  //Image
  let imageDiv = document.createElement("div");
  imageDiv.setAttribute("id", "imageDiv");
  let image = document.createElement("img");
  image.src = obj.imageURL;
  image.style.width = "100%";
  image.style.height = "800px";
  imageDiv.appendChild(image);
  pictureDiv.appendChild(imageDiv);

  //Back button
  let backBtn = document.createElement("img");
  backBtn.src = `./png's/previous.svg`;
  backBtn.style.width = "90px";
  backBtn.style.height = "70px";
  backBtn.addEventListener("click", e => {
    if (location == "list") {
      let pictureDiv = document.getElementById("pictureDiv");
      pictureDiv.classList.add("pictureDiv");
      pictureDiv.innerHTML = null;
      let discoveryUl = document.getElementById("activity");
      discoveryUl.classList.remove("about_me");
    } else {
      let discoveryUl = document.getElementById("myTabContent");
      discoveryUl.classList.remove("about_me");
      let pictureDiv = document.getElementById("pictureDiv");
      pictureDiv.innerHTML = null;
      pictureDiv.classList.add("pictureDiv");
    }
  });
  userAndBackBtnDiv.appendChild(backBtn);

  //Likes, comments and follow button
  let likeAndCommentDiv = document.createElement("div");
  likeAndCommentDiv.setAttribute("id", "likeAndCommentDiv");
  likeAndComment = document.createElement("div");
  let likesBtn = document.createElement("img");
  likesBtn.src = `./png's/heart.svg`;
  likesBtn.style.width = "90px";
  likesBtn.style.height = "70px";
  console.log(obj.likes);
  console.log(user._id);
  likesBtn.addEventListener("click", e => {
    if (obj.likes.length) {
      alert("zjbs!");
      removeLike(obj._id);
      obj.likes = [];
      likesBtn.src = `./png's/heart.svg`;
      console.log("Like exists!");
    } else {
      addLike(obj._id);
      obj.likes = [1];
      likesBtn.src = `./png's/heartRed.svg`;
    }
  });
  let commentBtn = document.createElement("img");
  commentBtn.src = `./png's/comment.svg`;
  commentBtn.style.width = "90px";
  commentBtn.style.height = "70px";
  commentBtn.addEventListener("click", e => {
    console.log("Comment");
  });
  likeAndComment.appendChild(likesBtn);
  likeAndComment.appendChild(commentBtn);
  likeAndCommentDiv.appendChild(likeAndComment);
  pictureDiv.appendChild(likeAndCommentDiv);
  if (location == "list") {
  } else {
    let followBtn = document.createElement("p");
    followBtn.textContent = "Unfollow";
    likeAndCommentDiv.appendChild(followBtn);
  }

  if (location == "list") {
    let pictureDiv = document.getElementById("pictureDiv");
    pictureDiv.classList.remove("pictureDiv");
    let discoveryUl = document.getElementById("activity");
    discoveryUl.classList.add("about_me");
  } else {
    let discoveryUl = document.getElementById("myTabContent");
    discoveryUl.classList.add("about_me");
    let pictureDiv = document.getElementById("pictureDiv");
    pictureDiv.classList.remove("pictureDiv");
  }
};

const addLike = id => {
  let token = localStorage.getItem("x-auth");
  let body = { id };
  console.log(id);
  fetch(`http://localhost:2000/api/v1/feedList/addLike/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }

      //console.log(token);
      return header.json();
    })
    .then(response => {
      //console.log(response)
      renderLikes(id);
      alert("Event status updated!");
    })
    .catch(e => {
      console.log(e);
      alert("Event set failled!");
    });
};

const removeLike = id => {
  let token = localStorage.getItem("x-auth");
  let body = { id };
  console.log(id);
  fetch(`http://localhost:2000/api/v1/feedList/removeLike/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }

      //console.log(token);
      return header.json();
    })
    .then(response => {
      //console.log(response)
      renderLikes(id);
      alert("Event status updated!");
    })
    .catch(e => {
      console.log(e);
      alert("Event set failled!");
    });
};

const renderLikes = (userID, id) => {
  let token = localStorage.getItem("x-auth");
  fetch(`http://localhost:2000/api/v1/feedList/getAllLikes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      //console.log(token);
      return header.json();
    })
    .then(response => {
      console.log(response);

      alert("Event status updated!");
    })
    .catch(e => {
      console.log(e);
      alert("Event set failled!");
    });
};

//UNIX timestamp conversion to user friendly date
const unixToDate = unixTimestamp => {
  const date = new Date(unixTimestamp);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  // const sec = date.getSeconds();
  const time = `${min} ${hour}, ${month} ${day}, ${year}`;
  return time;
};

let pageNumber = 1;

const pageAdd = id => {
  pageNumber = pageNumber + 1;
  if (id === "loadMore") {
    getAllFollowPosts();
  } else {
    getAllFeedPosts();
  }
};

const btn = document.querySelectorAll(".loadMore");
btn.forEach(e => {
  e.addEventListener("click", event => {
    let id = event.target.id;
    pageAdd(id);
  });
});

const getAllFeedPosts = () => {
  const token = localStorage.getItem("x-auth");
  let list = document.getElementById("list1");
  list = list.id;

  fetch(`http://localhost:2000/api/v1/feedList/getAllPosts/${pageNumber}`, {
    method: "GET",
    headers: {
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }

      return header.json();
    })
    .then(response => {
      console.log(response);
      renderAllFollowingPosts(response, list);
    })
    .catch(e => {
      console.log(e);
    });
};

const getAllFollowPosts = () => {
  const token = localStorage.getItem("x-auth");
  let list = document.getElementById("list");
  list = list.id;

  fetch(
    `http://localhost:2000/api/v1/postList/getAllFollowerPosts/${pageNumber}`,
    {
      method: "GET",
      headers: {
        "x-auth": token
      }
    }
  )
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }

      return header.json();
    })
    .then(response => {
      renderAllFollowingPosts(response, list);
    })
    .catch(e => {
      console.log(e);
    });
};

const getAllPostsById = userObj => {
  let id = userObj._id;

  fetch(`http://localhost:2000/api/v1/postList/getAllPostsUserPosts/${id}`, {
    method: "GET"
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }

      return header.json();
    })
    .then(response => {
      renderProfilePopUp(response, userObj);
    })
    .catch(e => {
      console.log(e);
      //alert('FUCK ! WE FAILLED')
    });
};

let onLoad = () => {
  let result = location.pathname;
  if (result == "/discovery.html") {
    getAllFeedPosts();
  } else if (result == "/feed.html") {
    getAllFollowPosts();
  }
};

const follow = () => {
  const token = localStorage.getItem("x-auth");

  fetch(`http://localhost:2000/api/v1/user/follow/5e31dc8d35c22964fc7fb9a0`, {
    method: "PATCH",
    headers: {
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header.json();
    })
    .then(response => {
      // console.log(response);
    })
    .catch(e => {
      // console.log(e);
    });
};

const unfollow = () => {
  const token = localStorage.getItem("x-auth");

  fetch(`http://localhost:2000/api/v1/user/unfollow/5e31dc8d35c22964fc7fb9a0`, {
    method: "PATCH",
    headers: {
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header.json();
    })
    .then(response => {
      // console.log(response);
    })
    .catch(e => {
      // console.log(e);
    });
};

const checkIfFollow = () => {
  const token = localStorage.getItem("x-auth");

  fetch(
    `http://localhost:2000/api/v1/user/checkIfFollow/5e31dc8d35c22964fc7fb9a0`,
    {
      method: "GET",
      headers: {
        "x-auth": token
      }
    }
  )
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header.json();
    })
    .then(response => {
      if (response.followers.length > 0) {
        unfollow();
      } else if (response.followers.length == 0) {
        follow();
      }
    })
    .catch(e => {
      console.log(e);
    });
};

// checkifLoggedIn();

onLoad();
