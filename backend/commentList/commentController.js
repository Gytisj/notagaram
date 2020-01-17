const CommentModel = require('./commentModel');

const addComment = (req, res) => {
    //console.log('end-------------------------', req.user)    

    const data = req.body;
    const newComment = new CommentModel();

    newComment.text = data.text;
    //newComment.commentOfText = data.caption;
    newComment.postId = 
    newComment.userId = req.user._id;
    //req.user._id;
    newComment.save().then((createdComment) => {
        //console.log(createdPost);
        res.json(createdComment)
    }).catch((err) => {
        res.status(400).json(err);
    })
}

const getAllComments = async (req, res) => {
    try {
        const commentModel = await CommentModel.find({
            user: req.user._id
        })
        res.json(toDoList)
    } catch (err) {
        res.status(400).json(err);
    }

}

// //unused
// const getSingleList = async (req, res) => {
//     let id = req.params.id;
//     try {
//         let toDoList = await ToDoList.findById(id);
//         toDoList ? res.json(toDoList) : res.json('No such list');
//     } catch (err) {
//         res.status(400).json(err);
//     }

// }

// const findOneAndRemove = async (req, res) => {
//     let id = req.params.id;
//     try {
//         let toDoList = await ToDoList.findByIdAndRemove(id);
//         res.json(toDoList);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

const editComment = async (req, res) => {
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

// const findOneAndUpdate = async (req, res) => {
//     let id = req.params.id;
//     try {
//         let toDoList = await ToDoList.findById(id, (err, obj) => {
//             obj.completed = !obj.completed;
//             obj.save();
//         });
//         toDoList ? res.json(toDoList) : res.json('No such list');
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }


module.exports = {
    addComment,
    //getAllComments,
    //editComment
}