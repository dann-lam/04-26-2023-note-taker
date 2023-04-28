//---- Big list of Todos
//Import Express
let express = require('express');
//import FS
let fs = require('fs');
const path = require('path');
let notesData = require('./db/db.json');
//Do we even need this? POssible deletion.


let app = express();
const PORT = 3000;

//Make public content available.
app.use(express.static('public'));
//middleware to auto-parse JSON, very nifty!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/notes.html'))
// })

app.get('/api/notes', (req, res) => {
    res.json(notesData);
})
//GET /api/notes/ Incoming: JSON
app.post('/api/notes', (req, res) => {
    let {title, text} = (req.body);
    console.log(title);
    fs.readFile('./db/db.json', (err, data) => {
        if(err){
            console.log(err)
        } else if (data) {
            let parsedNotes = JSON.parse(data)
            parsedNotes.push(req.body);
            console.log(parsedNotes);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!'))
        };
    })

    let newNote = fs.readFileSync("./db/db.json", "utf-8");
    let parsednewNotes = JSON.parse(newNote);

    res.redirect("/");

    // res.json(JSON.parse(newNote));
});
//POST /api/notes/ Incoming: JSON,
    // {
    //     "title":"Test Title",
    //     "text":"Test text"
    // }
//DELETE /api/notes/:id (OPTIONAL)


//Listen for port @ 3k.
app.listen(PORT, () =>
  console.log(`Note Taker is listening at http://localhost:${PORT}`)
);


//TO DO LATER

//Read getting started LMAO

//Modularize our commands?
//Keep it simple for now, modularize it later.
//Need a way to generate IDs for our posts for deletion.

//BIG AREA OF CONCERN
//On public/assets/JS I change the window.location.pathname === "/notes" to "/notes.html" and that seems to work.
//Am I allowed to do that??
