const PostModel = require('./postModel');

const addPost = (req, res) => {
    let data = req.body;
    let newPost = new PostModel();

    newPost.imageURL = data.imageURL;
    newPost.caption = data.caption;
    newPost.user = req.user._id;

    newPost.save().then((createdPost) => {
        console.log(createdPost);
        res.json(createdPost)
    }).catch((err) => {
        res.status(400).json(err);
    })
}

const getAllLists = async (req, res) => {
    try {
        let toDoList = await ToDoList.find({
            user: req.user._id
        })
        res.json(toDoList)
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
    getAllLists,
    getSingleList,
    findOneAndRemove,
    findOneAndUpdate
}