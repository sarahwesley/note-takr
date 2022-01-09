// npm dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");

// initalize Express app
const app = express();
// set PORT , using port 3001 because we used it in the modules
const PORT = process.env.PORT || 3001;

// data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// creates route for notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// creates route to return saved notes from db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// creates route to main, index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// adds new notes to db.json file, returns new note to user
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLength = (noteList.length).toString();

    newNote.id = noteLength;

    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// to do if possible: delete note 
// tried this code block, broke note saving function
// app.delete("/api/notes/:id", (req, res) => {
//     let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     let noteID = (req.params.id).toString();

//     noteList = noteList.filter(selected => {
//         return selected.id != noteID;
//     });

//     fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
//     res.json(noteList);
// });


// app listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});