// show one blog post

const express = require("express");
const router = express.Router();

const firebase = require("firebase");

const db = firebase.firestore();

const blogposts = db.collection("blogposts");

router.get('/', (req, res) => res.send("No ID provided"));

router.get("/:id", (req, res) => {

    const queryId = req.params.id;

    blogposts
        .doc(queryId)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                const data = doc.data();
                console.log(data);
                return res.send(data);
            } else {
                
                return res.send("No document exists");
            }

        })
        .catch(function (error) {
            return res.send(error);
        });
});

module.exports = router;