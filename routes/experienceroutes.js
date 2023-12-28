const express = require("express");
const router = express.Router();
const ExperienceController = require("../controller/experienceController");

// Create a new record
router.post("/createExperience", ExperienceController.createExperience);

// Read all records
router.get("/readAllExperience", ExperienceController.readAllExperience);

// Read a single record
router.post("/readOneExperience", ExperienceController.readOneExperience);

// Update a record
router.post("/updateExperience", ExperienceController.updateExperience);

// Delete a record
router.post("/deleteExperience", ExperienceController.deleteExperience);

module.exports = router;
