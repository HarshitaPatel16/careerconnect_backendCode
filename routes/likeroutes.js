const express = require("express");
const router = express.Router();
const LikeController = require("../controller/likeController");

// Create a new record
router.post("/createLike", LikeController.createLike);

// Read all records
router.get("/readAllLike", LikeController.readAllLike);

// Read a single record
router.post("/readOneLike", LikeController.readOneLike);

// Update a record
router.post("/updateLike", LikeController.updateLike);

// Delete a record
router.post("/deleteLike", LikeController.deleteLike);

module.exports = router;
