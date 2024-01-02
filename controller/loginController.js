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
//   const id = req.body.id;
//   const updatedUser = new User(req.body);

//   if (req.files !== null && req.files !== undefined && req.files.profilePic !== null && req.files.profilePic !== undefined) {
//     const file = req.files.profilePic;
//     const timestamp = Date.now();
//     const fileName = `${timestamp}-${file.name}`;
//     console.log("fileName", fileName)
//     const filePath = `\public/user/${fileName}`;

//     file.mv(filePath, (err) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error uploading file.' });
//       }
//       else {
//         const finalData = {
//           id : updatedUser.id,
//           first_name: updatedUser.first_name,
//           last_name: updatedUser.last_name,
//           username: updatedUser.username,
//           email: updatedUser.email,
//           password: updatedUser.password,
//           mobile: updatedUser.mobile,
//           profilePic: fileName,
//           profilePic_path: filePath,
//         }
//         User.updateById(id, finalData, (err, data) => {
//           if (err) {
//             if (err.message === "User not found") {
//               res.status(404).json({
//                 message: "User not found",
//               });
//             } else {
//               res.status(500).json({
//                 message: "Error updating User",
//                 error: err,
//               });
//             }
//           } else {
//             res.status(200).json({
//               message: "User updated successfully",
//             });
//           }
//         });
//       }
//     });
//   }
//   else
//   {

//     User.updateById(id, updatedUser, (err, data) => {
//     if (err) {
//       if (err.message === "User not found") {
//         res.status(404).json({
//           message: "User not found",
//         });
//       } else {
//         res.status(500).json({
//           message: "Error updating User",
//           error: err,
//         });
//       }
//     } else {
//       res.status(200).json({
//         message: "User updated successfully",
//       });
//     }
//   });
// }
 
// };




exports.UpdateUser = (req, res) => {
  const user_id = req.body.user_id;
  const updatedUser = {};  // Create an empty object to store the properties to be updated

  // Handle resume
  if (req.files && req.files.resume) {
    const resumeFile = req.files.resume;
    const timestamp = Date.now();
    const resumeFileName = `${timestamp}-${resumeFile.name}`;
    const resumeFilePath = `\public/user/${resumeFileName}`;
    console.log("Before file upload");

    resumeFile.mv(resumeFilePath, (resumeErr) => {
      if (resumeErr) {
        console.log("Error uploading resume:", resumeErr);
        return res.status(500).json({ error: 'Error uploading resume.' });
      }
      console.log("Resume uploaded successfully");

      updatedUser.resume = resumeFileName;
      updatedUser.resume_path = resumeFilePath;

      // Update user information with the new resume
      User.updateById(user_id, updatedUser, (updateErr, updateData) => {
        if (updateErr) {
          if (updateErr.message === "User not found") {
            res.status(404).json({
              message: "User not found",
            });
          } else {
            res.status(500).json({
              message: "Error updating User",
              error: updateErr,
            });
          }
        } else {
          res.status(200).json({
            message: "User updated successfully",
          });
        }
      });
    });
  } else {
    // If no new resume is provided, update user information without changing resume
    User.updateById(user_id, req.body, (err, data) => {
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

// exports.UpdateUser = (req, res) => {
//   const user_id = req.body.user_id;
//   const updatedUser = {};  // Create an empty object to store the properties to be updated

//   // Handle profile picture
//   if (req.files && req.files.profilePic) {
//     const profilePicFile = req.files.profilePic;
//     const timestamp = Date.now();
//     const profilePicFileName = `${timestamp}-${profilePicFile.name}`;
//     const profilePicFilePath = `\public/user/${profilePicFileName}`;

//     profilePicFile.mv(profilePicFilePath, (profilePicErr) => {
//       if (profilePicErr) {
//         console.log("Error uploading profile picture:", profilePicErr);
//         return res.status(500).json({ error: 'Error uploading profile picture.' });
//       }
//       console.log("Profile picture uploaded successfully");

//       updatedUser.profilePic = profilePicFileName;
//       updatedUser.profilePic_path = profilePicFilePath;

//       // After profile picture upload, check for resume upload
//       handleResumeUpload(user_id, updatedUser, req.files.resume, res);
//     });
//   } else {
//     // If no new profile picture is provided, check for resume upload directly
//     handleResumeUpload(user_id, updatedUser, req.files.resume, res);
//   }
// };

// function handleResumeUpload(user_id, updatedUser, resumeFile, res) {
//   // Handle resume
//   if (resumeFile) {
//     const timestamp = Date.now();
//     const resumeFileName = `${timestamp}-${resumeFile.name}`;
//     const resumeFilePath = `\public/user/${resumeFileName}`;
//     console.log("Before resume upload");

//     resumeFile.mv(resumeFilePath, (resumeErr) => {
//       if (resumeErr) {
//         console.log("Error uploading resume:", resumeErr);
//         return res.status(500).json({ error: 'Error uploading resume.' });
//       }
//       console.log("Resume uploaded successfully");

//       updatedUser.resume = resumeFileName;
//       updatedUser.resume_path = resumeFilePath;

//       // Update user information with the new profile picture and resume
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
//     User.updateById(user_id, updatedUser, (err, data) => {
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
// }





