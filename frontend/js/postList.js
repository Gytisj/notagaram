const checkifLoggedIn = () => {
    const token = localStorage.getItem('x-auth');

    if (!token) {
        alert('Redirecting to login');
        window.location.href = "/login.html";

    } else {
        getAllPosts();
    }
}

const createPost = () => {

    let token = localStorage.getItem('x-auth');
    let image = document.getElementById('newPostImage');
    let caption = document.getElementById('newPostCaption').value

    let data = new FormData();
    data.append('picture', image.files[0]);
    data.append('caption', caption);

    fetch('http://localhost:2000/api/v1/postList/addPost', {
            method: 'POST',
            body: data,
            headers: {
                'x-auth': token
            }
        })
        .then(header => {
            //console.log(header)
            if (!header.ok) {
                throw Error(header)
            }
            return header;
        })
        .then(response => {
            alert('Item added');

            getAllPosts();
            //console.log(response)
            // alert('Item added');
            // window.location.href = '/index.html'
            // getItems();

        })
        .catch(e => {
            console.log(e)
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


const createComment = (postID, commentText, postTagRef) => {
    console.log('ADDING POST COMMENT');
    //console.log(commentText)
    const token = localStorage.getItem('x-auth');

    const data = {
        text: commentText,
        postID: postID,
    }

    //console.log(data)

    fetch('http://localhost:2000/api/v1/commentList/addComment', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-auth': token
            }
        })
        .then(header => {
            if (!header.ok) {
                throw Error(header)
            }
            return header;
        })
        .then(response => {

            //console.log(response)
            //console.log(postTagRef)
            getAllPostComments(postID, postTagRef)

        })
        .catch(e => {
            console.log(e)
        })
}

const getAllPostComments = (postID, postTagRef) => {
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
           
            renderAllComments(response, postTagRef);

        })
        .catch(e => {
            console.log(e)
        })
}

const getLatestPostComments = (postID, postTagRef) => {
    const token = localStorage.getItem('x-auth');

    fetch(`http://localhost:2000/api/v1/commentList/getLatestComments/${postID}`, {
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
            renderAllComments(response, postTagRef);

        })
        .catch(e => {
            console.log(e)
        })
}

const deleteComment = (id) => {

    const token = localStorage.getItem('x-auth');

    fetch(`http://localhost:2000/api/v1/commentList/deleteComment/${id}`, {
            method: 'DELETE',
            headers: {
                //'Content-Type': 'application/json',
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


        })
        .catch(e => {
            console.log(e)

        })
}

const editComment = (id, updatedText) => {

    const token = localStorage.getItem('x-auth');
    const body = {
        text: updatedText
    }

    fetch(`http://localhost:2000/api/v1/commentList/editComment/${id}`, {
            method: 'PATCH',
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
            return header.json();
        })
        .then(response => {
            renderSingleComment(response);

        })
        .catch(e => {
            console.log(e)

        })
}

const renderAllPosts = (postArr) => {

    const allPostsContainer = document.getElementById('list');
    allPostsContainer.textContent = null;

    postArr.forEach(obj => {

        const postContainer = document.createElement('div');
        postContainer.classList.add('post-container');
        postContainer.id = obj._id;
        //postContainer.dataset.postID = obj._id;
        

        const userBar = document.createElement('p')
        const image = document.createElement('img');
        const buttonsBar = document.createElement('p')
        const likesBar = document.createElement('p');
        const caption = document.createElement('p');
        const dateBar = document.createElement('p');
        const commentListSection = document.createElement('div');
        const newCommentContainer = document.createElement('div');

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
        caption.textContent = `Caption: ${obj.caption}`;
        postContainer.appendChild(caption);

        //date content
        dateBar.textContent = `date: ${unixToDate(obj.date)}`;
        postContainer.appendChild(dateBar);

        //commentListSection content
        const viewAllCommentsButton = document.createElement('button');
        viewAllCommentsButton.textContent = 'View all comments';
        viewAllCommentsButton.classList.add('view-all-comments-btn')
        //getAllPostComments(obj._id, commentListSection);
        //getLatestPostComments(obj._id, commentListSection)
        ////renderAllComments(obj.latestComments, commentListSection)
        
        //console.log(obj.latestComments)

        viewAllCommentsButton.addEventListener('click', (event) => {

            viewAllCommentsButton.style.display = 'none';
            getAllPostComments(obj._id, commentListSection);

        })

        postContainer.appendChild(viewAllCommentsButton);
        postContainer.appendChild(commentListSection);

        //commentInput section
        newCommentContainer.classList.add('new-comment-container');

        const addCommentInput = document.createElement('input');
        addCommentInput.placeholder = 'Add a comment...'
        newCommentContainer.appendChild(addCommentInput);

        const addCommentButton = document.createElement('button');
        addCommentButton.textContent = 'POST';
        newCommentContainer.appendChild(addCommentButton);

        addCommentButton.addEventListener('click', event => {
        
            viewAllCommentsButton.style.display = 'none'
            createComment(obj._id, addCommentInput.value, commentListSection);


        })

        postContainer.appendChild(newCommentContainer);

        allPostsContainer.appendChild(postContainer);
    });
}

const renderAllComments = (commentsArr, commetsContainer) => {
    //console.log('commentsArr', commentsArr)

    commetsContainer.textContent = null;

    commetsContainer.classList.add('all-comments-container');
    //const allPostsContainer = document.getElementById(obj.postId);
    //allPostsContainer.textContent = null;
    commentsArr.forEach(obj => {
        //console.log(Object.keys(obj))

        const commentLine = document.createElement('div');
        const comment = document.createElement('p');
        const user = document.createElement('p');
        

        //console.log('obj', obj);

        commentLine.id = obj._id;
        comment.classList.add('comment-text')

        user.textContent = `${obj.username}:`;
        comment.textContent = `${obj.text}`;
        
        
        //console.log(comment);
        user.style.display = 'inline-block';
        comment.style.display = 'inline-block';
        

        

        
 
        commentLine.appendChild(user);
        commentLine.appendChild(comment);

        if (obj.showDeleteAction) {
            const commentDeleteButton = document.createElement('button');
            commentDeleteButton.textContent = 'X';

            commentDeleteButton.addEventListener('click', event => {
                //console.log(obj._id)
                deleteComment(obj._id);
                commentLine.remove();
                //console.log('deleting', event)
            })

            commentLine.appendChild(commentDeleteButton);
        }

        if (obj.showEditAction) {
            const commentEditButton = document.createElement('button');
            const commentEditInput = document.createElement('input');

            commentEditButton.textContent = 'Edit'
            commentEditInput.placeholder = 'Edit comment...'

            commentEditInput.style.display = 'none';

            commentEditButton.addEventListener('click', event => {
            
                if (commentEditInput.style.display !== 'none'){
                        if (commentEditInput.value && commentEditInput.value !== obj.text ) {
                            editComment(obj._id, commentEditInput.value)
                             
                        }
                    
                    commentEditInput.style.display = 'none';
                    commentEditButton.textContent = 'Edit';
                    
                } else {
                    commentEditInput.style.display = 'inline-block';
                    commentEditButton.textContent = 'Save';
                    commentEditInput.value = obj.text;
    
                }
            })

            commentLine.appendChild(commentEditButton);
            commentLine.appendChild(commentEditInput);
        }
        
        commetsContainer.appendChild(commentLine);

        
    });
}

const renderSingleComment = (commentObj) => {
    const comment = document.getElementById(commentObj._id).getElementsByClassName("comment-text")[0]
    comment.textContent = commentObj.text;

}

const renderLatestComments = (commentsArr) => {

    // const allComments = document.createElement('div');
    // allComments.classList.add('all-comments-container');

    // for (let index = 0; index < 2; index++) {
    //    console.log(index);

    // }

    // commentsArr.forEach(obj => {
    //     const commentLine = document.createElement('div');
    //     const comment = document.createElement('p');
    //     const user = document.createElement('p');
    //     const commentDeleteButton = document.createElement('button');
    //     //console.log(obj.username);

    //     user.textContent = `${obj.username}:`;
    //     comment.textContent = `${obj.text}`;
    //     commentDeleteButton.textContent = 'X'
    //     //console.log(comment);
    //     user.style.display = 'inline-block';
    //     comment.style.display = 'inline-block';
    //     commentLine.appendChild(user);
    //     commentLine.appendChild(comment);
    //     commentLine.appendChild(commentDeleteButton);
    //     allComments.appendChild(commentLine);

    //     //commentListSection.appendChild('comment');
    // });

    // commetsContainer.appendChild(allComments);

}


//UNIX timestamp conversion to user friendly date
const unixToDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
