const Connections = require("../model/connectionmodel");

// Create a new Connections
exports.createConnections = (req, res) => {
  const newRecord = new Connections(req.body);

  Connections.create(newRecord, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error creating Connections",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Connections created successfully",
        id: data.id,
      });
    }
  });
};

// Read all records
exports.readAllConnections = (req, res) => {
  Connections.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Connections List",
        data: data,
      });
    }
  });
};

// Read a single Connections
exports.readOneConnections = (req, res) => {
  const id = req.body.id;

  Connections.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Connections not found") {
        res.status(404).json({
          message: "Connections not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Connections",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Connections
exports.updateConnections = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Connections(req.body);

  Connections.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Connections not found") {
        res.status(404).json({
          message: "Connections not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Connections",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Connections updated successfully",
      });
    }
  });
};

// Delete a Connections
exports.deleteConnections = (req, res) => {
  const id = req.body.id;

  Connections.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Connections not found") {
        res.status(404).json({
          message: "Connections not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Connections",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Connections deleted successfully",
      });
    }
  });
};
