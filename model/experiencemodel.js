const db = require("../config/db");

// Define the customer schema
const Experience = function (Experience) {
  this.experience_id = Experience.Experience_id;
  this.experience = Experience.experience;
  this.user_id = Experience.user_id;

};

// Create a new Experience
Experience.create = (newExperience, result) => {
  db.query("INSERT INTO experience SET ?", newExperience, (err, res) => {
    if (err) {
      console.error("Error creating Experience:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Experiences
Experience.getAll = (result) => {
    db.query('SELECT * FROM experience ORDER BY experience_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Experience:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Experience.getById = (id, result) => {
    db.query('SELECT * FROM experience WHERE experience_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error reading Experience:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Experience not found' }, null);
      } else {
        result(null, res[0]);
      }
    });
  };
  
  // Update a record
  Experience.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE experience SET ? WHERE experience_id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Experience:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Experience not found' }, null);
        } else {
          result(null, { message: 'Experience updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Experience.deleteById = (id, result) => {
    db.query('DELETE FROM experience WHERE experience_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Experience not found' }, null);
      } else {
        result(null, { message: 'Experience deleted successfully' });
      }
    });
  };
  


module.exports = Experience;
