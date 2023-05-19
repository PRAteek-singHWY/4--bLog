const express = require("express");
const ejs = require('ejs');
const app = express();
const mongooseConnectionString = require("./config"); // Importing the mongooseConnectionString from config.js
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// SCHEMA BLOG-1
const PostSchema = new mongoose.Schema({
    title: String,
    post: String
});
// Blog SCHEMA'S MODEL-1
const Post = mongoose.model("Post", PostSchema);

mongoose.connect(mongooseConnectionString.mongoURI); // Connecting to MongoDB using the mongoURI from the config

const demo_post = new Post({
    title: "Intro",
    post: "Welcome to DAiLy JoUrNAL! This is a platform for you to express your thoughts and share the insights you've gained from the internet. Whether it's your personal experiences or your awareness on a certain topic, feel free to share your ideas and opinions "
});

const aboutContent = "Share your neitzenal Intel";
const contactContent = "contact SwY";

// Rest of your code...







app.get("/", (req, res) => {
    Post.find({}, {})
        .then((foundPost) => {
            if (foundPost.length === 0) {
                demo_post.save();
                res.redirect("/")
            }
            else {
                res.render("home", {
                    posts: foundPost
                })
            }
        })
})

app.get("/post/:POST_id", (req, res) => {
    const postId = req.params.POST_id;
    Post.findOne({ _id: postId })
        .then((FoundPost) => {
            if (!FoundPost) {
                ///post not exisiting
                console.log("No such Post");
                res.redirect("/")
            }
            else {
                //since post id existing now you can display it on new screen i.e single view scrren
                res.render("single_View_Post", {
                    titleSingle: FoundPost.title,
                    postSingle: FoundPost.post
                })
            }
        })
})


app.get("/compose", (req, res) => {
    res.render("compose")
})


let item1;  //title
let item2;  //post

app.post("/compose", (req, res) => {
    item1 = req.body.addTitle
    item2 = req.body.addPost
    const newPost = new Post({
        title: item1,
        post: item2
    })
    newPost.save();
    res.redirect("/")
})

app.get("/about", (req, res) => {
    res.render("about", {
        content: aboutContent
    })
})

app.get("/contact", (req, res) => {
    res.render("contact", {
        content: contactContent

    })
})

app.listen(3000, () => {
    console.log("Server running successfully on port 3000");
})






 