const ToDoList = require('./toDoListModel');

const addList = (req, res) => {
    let data = req.body;
    let toDoList = new ToDoList();
    toDoList.event = data.event;
    toDoList.walkCertainAmountOfMetters = data.walkCertainAmountOfMetters;
    toDoList.walkDog = data.walkDog;
    toDoList.user = req.user._id;

    toDoList.save().then((createdToDoList) => {
        res.json(createdToDoList)
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
    addList,
    getAllLists,
    getSingleList,
    findOneAndRemove,
    findOneAndUpdate
}