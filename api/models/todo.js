const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Please provide a name"
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
