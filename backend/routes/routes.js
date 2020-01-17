const router = require("express").Router();
const userController = require('../user/userController.js');
const postController = require('../postList/postController.js');
const commentController = require('../commentList/commentController.js')
const middleware = require('../middleware/middleware.js');

router.get('/', (req, res) => {
    res.json('API STATUS: working');
})

//user routes
router.post('/user/register', userController.register);
//router.get('/user/getAllUsers', userController.getAll);
//router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.post('/user/login', userController.login);
router.get('/user/logout', middleware.authenticate, userController.logout);

//postList routes
router.post('/postList/addPost', middleware.authenticate, postController.addPost);
router.get('/postList/getAllPosts', middleware.authenticate, postController.getAllPosts);
// router.get('/toDoList/getSingleList/:id', toDoListController.getSingleList);
// router.delete('/toDoList/findOneAndRemove/:id', toDoListController.findOneAndRemove);
// router.patch('/toDoList/findOneAndUpdate/:id', toDoListController.findOneAndUpdate);

//CommentList routes
router.post('/commentList/addComment', middleware.authenticate, commentController.addComment);



module.exports = router;