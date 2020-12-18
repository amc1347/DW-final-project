// create blog post

const express = require("express");
const router = express.Router();

const firebase = require("firebase");

const db = firebase.firestore();

const blogposts = db.collection("blogposts");

const form = `
<form action="/create/submit">
    <input type="text" name ="title" placeholder="Title of Post" />
    <input type="text" name ="text" placeholder="Text of Post" />
    <input type="text" name ="author" placeholder="Author" />
    <button type="submit">Submit Post</button>
</form>
`;

router.get("/", (req, res) => res.send(form));

router.get("/submit", (req, res) => {
    const queryParams = req.query;

    const idFromTitle = queryParams.title.replace(/\s+/g, "_").toLowerCase();

    blogposts
        .doc(idFromTitle)
        .set(queryParams)
        .then(function(doc) {
            res.send('Succesful Submission');
        })
        .catch(function (error) {
            console.log('error', error);
            res.send("Failed Submission")
        });
});

module.exports = router;