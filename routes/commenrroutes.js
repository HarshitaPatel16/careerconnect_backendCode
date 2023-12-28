const express = require("express");
const router = express.Router();
const CommentController = require("../controller/commentController");

// Create a new record
router.post("/createComment", CommentController.createComment);

// Read all records
router.get("/readAllComment", CommentController.readAllComment);

// Read a single record
router.post("/readOneComment", CommentController.readOneComment);

// Update a record
router.post("/updateComment", CommentController.updateComment);

// Delete a record
router.post("/deleteComment", CommentController.deleteComment);

module.exports = router;
