const db = require("../config/db");

// Define the customer schema
const Like = function (Like) {
  this.like_id = Like.like_id;
  this.is_liked = Like.is_liked;
  this.user_id = Like.user_id;
  this.post_id = Like.post_id;

};

// Create a new Like


// Like.create = (newLike, result) => {
//   const { is_liked, ...otherProps } = newLike;
//   const sqlQuery = "INSERT INTO `like` SET ?";
//   console.log("is_liked value:", JSON.parse(is_liked)); // Parse the string to a boolean

//   console.log("Payload:", newLike); // Log the payload console

//   db.query(sqlQuery, { ...otherProps, is_liked: JSON.parse(is_liked) ? 1 : 0 }, (err, res) => {
//     console.log("SQL Query:", sqlQuery); // Log the SQL query

//     if (err) {
//       console.error("Error creating Like:", err);
//       result(err, null);
//     } else {
//       result(null, { id: res.insertId });
//     }
//   });
// };

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
  


Like.getById = (post_id, result) => {
  db.query(
    'SELECT post_id, COUNT(*) AS likeCount FROM `like` WHERE post_id = ? AND is_liked = 1 GROUP BY post_id',
    post_id,
    (err, res) => {
      if (err) {
        console.error('Error reading Like:', err);
        result(err, null);
      } else {
        result(null, res.length > 0 ? res[0] : { post_id, likeCount: 0 });
      }
    }
  );
};

 
  
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
  


  Like.getByUserIdAndPostId = (user_id, post_id, result) => {
    db.query(
      'SELECT * FROM `like` WHERE user_id = ? AND post_id = ?',
      [user_id, post_id],
      (err, res) => {
        if (err) {
          console.error('Error reading Like:', err);
          result(err, null);
        } else {
          result(null, res.length > 0 ? res[0] : null);
        }
      }
    );
  };
  
  Like.createLike = (newLike, result) => {
  const { is_liked, ...otherProps } = newLike;
  const sqlQuery = "INSERT INTO `like` SET ?";
  console.log("is_liked value:", JSON.parse(is_liked)); // Parse the string to a boolean

  console.log("Payload:", newLike); // Log the payload console

  db.query(sqlQuery, { ...otherProps, is_liked: JSON.parse(is_liked) ? 1 : 0 }, (err, res) => {
    console.log("SQL Query:", sqlQuery); // Log the SQL query

    if (err) {
      console.error("Error creating Like:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};

  // Like.createLike = (newLike, result) => {
  //   db.query('INSERT INTO `like` SET ?', newLike, (err, res) => {
  //     if (err) {
  //       console.error('Error creating Like:', err);
  //       result(err, null);
  //     } else {
  //       result(null, { id: res.insertId });
  //     }
  //   });
  // };
  
  Like.updateLike = (like_id, is_liked, result) => {
    db.query(
      'UPDATE `like` SET is_liked = ? WHERE like_id = ?',
      [is_liked ? 1 : 0, like_id],
      (err, res) => {
        if (err) {
          console.error('Error updating Like:', err);
          result(err);
        } else if (res.affectedRows === 0) {
          result({ message: 'Like not found' });
        } else {
          result(null);
        }
      }
    );
  };


module.exports = Like;
