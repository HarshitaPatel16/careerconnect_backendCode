const express = require("express");
const router = express.Router();
const RequestsController = require("../controller/requestController");

// Create a new record
router.post("/createRequests", RequestsController.createRequests);

// Read all records
router.get("/readAllRequests", RequestsController.readAllRequests);

// Read a single record
router.post("/readOneRequests", RequestsController.readOneRequests);

// Update a record
router.post("/updateRequests", RequestsController.updateRequests);

// Delete a record
router.post("/deleteRequests", RequestsController.deleteRequests);

module.exports = router;
