// require('dotenv').config({ path: 'variables.env' });
// console.log(process.env.DATABASE);
require('dotenv').config({ path: 'variables.env' });

const express = require('express');
app = express();
bodyParser = require("body-parser");

const todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.send('Hello from the root!');
});

app.use("/api/todos", todoRoutes);

app.listen(3000, function(){
  console.log("App is running on port 3000");
});
