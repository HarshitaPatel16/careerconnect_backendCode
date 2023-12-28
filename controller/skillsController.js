const Skills = require("../model/skillsmodel");

// Create a new Skills
exports.createSkills = (req, res) => {
  const newRecord = new Skills(req.body);

  Skills.create(newRecord, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error creating Skills",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Skills created successfully",
        id: data.id,
      });
    }
  });
};

// Read all records
exports.readAllSkills = (req, res) => {
  Skills.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Skills List",
        data: data,
      });
    }
  });
};

// Read a single Skills
exports.readOneSkills = (req, res) => {
  const id = req.body.id;

  Skills.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Skills not found") {
        res.status(404).json({
          message: "Skills not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Skills",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Skills
exports.updateSkills = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Skills(req.body);

  Skills.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Skills not found") {
        res.status(404).json({
          message: "Skills not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Skills",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Skills updated successfully",
      });
    }
  });
};

// Delete a Skills
exports.deleteSkills = (req, res) => {
  const id = req.body.id;

  Skills.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Skills not found") {
        res.status(404).json({
          message: "Skills not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Skills",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Skills deleted successfully",
      });
    }
  });
};
