// Backend Application for Final Project
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;


const firebaseConfig ={
  apiKey: "AIzaSyDc0y5qB7f4wC74mnVIjKpRz5IxRpZXzXs",
  authDomain: "dw-final-project-65786.firebaseapp.com",
  projectId: "dw-final-project-65786",
  storageBucket: "dw-final-project-65786.appspot.com",
  messagingSenderId: "728560297146",
  appId: "1:728560297146:web:80083163520b65bbc9ce83"
};

const firebase =require("firebase");
firebase.initializeApp(firebaseConfig);

const indexRoute = require("./routes/index.js");
const postRoute = require("./routes/post.js");
const createRoute = require("./routes/createBlogpost.js");


// app.use("/", indexRoute);
// app.use("/post", postRoute);
// app.use("/create", createRoute);

// add firebase here like exercise 4 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", indexRoute);
app.use("/post", postRoute);
app.use("/create", createRoute);
// add more routes here for getting and submitting... like exercise 4

app.listen(port, () => console.log(`Backend is running at port:${port}`));