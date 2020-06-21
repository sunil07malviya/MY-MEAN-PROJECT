const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

//?retryWrites=true&w=majority
const connectedUrl ="mongodb://sunil:" + process.env.MONGO_ATLAS_PW + "@cluster0-shard-00-00.scb3m.mongodb.net:27017,cluster0-shard-00-01.scb3m.mongodb.net:27017,cluster0-shard-00-02.scb3m.mongodb.net:27017/node-angular?ssl=true&replicaSet=atlas-xeta8y-shard-0&authSource=admin&retryWrites=true&w=majority"
// " mongodb+srv://sunil:" + process.env.MONGO_ATLAS_PW + " @cluster0-scb3m.mongodb.net/node-angular";
// mongodb+srv://sunil:yrePdZzdZUcZ9sUs>@cluster0.scb3m.mongodb.net/<dbname>?retryWrites=true&w=majority


const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
useCreateIndex: true
}

mongoose.connect(connectedUrl, connectConfig)
.then(() => {
  console.log("Connected to DataBase");
})
.catch((error) => {
  console.log(error);
  console.log('Connection Failed...');
});


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/images', express.static(path.join('./backend/images')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
