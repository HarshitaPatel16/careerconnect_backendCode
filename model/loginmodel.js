const db = require("../config/db");

// Define the customer schema
const User = function (User) {
  this.user_id = User.user_id;
  this.first_name = User.first_name;
  this.last_name = User.last_name;
  this.username = User.username;
  this.email = User.email;
  this.password = User.password;
  this.mobile = User.mobile;
  this.profilePic_path = User.profilePic_path;
  this.profilePic = User.profilePic;
  this.address = User.address;
  this.resume = User.resume;
  this.about = User.about;
  
};

// Create a new User
User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.error("Error creating User:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};

//User login
User.getByUserPassword = (username, password, result) => {
  db.query(
    `SELECT * FROM users WHERE username = "${username}" && password = "${password}"`,
    (err, res) => {
      if (err) {
        console.error('Error reading User:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'User not found' }, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

//
User.getById = (id, result) => {
  db.query('SELECT * From users WHERE user_id = ?' , 
   id, (err, res) => {
    if (err) {
      console.error("Error reading User:", err);
      result(err, null);
    } else if (res.length === 0) {
      result({ message: "User not found" }, null);
    } else {
      result(null, res[0]);
    }
  });
};


// Update a user profile
User.updateById = (id, updateduser, result) => {
  db.query(
    "UPDATE users SET ? WHERE user_id = ?",
    [updateduser, id],
    (err, res) => {
      if (err) {
        console.error("Error updating user:", err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: "user not found" }, null);
      } else {
        result(null, { message: "user updated successfully" });
      }
    }
  );
};


module.exports = User;
