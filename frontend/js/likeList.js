// const checkifLoggedIn = () => {
//   const token = localStorage.getItem("x-auth");

//   if (!token) {
//     alert("Redirecting to login");
//     window.location.href = "/login.html";
//   } else {
//     //getItems();
//   }
// };

// const createLike = () => {
//   let token = localStorage.getItem("x-auth");
//   // let image = document.getElementById('newPostImage');
//   // let caption = document.getElementById('newPostCaption').value

//   let data = {
//       postID:
//   }
//   // data.append('picture', image.files[0]);
//   // data.append('caption', caption);

//   fetch("http://localhost:2000/api/v1/likeList/addLike", {
//     method: "POST",
//     body: data,
//     headers: {
//       "x-auth": token
//     }
//   })
//     .then(header => {
//       console.log(header);
//       if (!header.ok) {
//         throw Error(header);
//       }
//       return header;
//     })
//     .then(response => {
//       alert("Item added");

//       getAllLikes();
//       //console.log(response)
//       // alert('Item added');
//       // window.location.href = '/index.html'
//       // getItems();
//     })
//     .catch(e => {
//       console.log(e);
//       alert("Item failed");
//     });
// };

// const getAllLikes = () => {
//     console.log('GETING LIKES');
//     const token = localStorage.getItem('x-auth');

//     fetch('http://localhost:2000/api/v1/likeList/getAllLikes', {
//             method: 'GET',
//             headers: {
//                 'x-auth': token
//             }
//         })
//         .then(header => {
//             if (!header.ok) {
//                 throw Error(header)
//             }

//             return header.json();
//         })
//         .then(response => {

//             console.log(response);
//             renderAllLikes(response);
//         })
//         .catch(e => {
//             console.log(e)
//         })
// }

// const renderAllLikes = (postArr) => {

// postArr.forEach(obj => {

// })
// }
