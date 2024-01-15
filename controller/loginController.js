const User = require("../model/loginmodel");

// Create a new User


exports.Registion = (req, res) => {
  let newUser = new User(req.body);

  if (req.files && req.files.profilePic) {
    const profilePicFile = req.files.profilePic;
    const timestamp = Date.now();
    const profilePicFileName = `${timestamp}-${profilePicFile.name}`;
    const profilePicFilePath = `/public/user/${profilePicFileName}`;

    profilePicFile.mv(profilePicFilePath, (err) => {
      if (err) {
        console.error("Error uploading profile picture:", err);
        return res.status(500).json({ error: 'Error uploading profile picture.' });
      } else {
        newUser = {
          ...newUser,
          profilePic: profilePicFileName,
          profilePic_path: profilePicFilePath,
        };

        // Check if resume file is also provided
        if (req.files.resume) {
          const resumeFile = req.files.resume;
          const resumeFileName = `${timestamp}-${resumeFile.name}`;
          const resumeFilePath = `/public/user/${resumeFileName}`;

          resumeFile.mv(resumeFilePath, (resumeErr) => {
            if (resumeErr) {
              console.error("Error uploading resume:", resumeErr);
              return res.status(500).json({ error: 'Error uploading resume.' });
            }

            newUser = {
              ...newUser,
              resume: resumeFileName,
              resume_path: resumeFilePath,
            };

            // Save user data to the database
            User.create(newUser, (dbErr, data) => {
              if (dbErr) {
                return res.status(500).json({
                  message: "Error creating User",
                  error: dbErr,
                });
              } else {
                return res.status(201).json({
                  message: "User created successfully",
                  id: data.id,
                });
              }
            });
          });
        } else {
          // Save user data to the database without resume
          User.create(newUser, (dbErr, data) => {
            if (dbErr) {
              return res.status(500).json({
                message: "Error creating User",
                error: dbErr,
              });
            } else {
              return res.status(201).json({
                message: "User created successfully",
                id: data.id,
              });
            }
          });
        }
      }
    });
  } else {
    // If no profile picture is provided
    // Proceed with saving user data to the database without profile picture and resume
    User.create(newUser, (dbErr, data) => {
      if (dbErr) {
        return res.status(500).json({
          message: "Error creating User",
          error: dbErr,
        });
      } else {
        return res.status(201).json({
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
          message: "User Successfully",
          data: data
        });
      }
  });
};


//
exports.readAllUser = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading records",
        error: err,
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Successfully got users List",
        data: data,
      });
    }
  });
};

exports.readOneUser = (req, res) => {
  const user_id = req.body.user_id;

  User.getById(user_id, (err, data) => {
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
  const user_id = req.body.user_id;
  const updatedRecord = {};

  if (req.body.username) {
    updatedRecord.username = req.body.username;
  }

  if (req.body.mobile) {
    updatedRecord.mobile = req.body.mobile;
  }
  if (req.body.email) {
    updatedRecord.email = req.body.email;
  }
  if (req.body.address) {
    updatedRecord.address = req.body.address;
  }
  if (req.body.first_name) {
    updatedRecord.first_name = req.body.first_name;
  }if (req.body.last_name) {
    updatedRecord.last_name = req.body.last_name;
  }if (req.body.profile_heading) {
    updatedRecord.profile_heading = req.body.profile_heading;
  }


  if (
    (req.files !== null && req.files !== undefined && req.files.profilePic !== null && req.files.profilePic !== undefined) ||
    (req.files !== null && req.files !== undefined && req.files.resume !== null && req.files.resume !== undefined)
  ) {
    // Handle user image
    if (req.files.profilePic) {
      const file = req.files.profilePic;
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `\public/user/${fileName}`;

      file.mv(filePath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error uploading user image.' });
        }
        const finalData = {
          profilePic: fileName,
          profilePic_path: filePath,
        };


        // Update user information with the new user image
        User.updateById(user_id, finalData, (err, data) => {
          if (err) {
            if (err.message === "user not found") {
              res.status(404).json({
                message: "user not found",
              });
            } else {
              res.status(500).json({
                message: "Error updating user",
                error: err,
              });
            }
          } else {
            res.status(200).json({
              message: "user updated successfully",
            });
          }
        });
      });
    }

    // Handle resume
    if (req.files.resume) {
      const resumeFile = req.files.resume;
      const timestamp = Date.now();
      const resumeFileName = `${timestamp}-${resumeFile.name}`;
      const resumeFilePath = `\public/user/${resumeFileName}`;

      resumeFile.mv(resumeFilePath, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error uploading resume.' });
        }

        const resumeData = {
          resume: resumeFileName,
          resume_path: resumeFilePath,
        };

        // Update user information with the new resume
        User.updateById(user_id, resumeData, (err, data) => {
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
      });
    }
  } else {
    // If no user image or resume is provided, update user information without changing them
    User.updateById(user_id, updatedRecord, (err, data) => {
      if (err) {
        if (err.message === "user not found") {
          res.status(404).json({
            message: "user not found",
          });
        } else {
          res.status(500).json({
            message: "Error updating user",
            error: err,
          });
        }
      } else {
        res.status(200).json({
          message: "user updated successfully",
        });
      }
    });
  }
};



const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');



const { sendEmail } = require('../sendmail'); // Import the sendEmail function





exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log('Email received:', email);


  // Check if the email exists in the database
  const user = await User.getByEmail(email);
  console.log('User:', user);


  if (!user) {
    console.log('User not found for email:', email);

    return res.status(404).json({ message: 'User not found' });
  }

  // Generate OTP
  const otp = randomstring.generate({
    length: 4,
    charset: 'numeric',
  });
  console.log('Generated OTP:', otp);


  // Save the OTP to the user record in the database
  await User.saveOTP(user.user_id, otp);

  // Send the OTP to the user's email
  const subject = 'Reset Password OTP';
  const text = `Your OTP to reset the password is: ${otp}`;
  const html = `<p>Your OTP to reset the password is: <strong>${otp}</strong></p>`;

  try {
    await sendEmail(email, subject, text, html);
    return res.status(200).json({ message: 'OTP sent to email' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending OTP email' });
  }
};










exports.readOneuserOtp = (req, res) => {
  const otp = req.body.otp;

  User.getByUserOtp(otp, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error reading user",
        error: err,
      });
    } else {
      if (data) {
        res.status(200).json({
          message: "Otp verification successful",
        });
      } else {
        res.status(404).json({
          message: "Otp not found for verification",
        });
      }
    }
  });
};
