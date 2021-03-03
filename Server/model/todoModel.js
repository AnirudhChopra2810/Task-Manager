const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  Todo: String,
  Key: String,
  Date: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
