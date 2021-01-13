//Importare Express
const express = require("express");

//Atribuirea variabilei router functiile de routing din Express
var router = express.Router();

//Importare Mongoose si declararea variabilei ce v-a completa proprietatiile din DB schema Repair
const mongoose = require("mongoose");
const Repair = mongoose.model("Repair");

//Exceptie pentru a repara alertele cu functii deprecated
mongoose.set("useFindAndModify", false);

//Initializarea template-ului "addOrEdit" ce contine form
router.get("/", (req, res) => {
  res.render("repair/addOrEdit", {
    viewTitle: "Insert Repair",
  });
});

//Functia Create - POST HTTP Request
router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

//Functie ce creeaza o conexiuni intre field-urile din form-ul HTML si field-urile din Schema Repair
function insertRecord(req, res) {
  var repair = new Repair();
  repair.clientName = req.body.clientName;
  repair.carModel = req.body.carModel;
  repair.plateNumber = req.body.plateNumber;
  repair.mechanicName = req.body.mechanicName;
  repair.workedHours = req.body.workedHours;
  repair.save((err, doc) => {
    if (!err) res.redirect("repair/list");
    else {
      console.log("Error during record insertion:" + err);
    }
  });
}

//Functia Update
function updateRecord(req, res) {
  Repair.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("repair/list");
      } else console.log("Error: " + err);
    }
  );
}

//Functia Read - GET HHTP Request
router.get("/list", (req, res) => {
  Repair.find((err, docs) => {
    if (!err) {
      res.render("repair/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving repair list: " + err);
    }
  }).lean();
});

//Functia Update - POST HTTP Request
router.get("/:id", (req, res) => {
  Repair.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("repair/addOrEdit", {
        viewTitle: "Update Repair",
        repair: doc,
      });
    }
  }).lean();
});

//Functia Delete - DELETE HTTP Request
router.get("/delete/:id", (req, res) => {
  Repair.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/repair/list");
    } else {
      console.log("Error during delete: " + err);
    }
  }).lean();
});

//Expunerea variabilei router ca modul
module.exports = router;
