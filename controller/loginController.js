const User = require("../model/loginmodel");

// Create a new User

// exports.Registion = (req, res) => {
//   let newUser = new User(req.body);
//   if (req.files !== null && req.files !== undefined && req.files.profilePic !== null && req.files.profilePic !== undefined) {
//     const file = req.files.profilePic;
//     const timestamp = Date.now();
//     const fileName = `${timestamp}-${file.name}`;
//     const filePath = `\public/user/${fileName}`;

//     file.mv(filePath, (err) => {
//       if (err) {
//         console.error("Error uploading file:", err);
//         return res.status(500).json({ error: 'Error uploading file.' });
//       }
//       else {
//         newUser = {
//           ...newUser,
//           profilePic: fileName,
//           profilePic_path: filePath,
//         }
//         User.create(newUser, (err, data) => {
//           if (err) {
//             res.status(500).json({
//               message: "Error creating User",
//               error: err,
//             });
//           } else {
//             res.status(201).json({
//               message: "User created successfully",
//               id: data.id,
//             });
//           }
//         });
//       }
//     });
//   }
//   {
//     User.create(newUser, (err, data) => {
//       if (err) {
//         res.status(500).json({
//           message: "Error creating User",
//           error: err,
//         });
//       } else {
//         res.status(201).json({
//           message: "User created successfully",
//           id: data.id,
//         });
//       }
//     });
//   }
// };



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
          message: "User User Successfully",
          data: data
        });
      }
  });
};


//

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





// exports.UpdateUser = (req, res) => {
//   const user_id = req.body.user_id;
//   const updatedUser = {};  // Create an empty object to store the properties to be updated

//   // Handle resume
//   if (req.files && req.files.resume) {
//     const resumeFile = req.files.resume;
//     const timestamp = Date.now();
//     const resumeFileName = `${timestamp}-${resumeFile.name}`;
//     const resumeFilePath = `\public/user/${resumeFileName}`;
//     console.log("Before file upload");

//     resumeFile.mv(resumeFilePath, (resumeErr) => {
//       if (resumeErr) {
//         console.log("Error uploading resume:", resumeErr);
//         return res.status(500).json({ error: 'Error uploading resume.' });
//       }
//       console.log("Resume uploaded successfully");

//       updatedUser.resume = resumeFileName;
//       updatedUser.resume_path = resumeFilePath;

//       // Update user information with the new resume
//       User.updateById(user_id, updatedUser, (updateErr, updateData) => {
//         if (updateErr) {
//           if (updateErr.message === "User not found") {
//             res.status(404).json({
//               message: "User not found",
//             });
//           } else {
//             res.status(500).json({
//               message: "Error updating User",
//               error: updateErr,
//             });
//           }
//         } else {
//           res.status(200).json({
//             message: "User updated successfully",
//           });
//         }
//       });
//     });
//   } else {
//     // If no new resume is provided, update user information without changing resume
//     User.updateById(user_id, req.body, (err, data) => {
//       if (err) {
//         if (err.message === "User not found") {
//           res.status(404).json({
//             message: "User not found",
//           });
//         } else {
//           res.status(500).json({
//             message: "Error updating User",
//             error: err,
//           });
//         }
//       } else {
//         res.status(200).json({
//           message: "User updated successfully",
//         });
//       }
//     });
//   }
// };


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

// exports.UpdateUser = (req, res) => {
//   const user_id = req.body.user_id;
//   const updatedRecord = {};

//   if (
//     (req.files !== null && req.files !== undefined && req.files.profilePic !== null && req.files.profilePic !== undefined) ||
//     (req.files !== null && req.files !== undefined && req.files.resume !== null && req.files.resume !== undefined)
//   ) {
//     // Handle user image
//     if (req.files.profilePic) {
//       const file = req.files.profilePic;
//       const timestamp = Date.now();
//       const fileName = `${timestamp}-${file.name}`;
//       const filePath = `\public/user/${fileName}`;

//       file.mv(filePath, (err) => {
//         if (err) {
//           return res.status(500).json({ error: 'Error uploading user image.' });
//         }
//         updatedRecord.profilePic = fileName;
//         updatedRecord.profilePic_path = filePath;

//         // Update user information with the new user image
//         updateUserAndResume();
//       });
//     }

//     // Handle resume
//     if (req.files.resume) {
//       const resumeFile = req.files.resume;
//       const timestamp = Date.now();
//       const resumeFileName = `${timestamp}-${resumeFile.name}`;
//       const resumeFilePath = `\public/user/${resumeFileName}`;

//       resumeFile.mv(resumeFilePath, (err) => {
//         if (err) {
//           return res.status(500).json({ error: 'Error uploading resume.' });
//         }

//         updatedRecord.resume = resumeFileName;
//         updatedRecord.resume_path = resumeFilePath;

//         // Update user information with the new resume
//         updateUserAndResume();
//       });
//     }
//   } else {
//     // If no user image or resume is provided, update user information without changing them
//     updateUserAndResume();
//   }

//   function updateUserAndResume() {
//     // Update user information with the new profile picture and resume
//     User.updateById(user_id, updatedRecord, (err, data) => {
//       if (err) {
//         if (err.message === "User not found") {
//           res.status(404).json({
//             message: "User not found",
//           });
//         } else {
//           res.status(500).json({
//             message: "Error updating User",
//             error: err,
//           });
//         }
//       } else {
//         res.status(200).json({
//           message: "User updated successfully",
//         });
//       }
//     });
//   }
// };


// exports.UpdateUser = (req, res) => {
//   const user_id = req.body.user_id;
//   const updatedRecord = {};

//   // Handle user image
//   if (req.files && req.files.profilePic) {
//     const file = req.files.profilePic;
//     const timestamp = Date.now();
//     const fileName = `${timestamp}-${file.name}`;
//     const filePath = `\public/user/${fileName}`;

//     file.mv(filePath, (err) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error uploading user image.' });
//       }
//       updatedRecord.profilePic = fileName;
//       updatedRecord.profilePic_path = filePath;

//       // Update user information with the new user image
//       updateUserAndResume();
//     });
//   }

//   // Handle resume
//   if (req.files && req.files.resume) {
//     const resumeFile = req.files.resume;
//     const timestamp = Date.now();
//     const resumeFileName = `${timestamp}-${resumeFile.name}`;
//     const resumeFilePath = `\public/user/${resumeFileName}`;

//     resumeFile.mv(resumeFilePath, (err) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error uploading resume.' });
//       }

//       updatedRecord.resume = resumeFileName;
//       updatedRecord.resume_path = resumeFilePath;

//       // Update user information with the new resume
//       updateUserAndResume();
//     });
//   }

//   // If no user image or resume is provided, update user information without changing them
//   updateUserAndResume();

//   function updateUserAndResume() {
//     if (Object.keys(updatedRecord).length > 0) {
//       // Only update if there is new data
//       // Update user information with the new profile picture and resume
//       User.updateById(user_id, updatedRecord, (err, data) => {
//         if (err) {
//           console.error("Error updating user:", err);
//           if (err.message === "User not found") {
//             return res.status(404).json({
//               message: "User not found",
//             });
//           } else {
//             return res.status(500).json({
//               message: "Error updating User",
//               error: err,
//             });
//           }
//         } else {
//           console.log("User updated successfully");
//           return res.status(200).json({
//             message: "User updated successfully",
//           });
//         }
//       });
//     } else {
//       // No new data to update
//       console.log("No updates provided");
//       return res.status(200).json({
//         message: "No updates provided",
//       });
//     }
//   }
// };
