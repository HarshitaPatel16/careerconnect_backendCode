const Post = require("../model/postmodel");

// Create a new Post
exports.createPost = (req, res) => {
    let newPost = new Post(req.body);
    if (req.files !== null && req.files !== undefined && req.files.post_img !== null && req.files.post_img !== undefined) {
      const file = req.files.post_img;
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `\public/post/${fileName}`;
  
      file.mv(filePath, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        else {
          newPost = {
            ...newPost,
            post_img: fileName,
            post_img_path: filePath,
          }
          Post.create(newPost, (err, data) => {
            if (err) {
              res.status(500).json({
                message: "Error creating Post",
                error: err,
              });
            } else {
              res.status(201).json({
                message: "Post created successfully",
                id: data.id,
              });
            }
          });
        }
      });
    }
    {
      Post.create(newPost, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error creating Post",
            error: err,
          });
        } else {
          res.status(201).json({
            message: "Post created successfully",
            id: data.id,
          });
        }
      });
    }
};

// Read all records
exports.readAllPost = (req, res) => {
  Post.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Post List",
        data: data,
      });
    }
  });
};

// Read a single Post
exports.readOnePost = (req, res) => {
  const id = req.body.id;

  Post.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Post not found") {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Post",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Post
exports.updatePost = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Post(req.body);

  if (req.files !== null && req.files !== undefined && req.files.post_img !== null && req.files.post_img !== undefined) {
    const file = req.files.post_img;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    console.log("fileName", fileName)
    const filePath = `\public/post/${fileName}`;

    file.mv(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file.' });
      }
      else {
        const finalData = {
          id : updatedRecord.id,
          desc: updatedRecord.desc,
          PostId: updatedRecord.PostId,
          post_img: fileName,
          post_img_path: filePath,
        }
        Post.updateById(id, finalData, (err, data) => {
          if (err) {
            if (err.message === "Post not found") {
              res.status(404).json({
                message: "Post not found",
              });
            } else {
              res.status(500).json({
                message: "Error updating Post",
                error: err,
              });
            }
          } else {
            res.status(200).json({
              message: "Post updated successfully",
            });
          }
        });
      }
    });
  }
  else
  {

    Post.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Post not found") {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Post",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Post updated successfully",
      });
    }
  });
}
};

// Delete a Post
exports.deletePost = (req, res) => {
  const id = req.body.id;

  Post.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Post not found") {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Post",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Post deleted successfully",
      });
    }
  });
};
