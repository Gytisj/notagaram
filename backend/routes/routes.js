const router = require("express").Router();
const userController = require('../user/userController.js');
const postController = require('../postList/postController.js');
const feedController = require('../feedList/feedController.js');
const commentController = require('../commentList/commentController.js')
const middleware = require('../middleware/middleware.js');
const multer = require('multer');

router.get('/', (req, res) => {
    res.json('API STATUS: working');
})

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage
})

//user routes
router.post('/user/register', userController.register);
//router.get('/user/getAllUsers', userController.getAll);
//router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.get('/user/getFullName', middleware.authenticate, userController.getLoggedUserInfo);
router.post('/user/login', userController.login);
router.get('/user/logout', middleware.authenticate, userController.logout);
router.patch('/user/addProfileImage', upload.single('picture'), middleware.authenticate, userController.addProfileImage);
router.get('/user/getAllPostsById', middleware.authenticate, userController.getAllPostsById);

//Image upload router
router.post('/postList/addPost', upload.single('picture'), middleware.authenticate, postController.addPost);
router.get('/postList/getAllPosts', middleware.authenticate, postController.getAllPosts);
router.get('/postList/getAllFollowerPosts/:pageNumber', middleware.authenticate, feedController.getAllFollowingPosts);

//Feed routes
router.get('/feedList/getAllPosts/:pageNumber', middleware.authenticate, feedController.getAllPosts);


//toDoList routes
// router.post('/postList/addPost', middleware.authenticate, postController.addPost);
// router.get('/toDoList/getAllLists', middleware.authenticate, toDoListController.getAllLists);

// router.get('/toDoList/getSingleList/:id', toDoListController.getSingleList);
// router.delete('/toDoList/findOneAndRemove/:id', toDoListController.findOneAndRemove);
// router.patch('/toDoList/findOneAndUpdate/:id', toDoListController.findOneAndUpdate);

//CommentList routes
router.post('/commentList/addComment', middleware.authenticate, commentController.addComment);
router.get('/commentList/getComment/:id', commentController.getPostComments);


module.exports = router;