const router = require("express").Router();
const userController = require("../user/userController.js");
const postController = require("../postList/postController.js");
const commentController = require("../commentList/commentController.js");
const likeController = require("../likesList/likeController.js");
const middleware = require("../middleware/middleware.js");
const multer = require("multer");

router.get("/", (req, res) => {
  res.json("API STATUS: working");
});

// SET STORAGE
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({
  storage: storage
});

//user routes
router.post("/user/register", userController.register);
//router.get('/user/getAllUsers', userController.getAll);
//router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.post("/user/login", userController.login);
router.get("/user/logout", middleware.authenticate, userController.logout);

//Image upload router
router.post(
  "/postList/addPost",
  upload.single("picture"),
  middleware.authenticate,
  postController.addPost
);
router.get(
  "/postList/getAllPosts",
  middleware.authenticate,
  postController.getAllPosts
);

router.patch(
  "/postList/addLike/:id",
  middleware.authenticate,
  postController.addLike
);

router.get(
  "/postList/getUsername/:id",
  middleware.authenticate,
  userController.getUserName
);

router.get(
  "/postList/getAllLikes/:id",
  middleware.authenticate,
  postController.getAllLikes
);

//Image retrieve route
// router.get('/photos', (req, res) => {
//     db.collection('mycollection').find().toArray((err, result) => {

//         const imgArray = result.map(element => element._id);
//         console.log(imgArray);

//         if (err) return console.log(err)
//         res.send(imgArray)

//     })
// });

//toDoList routes
// router.post('/postList/addPost', middleware.authenticate, postController.addPost);
// router.get('/toDoList/getAllLists', middleware.authenticate, toDoListController.getAllLists);

// router.get('/toDoList/getSingleList/:id', toDoListController.getSingleList);
// router.delete('/toDoList/findOneAndRemove/:id', toDoListController.findOneAndRemove);
// router.patch('/toDoList/findOneAndUpdate/:id', toDoListController.findOneAndUpdate);

//CommentList routes
router.post(
  "/commentList/addComment",
  middleware.authenticate,
  commentController.addComment
);
router.get("/commentList/getComment/:id", commentController.getPostComments);

module.exports = router;
