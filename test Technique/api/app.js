const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

//init the app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/test-technique');

mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);


app.listen(process.env.port || 4000, () => {
    console.log('ready for accept request');
});