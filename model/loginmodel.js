const db = require("../config/db");

// Define the customer schema
const User = function (User) {
  this.user_id = User.user_id;
  this.first_name = User.first_name || '';
  this.last_name = User.last_name || '';
  this.username = User.username || '';
  this.email = User.email || '';
  this.password = User.password || '';
  this.mobile = User.mobile || '';
  this.profilePic_path = User.profilePic_path || '';
  this.profilePic = User.profilePic || '';
  this.address = User.address || '';
  this.resume = User.resume || '';
  this.about = User.about || '';
  this.coverPic_path = User.coverPic_path || '';
  this.coverPic = User.coverPic || '';
  this.resume_path = User.resume_path || '';
  this.profile_heading = User.profile_heading || '';
  this.otp = User.otp || '';


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

//reall all user
User.getAll = (result) => {
  db.query('SELECT * FROM users;', (err, res) => {
    if (err) {
      console.error('Error reading user:', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};


//
User.getById = (user_id, result) => {
  db.query('SELECT * From users WHERE user_id = ?' , 
  user_id, (err, res) => {
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
User.updateById = (user_id, updateduser, result) => {
  db.query(
    "UPDATE users SET ? WHERE user_id = ?",
    [updateduser, user_id],
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




User.getByOtp = (otp) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE otp = ?', otp, (err, res) => {
      if (err) {
        console.error('Error reading user by email:', err);
        reject(err);
      } else if (res.length === 0) {
        console.log('User not found for email:', email);
        resolve(null);
      } else {
        console.log('User found:', res[0]);
        resolve(res[0]);
      }
    });
  });
};


User.saveOTP = (user_id, otp, result) => {
  db.query(
    "UPDATE users SET otp = ? WHERE user_id = ?",
    [otp, user_id],
    (err, res) => {
      if (err) {
        console.error("Error saving OTP:", err);
        if (typeof result === 'function') {
          result(err, null);
        }
      } else {
        console.log('OTP saved successfully');
        if (typeof result === 'function') {
          result(null, { message: "OTP saved successfully" });
        }
      }
    }
  );
};

// otp varification 




User.getByUserOtp = (otp, result) => {
  db.query('SELECT * FROM users WHERE otp = ?;', otp, (err, res) => {
    if (err) {
      console.error("Error reading users:", err);
      result(err, null);
    } else {
      if (res && res.length > 0) {
        result(null, res[0]);
      } else {
        result(null, null);
      }
    }
  });
};




module.exports = User;
