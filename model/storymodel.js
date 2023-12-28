const db = require("../config/db");

// Define the customer schema
const Story = function (Story) {
  this.id = Story.id;
  this.story_img = Story.story_img;
  this.userId = Story.userId;
  this.story_img_path = Story.story_img_path;
};

// Create a new Story
Story.create = (newStory, result) => {
  db.query("INSERT INTO stories SET ?", newStory, (err, res) => {
    if (err) {
      console.error("Error creating Story:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Storys
Story.getAll = (result) => {
    db.query('SELECT * FROM stories ORDER BY id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Story:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Story.getById = (id, result) => {
    db.query('SELECT * FROM stories WHERE id = ?', id, (err, res) => {
      if (err) {
        console.error('Error reading Story:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Story not found' }, null);
      } else {
        result(null, res[0]);
      }
    });
  };
  
  // Update a record
  Story.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE stories SET ? WHERE id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Story:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Story not found' }, null);
        } else {
          result(null, { message: 'Story updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Story.deleteById = (id, result) => {
    db.query('DELETE FROM stories WHERE id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Story not found' }, null);
      } else {
        result(null, { message: 'Story deleted successfully' });
      }
    });
  };
  


module.exports = Story;
