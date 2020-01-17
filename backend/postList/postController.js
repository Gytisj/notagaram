const PostModel = require('./postModel');
const date = new Date();


const addPost = (req, res) => {
    const data = req.body;
    const newPost = new PostModel();

    //console.log(req.user)
    newPost.imageURL = data.imageURL;
    newPost.caption = data.caption;
    newPost.username = req.user.username
    newPost.userID = req.user._id;
    newPost.date = date.getTime();
    //console.log(req.user._id)

    newPost.save().then((createdPost) => {
        console.log(createdPost);
        res.json(createdPost)
    }).catch((err) => {
        console.log(err);
        res.status(400).json(err);
    })
}

//post list by user ID
const getAllPosts = async (req, res) => {
    try {
        const postList = await PostModel.find({
            userID: req.user._id
        })
        res.json(postList)

    } catch (err) {
        res.status(400).json(err);
    }

}

//unused
const getSingleList = async (req, res) => {
    let id = req.params.id;
    try {
        let toDoList = await ToDoList.findById(id);
        toDoList ? res.json(toDoList) : res.json('No such list');
    } catch (err) {
        res.status(400).json(err);
    }

}

const findOneAndRemove = async (req, res) => {
    let id = req.params.id;
    try {
        let toDoList = await ToDoList.findByIdAndRemove(id);
        res.json(toDoList);
    } catch (err) {
        res.status(400).json(err);
    }
}

const findOneAndUpdate = async (req, res) => {
    let id = req.params.id;
    try {
        let toDoList = await ToDoList.findById(id, (err, obj) => {
            obj.completed = !obj.completed;
            obj.save();
        });
        toDoList ? res.json(toDoList) : res.json('No such list');
    } catch (err) {
        res.status(400).json(err);
    }
}


module.exports = {
    addPost,
    getAllPosts,
    // getSingleList,
    // findOneAndRemove,
    // findOneAndUpdate
}