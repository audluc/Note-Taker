const express = require("express")
const fs = require("fs")
const db = require("./db/db.json")
const path = require("path")
const PORT = 3000
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
//api
app.get("/api/notes", (req, res) =>{
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err) throw err
        res.json(JSON.parse(data))
    })
})
app.delete("/api/notes/:id", (req, res) =>{
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err) throw err
        let file = JSON.parse(data)
        let newNotes = file.filter(note => note.id !=req.params.id)
        fs.writeFile("db/db.json", JSON.stringify(newNotes), (err, data) => {
            if(err) throw err
            res.end(data)   
            })
    })
})
app.post("/api/notes", (req, res) =>{
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err) throw err
        let file = JSON.parse(data)
        const newNote = {
            id: db.length +1,
            title: req.body.title, 
            text: req.body.text
        }
        file.push(newNote)
        fs.writeFile("db/db.json", JSON.stringify(file), (err, data) => {
        if(err) throw err
        res.end(data)   
        })
    })
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
} )
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  