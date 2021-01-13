//Acces la fisierul "db.js" ce initieaza conexiunea cu baza de date
require("./models/db");

//Importare module
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");

//Importare functii de routing Express
const repairController = require("./controllers/repairController");
//Importare functie ce permite encodarea URL-ului atunci cand se face request-uri HTTP
const { urlencoded } = require("body-parser");

//Initierea aplicatiei Express
var app = express();

//Encodarea URL-ului atunci cand se face un request "POST"
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

//
app.use(bodyparser.json());

//Declararea locatiei unde se afla fisierele template pentru Handlebars
app.set("views", path.join(__dirname, "/views/"));
//Initializarea template engine-ului Handlebars
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
//Setarea engine-ului ca Hbs
app.set("view engine", "hbs");

//Functie ce asculta portul 3000 pentru a verifica daca aplicatia Express functioneaza corect
app.listen(3000, () => {
  console.log("Express app started on port: 3000");
});

//Importarea functiilor de routing pentru actiunile CRUD ale aplicatiei
app.use("/repair", repairController);
