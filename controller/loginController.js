const User = require("../model/loginmodel");

// Create a new User

exports.Registion = (req, res) => {
  let newUser = new User(req.body);
  if (req.files !== null && req.files !== undefined && req.files.profilePic !== null && req.files.profilePic !== undefined) {
    const file = req.files.profilePic;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `\public/user/${fileName}`;

    file.mv(filePath, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: 'Error uploading file.' });
      }
      else {
        newUser = {
          ...newUser,
          profilePic: fileName,
          profilePic_path: filePath,
        }
        User.create(newUser, (err, data) => {
          if (err) {
            res.status(500).json({
              message: "Error creating User",
              error: err,
            });
          } else {
            res.status(201).json({
              message: "User created successfully",
              id: data.id,
            });
          }
        });
      }
    });
  }
  {
    User.create(newUser, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Error creating User",
          error: err,
        });
      } else {
        res.status(201).json({
          message: "User created successfully",
          id: data.id,
        });
      }
    });
  }
};

//Customer User
exports.Login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getByUserPassword(username, password, (err, data) => {
    if (err) {
        if (err.message === "User not found") {
          res.status(200).json({
            message: "User not found",
          });
        } else {
          res.status(200).json({
            message: "User not found",
          });
        }
      } else {
        res.status(200).json({
          message: "User User Successfully",
          data: data
        });
      }
  });
};


//

exports.readOneUser = (req, res) => {
  const id = req.body.id;

  User.getById(id, (err, data) => {
    if (err) {
      if (err.message === "User not found") {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(500).json({
          message: "Error reading User",
          error: err,
        });
      }
    } else {
      res.status(200).json(data);
    }
  });
};

// user update profile
exports.UpdateUser = (req, res) => {
  const id = req.body.id;
  const updatedUser = new User(req.body);

  if (req.files !== null && req.files !== undefined && req.files.profilePic !== null && req.files.profilePic !== undefined) {
    const file = req.files.profilePic;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    console.log("fileName", fileName)
    const filePath = `\public/user/${fileName}`;

    file.mv(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file.' });
      }
      else {
        const finalData = {
          id : updatedUser.id,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          username: updatedUser.username,
          email: updatedUser.email,
          password: updatedUser.password,
          mobile: updatedUser.mobile,
          profilePic: fileName,
          profilePic_path: filePath,
        }
        User.updateById(id, finalData, (err, data) => {
          if (err) {
            if (err.message === "User not found") {
              res.status(404).json({
                message: "User not found",
              });
            } else {
              res.status(500).json({
                message: "Error updating User",
                error: err,
              });
            }
          } else {
            res.status(200).json({
              message: "User updated successfully",
            });
          }
        });
      }
    });
  }
  else
  {

    User.updateById(id, updatedUser, (err, data) => {
    if (err) {
      if (err.message === "User not found") {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(500).json({
          message: "Error updating User",
          error: err,
        });
      }
    } else {
      res.status(200).json({
        message: "User updated successfully",
      });
    }
  });
}
 
};


