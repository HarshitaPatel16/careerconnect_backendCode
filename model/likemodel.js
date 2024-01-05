const db = require("../config/db");

// Define the customer schema
const Like = function (Like) {
  this.like_id = Like.like_id;
  this.IsLiked = Like.IsLiked;
  this.user_id = Like.user_id;
  this.post_id = Like.post_id;

};

// Create a new Like
// Like.create = (newLike, result) => {
//   db.query("INSERT INTO like SET ?", newLike, (err, res) => {
//     if (err) {
//       console.error("Error creating Like:", err);
//       result(err, null);
//     } else {
//       result(null, { id: res.insertId });
//     }
//   });
// };

// Like.create = (newLike, result) => {
//   db.query("INSERT INTO `like` SET ?", newLike, (err, res) => {
//     if (err) {
//       console.error("Error creating Like:", err);
//       result(err, null);
//     } else {
//       result(null, { id: res.insertId });
//     }
//   });
// };

Like.create = (newLike, result) => {
  const { IsLiked, ...otherProps } = newLike;
  const sqlQuery = "INSERT INTO `like` SET ?";

  db.query(sqlQuery, { ...otherProps, IsLiked: IsLiked ? 1 : 0 }, (err, res) => {
    if (err) {
      console.error("Error creating Like:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};

// Read all Likes
Like.getAll = (result) => {
    db.query('SELECT * FROM like ORDER BY like_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Like:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Like.getById = (post_id, result) => {
    db.query('SELECT COUNT(*) AS likeCount FROM `like` WHERE post_id = ? AND IsLiked = 1', post_id, (err, res) => {
      if (err) {
        console.error('Error reading Like:', err);
        result(err, null);
      } else {
        result(null, res[0].likeCount);
      }
    });
  };
  
  // Like.getById = (id, result) => {
  //   db.query('SELECT * FROM like WHERE post_id = ?', id, (err, res) => {
  //     if (err) {
  //       console.error('Error reading Like:', err);
  //       result(err, null);
  //     } else if (res.length === 0) {
  //       result({ message: 'Like not found' }, null);
  //     } else {
  //       result(null, res[0]);
  //     }
  //   });
  // };
  
  // Update a record
  Like.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE like SET ? WHERE like_id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Like:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Like not found' }, null);
        } else {
          result(null, { message: 'Like updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Like.deleteById = (id, result) => {
    db.query('DELETE FROM like WHERE like_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Like not found' }, null);
      } else {
        result(null, { message: 'Like deleted successfully' });
      }
    });
  };
  


module.exports = Like;
