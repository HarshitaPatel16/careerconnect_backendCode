const Educations = require("../model/educationsmodel");

// Create a new Educations
exports.createEducations = (req, res) => {
  const newRecord = new Educations(req.body);

  Educations.create(newRecord, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error creating Educations",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Educations created successfully",
        id: data.id,
      });
    }
  });
};

// Read all records
exports.readAllEducations = (req, res) => {
  Educations.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Educations List",
        data: data,
      });
    }
  });
};

// Read a single Educations
exports.readOneEducations = (req, res) => {
  const user_id = req.body.user_id;

  Educations.getById(user_id, (err, data) => {
    if (err) {
      if (err.message === "Educations not found") {
        res.status(404).json({
          message: "Educations not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Educations",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Educations
exports.updateEducations = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Educations(req.body);

  Educations.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Educations not found") {
        res.status(404).json({
          message: "Educations not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Educations",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Educations updated successfully",
      });
    }
  });
};

// Delete a Educations
exports.deleteEducations = (req, res) => {
  const Educations_id = req.body.Educations_id;

  Educations.deleteById(Educations_id, (err, data) => {
    if (err) {
      if (err.message === "Educations not found") {
        res.status(404).json({
          message: "Educations not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Educations",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Educations deleted successfully",
      });
    }
  });
};
