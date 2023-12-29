const express = require("express");
const router = express.Router();
const ConnectionsController = require("../controller/connectionsControllers");

// Create a new record
router.post("/createConnections", ConnectionsController.createConnections);

// Read all records
router.get("/readAllConnections", ConnectionsController.readAllConnections);

// Read a single record
router.post("/readOneConnections", ConnectionsController.readOneConnections);

// Update a record
router.post("/updateConnections", ConnectionsController.updateConnections);

// Delete a record
router.post("/deleteConnections", ConnectionsController.deleteConnections);

module.exports = router;
