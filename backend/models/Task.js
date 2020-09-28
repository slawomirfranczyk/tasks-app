const mongoose = require('mongoose');
const { replaceMultipleSpaces } = require('./../utils');

const Task = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        set: replaceMultipleSpaces
    },
    description: {
        type: String,
        minlength: 1,
        set: replaceMultipleSpaces
    },
    dateEnd: {
        type: Date,
        set: val => new Date(val)
    },
});

module.exports = mongoose.model('Task', Task);