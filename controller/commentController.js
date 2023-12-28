const Comment = require("../model/commentmodel");

// Create a new Comment
exports.createComment = (req, res) => {
  const newRecord = new Comment(req.body);

  Comment.create(newRecord, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error creating Comment",
        error: err,
      });
    } else {
      res.status(201).json({
        message: "Comment created successfully",
        id: data.id,
      });
    }
  });
};

// Read all records
exports.readAllComment = (req, res) => {
  Comment.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Comment List",
        data: data,
      });
    }
  });
};

// Read a single Comment
exports.readOneComment = (req, res) => {
  const id = req.body.id;

  Comment.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Comment not found") {
        res.status(404).json({
          message: "Comment not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Comment",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Comment
exports.updateComment = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Comment(req.body);

  Comment.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Comment not found") {
        res.status(404).json({
          message: "Comment not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Comment",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Comment updated successfully",
      });
    }
  });
};

// Delete a Comment
exports.deleteComment = (req, res) => {
  const id = req.body.id;

  Comment.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Comment not found") {
        res.status(404).json({
          message: "Comment not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Comment",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Comment deleted successfully",
      });
    }
  });
};
