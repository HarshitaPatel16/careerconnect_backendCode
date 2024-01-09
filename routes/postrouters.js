const express = require("express");
const router = express.Router();
const PostController = require("../controller/postController");
const Post = require("../model/postmodel");

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

// sum post
router.post("/readAllSumPOST", PostController.readAllSumPOST);

module.exports = router;
