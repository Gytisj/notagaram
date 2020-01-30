
const PostModel = require('./postModel');
const date = new Date();

const addPost = (req, res) => {

    const imgFile = req.file;
    const data = req.body;
    const newPost = new PostModel();

    //console.log(req.user)
    newPost.imageURL = `http://localhost:2000/${imgFile.path}`;
    newPost.caption = data.caption;
    newPost.username = req.user.username;
    newPost.userID = req.user._id;

    newPost.date = date.getTime();
    // newPost.latestComments = []

    newPost.save()
      .then((createdPost) => {
        //console.log(createdPost);

        res.status(200).json(createdPost);
    }).catch((err) => {
        console.log(err);
        res.status(400).json(err);

    })
    .catch(err => {
      res.status(400).json(err);
    });
};

const addLike = async (req, res) => {
  const user = req.user._id;
  const objID = req.params.id;
  try {
    let addLike = await PostModel.findById(objID, (err, obj) => {
      obj.likes = user;
      obj.save();
    });
    addLike ? res.json(addLike) : res.json("No such post");
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllLikes = async (req, res) => {
  try {
    const likeList = await PostModel.find()
      .select("likes")
      .populate("likes");
    res.json(likeList);
  } catch (err) {
    res.status(400).json(err);
  }
};

//post list by user ID
const getAllPosts = async (req, res) => {
    

    try {
        const postList = await PostModel.find({
            userID: req.user._id
        }).populate({path:'latestComments',
            // options: { 
            //     limit: 2,
            //     sort: { _id : -1}
            // }

        })

        res.json(postList)


    } catch (err) {
        res.status(400).json(err);
    }

}


const getAllPostsById = async (req, res) => {

    let id = req.params.id;

    try {
        const postList = await PostModel.find({
            userID: id
        })
        res.json(postList.length);


    } catch (err) {
        res.status(400).json(err);
    }

}

//unused
const getSingleList = async (req, res) => {
  let id = req.params.id;
  try {
    let toDoList = await ToDoList.findById(id);
    toDoList ? res.json(toDoList) : res.json("No such list");
  } catch (err) {
    res.status(400).json(err);
  }
};

const findOneAndRemove = async (req, res) => {
  let id = req.params.id;
  try {
    let toDoList = await ToDoList.findByIdAndRemove(id);
    res.json(toDoList);
  } catch (err) {
    res.status(400).json(err);
  }
};

const findOneAndUpdate = async (req, res) => {
  let id = req.params.id;
  try {
    let toDoList = await ToDoList.findById(id, (err, obj) => {
      obj.completed = !obj.completed;
      obj.save();
    });
    toDoList ? res.json(toDoList) : res.json("No such list");
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {

    addPost,
    getAllPosts,
    getAllPostsById,
    addLike,
    getAllLikes

    // getSingleList,
    // findOneAndRemove,
    // findOneAndUpdate

}

