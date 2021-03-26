// Dependencies
// ===================================================================
var express = require("express");

 
var app = express();
var PORT = 3000;

var path = require("path");


 
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));
 
// parse application/json
app.use(express.json());
 





//Data
//=====================================================================
var characters = [
       {
        routeName: "yoda",
        name: "Yoda",
        role: "jedi Master",
        age: 900,
        forcePoints: 2000
       },
       {
        routeName: "darthmaul",
         name: "Darth Maul",
         role: "Sith Lord",
         age: 200,
         forcePoints: 1200 
        },
        {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi Knight",
        age: 60,
        forcePoints: 1350
        }
    ];



// Create one more data entry for the character Obi Wan Kenobi.
// Enter any values you like for the parameters following the same format as the Yoda and Darth maul character
//

// YOUR CODE GOES HERE  

//

// Routes
// ===========================================================================
app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req,res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req,res) {
    res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all characters
app.get("/api/characters", function(req, res) {
    return res.json(characters);
});

app.get("/api/:characters?", function(req,res) {

    var chosen = req.params.characters;

    console.log(chosen);
    
    if(chosen) {

    for (var i=0; i<characters.length; i++) {
      if (chosen===characters[i].routeName) {
          res.json(characters[i]);
          return;
      }
    }

    res.send("No character found");

    } else {
        res.json(characters);
    }  
});

app.post("/api/new", function (req, res) {
    var newCharacter = req.body;
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
})


// Listener
// ================================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
