const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    walkCertainAmountOfMetters: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

let toDoList = mongoose.model('ToDoList', toDoListSchema);

module.exports = toDoList;