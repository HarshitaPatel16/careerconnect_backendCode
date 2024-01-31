const Connections = require("../model/connectionmodel");

// Create a new Connections
exports.createConnections = (req, res) => {

  const { user_id_From, user_id_To } = req.body;

  // Check if the connection request already exists
  Connections.getById(user_id_From, user_id_To, (err, existingRequest) => {
    if (err) {
      res.status(500).json({
        message: "Error checking existing requests",
        error: err,
      });
    } else if (existingRequest) {
      res.status(400).json({
        message: "Connection request already exists",
      });
    } else {
      // Create a new connection request
      const newRecord = new Connections(req.body);

      Connections.create(newRecord, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error creating Requests",
            error: err,
          });
        } else {
          res.status(201).json({
            message: "Connection request sent successfully",
            id: data.id,
          });
        }
      });
    }
  });

  // Connections.create(newRecord, (err, data) => {
  //   if (err) {
  //     res.status(500).json({
  //       message: "Error creating Connections",
  //       error: err,
  //     });
  //   } else {
  //     res.status(201).json({
  //       message: "Connections created successfully",
  //       id: data.id,
  //     });
  //   }
  // });
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
  const user_id_From = req.body.user_id_From;

  Connections.getByIdUser(user_id_From, (err, data) => {
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
