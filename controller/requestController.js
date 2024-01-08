const Requests = require("../model/requestmodel");

// Create a new Requests

// Create a new Requests (including logic for sending connection requests)
exports.createRequests = (req, res) => {
  const { user_id_From, user_id_To } = req.body;

  // Check if the connection request already exists
  Requests.getByUserIds(user_id_From, user_id_To, (err, existingRequest) => {
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
      const newRecord = new Requests(req.body);

      Requests.create(newRecord, (err, data) => {
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
};

// Read all records
exports.readAllRequests = (req, res) => {
  Requests.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Requests List",
        data: data,
      });
    }
  });
};

// Read a single Requests
exports.readOneRequests = (req, res) => {
  const id = req.body.id;

  Requests.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Requests not found") {
        res.status(404).json({
          message: "Requests not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Requests",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Requests
exports.updateRequests = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Requests(req.body);

  Requests.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Requests not found") {
        res.status(404).json({
          message: "Requests not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Requests",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Requests updated successfully",
      });
    }
  });
};

// Delete a Requests
exports.deleteRequests = (req, res) => {
  const id = req.body.id;

  Requests.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Requests not found") {
        res.status(404).json({
          message: "Requests not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Requests",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Requests deleted successfully",
      });
    }
  });
};
