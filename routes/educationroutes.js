const express = require("express");
const router = express.Router();
const EducationController = require("../controller/educationController");

// Create a new record
router.post("/createEducation", EducationController.createEducation);

// Read all records
router.get("/readAllEducation", EducationController.readAllEducation);

// Read a single record
router.post("/readOneEducation", EducationController.readOneEducation);

// Update a record
router.post("/updateEducation", EducationController.updateEducation);

// Delete a record
router.post("/deleteEducation", EducationController.deleteEducation);

module.exports = router;
