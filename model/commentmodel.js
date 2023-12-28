const db = require("../config/db");

// Define the customer schema
const Comment = function (Comment) {
  this.id = Comment.id;
  this.desc = Comment.desc;
  this.createdAt = Comment.createdAt;
  this.userId = Comment.userId;
  this.postId = Comment.postId;

};

// Create a new Comment
Comment.create = (newComment, result) => {
  db.query("INSERT INTO comment SET ?", newComment, (err, res) => {
    if (err) {
      console.error("Error creating Comment:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Comments
Comment.getAll = (result) => {
    db.query('SELECT * FROM comment ORDER BY id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Comment:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Comment.getById = (id, result) => {
    db.query('SELECT * FROM comment WHERE id = ?', id, (err, res) => {
      if (err) {
        console.error('Error reading Comment:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Comment not found' }, null);
      } else {
        result(null, res[0]);
      }
    });
  };
  
  // Update a record
  Comment.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE comment SET ? WHERE id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Comment:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Comment not found' }, null);
        } else {
          result(null, { message: 'Comment updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Comment.deleteById = (id, result) => {
    db.query('DELETE FROM comment WHERE id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Comment not found' }, null);
      } else {
        result(null, { message: 'Comment deleted successfully' });
      }
    });
  };
  


module.exports = Comment;
