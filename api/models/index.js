const mongoose = require('mongoose');

mongoose.set("debug", true);
// mongoose.connect("mongodb://localhost/api");
mongoose.connect(process.env.DATABASE);
console.log(process.env.DATABASE);

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
