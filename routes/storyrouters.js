const express = require("express");
const router = express.Router();
const StoryController = require("../controller/storyController");

// Create a new record
router.post("/createStory", StoryController.createStory);

// Read all records
router.get("/readAllStory", StoryController.readAllStory);

// Read a single record
router.post("/readOneStory", StoryController.readOneStory);

// Update a record
router.post("/updateStory", StoryController.updateStory);

// Delete a record
router.post("/deleteStory", StoryController.deleteStory);

module.exports = router;
