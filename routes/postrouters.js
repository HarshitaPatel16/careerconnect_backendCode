const express = require("express");
const router = express.Router();
const PostController = require("../controller/postController");

// Create a new record
router.post("/createPost", PostController.createPost);

// Read all records
router.get("/readAllPost", PostController.readAllPost);

// Read a single record
router.post("/readOnePost", PostController.readOnePost);

// Update a record
router.post("/updatePost", PostController.updatePost);

// Delete a record
router.post("/deletePost", PostController.deletePost);

module.exports = router;
