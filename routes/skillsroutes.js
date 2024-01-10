const express = require("express");
const router = express.Router();
const SkillsController = require("../controller/skillsController");

// Create a new record
router.post("/createSkills", SkillsController.createSkills);

// Read all records
router.get("/readAllSkills", SkillsController.readAllSkills);

// Read a single record
router.post("/readOneSkills", SkillsController.readOneSkills);

router.post("/readOneBySkillsId", SkillsController.readOneBySkillsId);


// Update a record
router.post("/updateSkills", SkillsController.updateSkills);

// Delete a record
router.post("/deleteSkills", SkillsController.deleteSkills);

module.exports = router;
