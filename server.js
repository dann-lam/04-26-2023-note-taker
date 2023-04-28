//instantiate our requirements
const express = require("express");
const PORT = 3000;
const fs = require("fs");
const { v4: uuidv4 } = require("uuid")
const path = require("path");
const app = express()

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }))
app.use(express.json());

//Go to notes if you request notes.
app.get('/notes', (req, res) => {

    res.sendFile(path.join(__dirname, 'public/notes.html'))

});


//When thjere is a call to get api/notes, we read the file from JSON, and then parse the adta inside of it.
app.get('/api/notes', (req, res) => {
    var result;

    fs.readFile("./db/db.json", "utf-8", function(err, data){
        if (err) {
            console.error(err)
        } else {
            // console.log("Result is:")
            // console.log(data);
            result = JSON.parse(data);
            //We must return a promise here or it will not proceed.
            res.json(result);
        }
    })
    // console.log("end of api notes get");

    }
    );


//Handles receiving post commands.
app.post('/api/notes', (req, res) => {

    const { title, text} = req.body;

    let savedNote;

    if (title && text) {
        savedNote = {
            title,
            text,
            id: uuidv4()
        }
    };

    //Read our saved json list.
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const message = JSON.parse(data);
            //Push our note into the message.
            message.push(savedNote);
            // console.log(message);
            fs.writeFile('./db/db.json', JSON.stringify(message, null, 4),
                (err) =>
                    {
                        if(err) {
                            console.error(err)
                        } else {
                            console.log("Successfully wrote file.");
                        }
                    }
                );
            }
        }
    );
    //Go back
    res.status(301).redirect("/");
    }
)



//throw user back to start if they go somewhere weird
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


//listen for port
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
