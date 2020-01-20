const PostModel = require('./postModel.js');

const addPost = async (req, res) => {

    let data = req.file;
    let body = req.body;

    let newPost = new PostModel();

    newPost.imageURL = data.path;
    newPost.caption = body.caption;
    newPost.user = req.user._id;

    newPost.save()
    .then((createdPost) => {
        res.status(200).json(createdPost);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
}

const getAllPosts = async (req, res) => {
    try {
        let postList = await PostList.find({
            user: req.user._id
        })
        res.json(postList)
        console.log(res);
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
    getSingleList,
    findOneAndRemove,
    findOneAndUpdate
}