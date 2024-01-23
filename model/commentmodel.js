const db = require("../config/db");

// Define the customer schema
const Comment = function (Comment) {
  this.comment_id = Comment.comment_id;
  this.comment = Comment.comment;
  this.createdAt = Comment.createdAt;
  this.user_id = Comment.user_id;
  this.post_id = Comment.post_id;

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
    db.query('SELECT * FROM comment ORDER BY comment_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Comment:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Comment.getById = (post_id, result) => {
    db.query("SELECT " +
    "comment.*, " +
    "users.username, " +
    "users.profilePic " +
    "FROM comment " +
    "INNER JOIN users ON comment.user_id = users.user_id " +
    "WHERE post_id = ? ", post_id, (err, res) => {
      if (err) {
        console.error('Error reading Comment:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Comment not found' }, null);
      } else {
        result(null, res);
      }
    });
  };
 
  
  
  
  
  // Update a record
  Comment.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE comment SET ? WHERE comment_id = ?',
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
    db.query('DELETE FROM comment WHERE comment_id = ?', id, (err, res) => {
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
