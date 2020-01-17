const createComment = () => {

    const token = localStorage.getItem('x-auth');
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
            console.log(header)
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