const Like = require("../model/likemodel");

// Create a new Like
exports.createLike = (req, res) => {
  const newRecord = new Like(req.body);

  Like.create(newRecord, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error creating Like",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Like created successfully",
        id: data.id,
      });
    }
  });
};

// Read all records
exports.readAllLike = (req, res) => {
  Like.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Like List",
        data: data,
      });
    }
  });
};

// Read a single Like
exports.readOneLike = (req, res) => {
  const id = req.body.id;

  Like.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Like not found") {
        res.status(404).json({
          message: "Like not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Like",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Like
exports.updateLike = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Like(req.body);

  Like.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Like not found") {
        res.status(404).json({
          message: "Like not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Like",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Like updated successfully",
      });
    }
  });
};

// Delete a Like
exports.deleteLike = (req, res) => {
  const id = req.body.id;

  Like.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Like not found") {
        res.status(404).json({
          message: "Like not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Like",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Like deleted successfully",
      });
    }
  });
};
