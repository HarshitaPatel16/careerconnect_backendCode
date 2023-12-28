const Story = require("../model/storymodel");

// Create a new Story
exports.createStory = (req, res) => {
    let newStory = new Story(req.body);
    if (req.files !== null && req.files !== undefined && req.files.story_img !== null && req.files.story_img !== undefined) {
      const file = req.files.story_img;
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `\public/story/${fileName}`;
  
      file.mv(filePath, (err) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(500).json({ error: 'Error uploading file.' });
        }
        else {
          newStory = {
            ...newStory,
            story_img: fileName,
            story_img_path: filePath,
          }
          Story.create(newStory, (err, data) => {
            if (err) {
              res.status(500).json({
                message: "Error creating Story",
                error: err,
              });
            } else {
              res.status(201).json({
                message: "Story created successfully",
                id: data.id,
              });
            }
          });
        }
      });
    }
    {
      Story.create(newStory, (err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error creating Story",
            error: err,
          });
        } else {
          res.status(201).json({
            message: "Story created successfully",
            id: data.id,
          });
        }
      });
    }
};

// Read all records
exports.readAllStory = (req, res) => {
  Story.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got Story List",
        data: data,
      });
    }
  });
};

// Read a single Story
exports.readOneStory = (req, res) => {
  const id = req.body.id;

  Story.getById(id, (err, data) => {
    if (err) {
      if (err.message === "Story not found") {
        res.status(404).json({
          message: "Story not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading Story",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// Update a Story
exports.updateStory = (req, res) => {
  const id = req.body.id;
  const updatedRecord = new Story(req.body);

  if (req.files !== null && req.files !== undefined && req.files.story_img !== null && req.files.story_img !== undefined) {
    const file = req.files.story_img;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    console.log("fileName", fileName)
    const filePath = `\public/story/${fileName}`;

    file.mv(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file.' });
      }
      else {
        const finalData = {
          id : updatedRecord.id,
          desc: updatedRecord.desc,
          userId: updatedRecord.userId,
          story_img: fileName,
          story_img_path: filePath,
        }
        Story.updateById(id, finalData, (err, data) => {
          if (err) {
            if (err.message === "Story not found") {
              res.status(404).json({
                message: "Story not found",
              });
            } else {
              res.status(500).json({
                message: "Error updating Story",
                error: err,
              });
            }
          } else {
            res.status(200).json({
              message: "Story updated successfully",
            });
          }
        });
      }
    });
  }
  else
  {

    Story.updateById(id, updatedRecord, (err, data) => {
    if (err) {
      if (err.message === "Story not found") {
        res.status(404).json({
          message: "Story not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating Story",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "Story updated successfully",
      });
    }
  });
}
};

// Delete a Story
exports.deleteStory = (req, res) => {
  const id = req.body.id;

  Story.deleteById(id, (err, data) => {
    if (err) {
      if (err.message === "Story not found") {
        res.status(404).json({
          message: "Story not found",
        });
      } else {
        res.status(500).json({
          message: "Error deleting Story",
          error: err,
        });
      }
    } else {
      res.status(204).json({
        message: "Story deleted successfully",
      });
    }
  });
};
