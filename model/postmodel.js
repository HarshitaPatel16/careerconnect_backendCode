const db = require("../config/db");

// Define the customer schema
const Post = function (Post) {
  this.id = Post.id;
  this.desc = Post.desc;
  this.userId = Post.userId;
  this.createdAt = Post.createdAt;
  this.post_img = Post.post_img;
  this.post_img_path = Post.post_img_path;

};

// Create a new Post
Post.create = (newPost, result) => {
  db.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.error("Error creating Post:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all posts
Post.getAll = (result) => {
    db.query('SELECT * FROM posts ORDER BY id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Post:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Post.getById = (id, result) => {
    db.query('SELECT * FROM posts WHERE id = ?', id, (err, res) => {
      if (err) {
        console.error('Error reading Post:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Post not found' }, null);
      } else {
        result(null, res[0]);
      }
    });
  };
  
  // Update a record
  Post.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE posts SET ? WHERE id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Post:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Post not found' }, null);
        } else {
          result(null, { message: 'Post updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Post.deleteById = (id, result) => {
    db.query('DELETE FROM posts WHERE id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Post not found' }, null);
      } else {
        result(null, { message: 'Post deleted successfully' });
      }
    });
  };
  


module.exports = Post;
