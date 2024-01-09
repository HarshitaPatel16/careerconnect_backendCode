const express = require("express");
const router = express.Router();
const EducationController = require("../controller/educationController");

// Create a new record
router.post("/createEducation", EducationController.createEducations);

// Read all records
router.get("/readAllEducation", EducationController.readAllEducations);

// Read a single record
router.post("/readOneEducation", EducationController.readOneEducations);

// Update a record
router.post("/updateEducation", EducationController.updateEducations);

// Delete a record
router.post("/deleteEducation", EducationController.deleteEducations);

module.exports = router;
