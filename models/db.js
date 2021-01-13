//Importare Mongoose
const mongoose = require("mongoose");

//Conectare la DB
mongoose.connect(
  "mongodb://localhost:27017/RepairDB",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("Connection with the database successful.");
    } else {
      console.log("Error in connection: " + err);
    }
  }
);

//Creare DB prin template-ul din fisierul "repairmodel.js"
require("./repairmodel");
