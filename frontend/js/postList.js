const createPost = () => {
  let token = localStorage.getItem("x-auth");
  let image = document.getElementById("newPostImage");
  let caption = document.getElementById("newPostCaption").value;

  let data = new FormData();
  data.append("picture", image.files[0]);
  data.append("caption", caption);

  fetch("http://localhost:2000/api/v1/postList/addPost", {
    method: "POST",
    body: data,
    headers: {
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header;
    })
    .then(response => {
      alert("Item added");

      getAllPosts();
    })
    .catch(e => {
      console.log(e);
      alert("Item failed");
    });
};

// let uploadPicBtn = document.getElementById('profilePicture');

// uploadPicBtn.addEventListener('click', (e) => {
//     console.log('labas');
//     // addProfileImage();
// })

const addProfileImage = () => {
  let token = localStorage.getItem("x-auth");
  let image = document.getElementById("profilePicture");

  let data = new FormData();
  data.append("picture", image.files[0]);

  fetch("http://localhost:2000/api/v1/user/addProfileImage", {
    method: "PATCH",
    body: data,
    headers: {
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header;
    })
    .then(response => {
      location.reload();
    })
    .catch(e => {
      console.log(e);
    });
};

const getAllPosts = () => {
    console.log('GETING POSTS');


    const token = localStorage.getItem('x-auth');

    fetch(`http://localhost:2000/api/v1/postList/getAllPosts`, {
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
            // renderAllPosts(response);
            // if (location.href = '/discovery.html') {
            //     renderAllPostImages(response);
            // } else if (location.href = '/index.html') {
            //     renderAllPostImages(response);
            // }
            renderAllPostImages(response);
            //postNumber(response);
            
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

const createComment = (postID, commentText, postTagRef) => {
  console.log("ADDING POST COMMENT");
  //console.log(commentText)
  const token = localStorage.getItem("x-auth");

  const data = {
    text: commentText,
    postID: postID
  };

  //console.log(data)

  fetch("http://localhost:2000/api/v1/commentList/addComment", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header;
    })
    .then(response => {
      //console.log(response)
      //console.log(postTagRef)
      getAllPostComments(postID, postTagRef);
    })
    .catch(e => {
      console.log(e);
    });
};

const getAllPostComments = (postID, postTagRef) => {
  console.log("GETING POST COMMENTS");
  const token = localStorage.getItem("x-auth");

  fetch(`http://localhost:2000/api/v1/commentList/getComment/${postID}`, {
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

      renderAllComments(response, postTagRef);
    })
    .catch(e => {
      console.log(e);
    });
};

const getLatestPostComments = (postID, postTagRef) => {
  const token = localStorage.getItem("x-auth");

  fetch(
    `http://localhost:2000/api/v1/commentList/getLatestComments/${postID}`,
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
      renderAllComments(response, postTagRef);
    })
    .catch(e => {
      console.log(e);
    });
};

const deleteComment = id => {
  const token = localStorage.getItem("x-auth");

  fetch(`http://localhost:2000/api/v1/commentList/deleteComment/${id}`, {
    method: "DELETE",
    headers: {
      //'Content-Type': 'application/json',
      "x-auth": token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header);
      }
      return header.json();
    })
    .then(response => {})
    .catch(e => {
      console.log(e);
    });
};

const editComment = (id, updatedText) => {
  const token = localStorage.getItem("x-auth");
  const body = {
    text: updatedText
  };

  fetch(`http://localhost:2000/api/v1/commentList/editComment/${id}`, {
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
      return header.json();
    })
    .then(response => {
      renderSingleComment(response);
    })
    .catch(e => {
      console.log(e);
    });
};

const renderAllPostImages = (postArr) => {
  

    const allPostsContainer = document.getElementById('myFeed');
    if (allPostsContainer) {
        allPostsContainer.textContent = null;
    }

    postArr.forEach(obj => {
        
        const postContainer = document.createElement('li');
        postContainer.classList.add('col-4', 'myFeed');
        const image = document.createElement('img');
        image.setAttribute('id', 'myOwnPicture');
        image.src = obj.imageURL;
        image.style.width = '100%';
        image.style.height = '300px';
        postContainer.appendChild(image);
        if (allPostsContainer) {
            allPostsContainer.appendChild(postContainer);
        }
})};

const renderAllComments = (commentsArr, commetsContainer) => {
  //console.log('commentsArr', commentsArr)

  commetsContainer.textContent = null;

  commetsContainer.classList.add("all-comments-container");
  //const allPostsContainer = document.getElementById(obj.postId);
  //allPostsContainer.textContent = null;
  commentsArr.forEach(obj => {
    //console.log(Object.keys(obj))

    const commentLine = document.createElement("div");
    const comment = document.createElement("p");
    const user = document.createElement("p");

    //console.log('obj', obj);

    commentLine.id = obj._id;
    comment.classList.add("comment-text");

    user.textContent = `${obj.username}:`;
    comment.textContent = `${obj.text}`;

    //console.log(comment);
    user.style.display = "inline-block";
    comment.style.display = "inline-block";

    commentLine.appendChild(user);
    commentLine.appendChild(comment);

    if (obj.showDeleteAction) {
      const commentDeleteButton = document.createElement("button");
      commentDeleteButton.textContent = "X";

      commentDeleteButton.addEventListener("click", event => {
        //console.log(obj._id)
        deleteComment(obj._id);
        commentLine.remove();
        //console.log('deleting', event)
      });

      commentLine.appendChild(commentDeleteButton);
    }

    if (obj.showEditAction) {
      const commentEditButton = document.createElement("button");
      const commentEditInput = document.createElement("input");

      commentEditButton.textContent = "Edit";
      commentEditInput.placeholder = "Edit comment...";

      commentEditInput.style.display = "none";

      commentEditButton.addEventListener("click", event => {
        if (commentEditInput.style.display !== "none") {
          if (commentEditInput.value && commentEditInput.value !== obj.text) {
            editComment(obj._id, commentEditInput.value);
          }

          commentEditInput.style.display = "none";
          commentEditButton.textContent = "Edit";
        } else {
          commentEditInput.style.display = "inline-block";
          commentEditButton.textContent = "Save";
          commentEditInput.value = obj.text;
        }
      });

      commentLine.appendChild(commentEditButton);
      commentLine.appendChild(commentEditInput);
    }

    commetsContainer.appendChild(commentLine);
  });
};

const renderSingleComment = commentObj => {
  const comment = document
    .getElementById(commentObj._id)
    .getElementsByClassName("comment-text")[0];
  comment.textContent = commentObj.text;
};

const renderLatestComments = commentsArr => {
  const allComments = document.createElement('div');
  allComments.classList.add('all-comments-container');
  for (let index = 0; index < 2; index++) {
     console.log(index);
  }
  commentsArr.forEach(obj => {
      const commentLine = document.createElement('div');
      const comment = document.createElement('p');
      const user = document.createElement('p');
      const commentDeleteButton = document.createElement('button');
      //console.log(obj.username);
      user.textContent = `${obj.username}:`;
      comment.textContent = `${obj.text}`;
      commentDeleteButton.textContent = 'X'
      //console.log(comment);
      user.style.display = 'inline-block';
      comment.style.display = 'inline-block';
      commentLine.appendChild(user);
      commentLine.appendChild(comment);
      commentLine.appendChild(commentDeleteButton);
      allComments.appendChild(commentLine);
      //commentListSection.appendChild('comment');
  });
  commetsContainer.appendChild(allComments);
};

const logout = () => {
  const token = localStorage.getItem("x-auth");

  fetch("http://localhost:2000/api/v1/user/logout", {
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

      return header.json();
    })
    .then(response => {
      localStorage.removeItem("x-auth");
      //console.log(response)
      //getItems();
      alert("LOGOUT: successful");
      window.location.href = "/login.html";
    })
    .catch(e => {
      console.log(e);
      alert("LOGOUT: failed!");
    });
};

// checkifLoggedIn();
getAllPosts();