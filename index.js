/*
    Made by  - Muhammad Ismail

    Github   - https://github.com/ismailfaridi
    Linkedin - https://www.linkedin.com/in/ismailfaridi/
    Website  - https://ismailfaridi.com/
    Email    - contact@ismailfaridi.com
*/

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs"); // set 'ejs' as view engine

const path = require("path"); // views folder path
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public"))); // serve static files (like HTML, CSS, JS, images) from public folder

app.use(express.urlencoded({ extended: true })); // handel POST request urlencoded

const methodOverride = require("method-override"); // request method override for uncompatible requests
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require("uuid");

let tweets = [
  // not constant
  {
    id: uuidv4(),
    username: "ismailfaridi",
    title: "Become a better enginner",
    content: "In this post we gonna look how to become good enginner.",
  },
  {
    id: uuidv4(),
    username: "naumanfaridi",
    title: "Leadership Skills",
    content: "Learn more about leadership skills.",
  },
  {
    id: uuidv4(),
    username: "jeff",
    title: "How to high charge customer",
    content: "Hey, I am jeff bezoz. I want to know...",
  },
];

app.listen(port, () => {
  console.log("Listening...");
});

/*
REST API STRUCTURE:
/           VIEW ALL POSTS
/:id        VIEW SPECIFIC POST
/:id/edit   EDIT SPECIFIC POST
/:id

/new        CREATE NEW POST
DELETE
*/

// NEW TWEET
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/", (req, res) => {
  let { username, title, content } = req.body;
  let id = uuidv4();

  tweets.push({ id, username, title, content });
  res.redirect("/");
});

// VIEW ALL POSTS
app.get("/", (req, res) => {
  res.render("twitter.ejs", { tweets });
});

// VIEW SPECIFIC POST
app.get("/:id", (req, res) => {
  const { id } = req.params;
  try {
    const tweet = tweets.find((tw) => id === tw.id);
    res.render("tweet.ejs", { tweet });
  } catch {
    res.send("Some error occurred while fetching the tweet.");
  }
});

// EDIT SPECIFIC TWEET
app.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((tw) => id === tw.id);
  res.render("edit.ejs", { tweet });
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const tweet = tweets.find((tw) => id === tw.id);

  tweet.content = req.body.content;
  tweet.title = req.body.title;
  res.redirect("/");
});

// DELETE TWEET
app.delete("/:id", (req, res) => {
  let { id } = req.params;
  tweets = tweets.filter((tw) => id !== tw.id);
  res.redirect("/");
});