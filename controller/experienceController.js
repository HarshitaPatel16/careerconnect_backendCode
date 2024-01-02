const Experience = require("../model/experiencemodel");

// Create a new Experience
exports.createExperience = (req, res) => {
  const newRecord = new Experience(req.body);

  Experience.create(newRecord, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error creating Experience",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Experience created successfully",
        id: data.id,
      });
    }
  });
};

// Read all records
exports.readAllExperience = (req, res) => {
  Experience.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Experience List",
        data: data,
      });
    }
  });
};

// Read a single Experience
exports.readOneExperience = (req, res) => {
  const user_id = req.body.user_id;

  Experience.getById(user_id, (err, data) => {
    if (err) {
      if (err.message === "Experience not found") {
        res.status(404).json({
          message: "Experience not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Experience",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Experience
exports.updateExperience = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Experience(req.body);

  Experience.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Experience not found") {
        res.status(404).json({
          message: "Experience not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Experience",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Experience updated successfully",
      });
    }
  });
};

// Delete a Experience
exports.deleteExperience = (req, res) => {
  const experience_id = req.body.experience_id;

  Experience.deleteById(experience_id, (err, data) => {
    if (err) {
      if (err.message === "Experience not found") {
        res.status(404).json({
          message: "Experience not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Experience",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Experience deleted successfully",
      });
    }
  });
};
