//Importare Mongoose
const mongoose = require("mongoose");

//Declarere proprietati obiect MongoDB
var repairSchema = new mongoose.Schema({
  clientName: {
    type: String,
  },
  carModel: {
    type: String,
  },
  plateNumber: {
    type: String,
  },
  mechanicName: {
    type: String,
  },
  workedHours: {
    type: String,
  },
});

//Initiere DB
mongoose.model("Repair", repairSchema);
