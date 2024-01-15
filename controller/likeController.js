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
  const post_id = req.body.post_id;

  Like.getById(post_id, (err, likeCount) => {
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
      res.status(200).json({ likeCount: likeCount });
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

exports.addOrUpdateLike = (req, res) => {
  const { user_id, post_id, is_liked } = req.body;

  // Check if the user has already liked the post
  Like.getByUserIdAndPostId(user_id, post_id, (err, existingLike) => {
    if (err) {
      return res.status(500).json({
        message: "Error checking existing like",
        error: err,
      });
    }

    // If the user has already liked the post, update the existing like status
    if (existingLike) {
      Like.updateLike(existingLike.like_id, JSON.parse(is_liked) ? 1 : 0, (updateErr) => {
        if (updateErr) {
          return res.status(500).json({
            message: "Error updating like",
            error: updateErr,
          });
        }
        res.status(200).json({
          message: "Like updated successfully",
        });
      });
    } else {
      // If the user has not liked the post, create a new like entry
      Like.createLike({ user_id, post_id, is_liked: JSON.parse(is_liked) ? 1 : 0 }, (createErr) => {
        if (createErr) {
          return res.status(500).json({
            message: "Error creating like",
            error: createErr,
          });
        }
        res.status(201).json({
          message: "Like created successfully",
        });
      });
    }
  });
};


// exports.addOrUpdateLike = (req, res) => {
//   const { user_id, post_id, is_liked } = req.body;

//   // Check if the user has already liked the post
//   Like.getByUserIdAndPostId(user_id, post_id, (err, existingLike) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Error checking existing like",
//         error: err,
//       });
//     }

//     // If the user has already liked the post, update the existing like status
//     if (existingLike) {
//       Like.updateLike(existingLike.like_id, is_liked === "true", (updateErr) => {
//         if (updateErr) {
//           return res.status(500).json({
//             message: "Error updating like",
//             error: updateErr,
//           });
//         }
//         res.status(200).json({
//           message: "Like updated successfully",
//         });
//       });
//     } else {
//       // If the user has not liked the post, create a new like entry
//       Like.createLike({ user_id, post_id, is_liked: is_liked === "true" }, (createErr) => {
//         if (createErr) {
//           return res.status(500).json({
//             message: "Error creating like",
//             error: createErr,
//           });
//         }
//         res.status(201).json({
//           message: "Like created successfully",
//         });
//       });
//     }
//   });
// };

// Read a single Like
exports.getLike = (req, res) => {
  const { user_id, post_id } = req.body;

  Like.getByUserIdAndPostId(user_id, post_id, (err, existingLike) => {
    if (err) {
      return res.status(500).json({
        message: "Error reading like",
        error: err,
      });
    }

    if (existingLike) {
      res.status(200).json({
        likeCount: existingLike.is_liked ? 1 : 0,
      });
    } else {
      res.status(404).json({
        message: "Like not found",
      });
    }
  });
};