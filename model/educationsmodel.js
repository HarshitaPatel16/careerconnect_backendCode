const db = require("../config/db");

// Define the customer schema
const Educations = function (Educations) {
  this.education_id = Educations.education_id;
  this.user_id = Educations.user_id;
  this.start_year = Educations.start_year;
  this.end_year = Educations.end_year;
  this.institution_name = Educations.institution_name;
  this.degree = Educations.degree;
  this.activities = Educations.activities;
  this.field_of_study = Educations.field_of_study;
};

// Create a new Educations
Educations.create = (newEducations, result) => {
  db.query("INSERT INTO educations SET ?", newEducations, (err, res) => {
    if (err) {
      console.error("Error creating Educations:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Educationss
Educations.getAll = (result) => {
    db.query('SELECT * FROM educations ORDER BY education_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Educations:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Educations.getById = (user_id, result) => {
    db.query('SELECT * FROM educations WHERE user_id = ?', user_id, (err, res) => {
      if (err) {
        console.error('Error reading Educations:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Educations not found' }, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Update a record
  Educations.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE educations SET ? WHERE education_id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Educations:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Educations not found' }, null);
        } else {
          result(null, { message: 'Educations updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Educations.deleteById = (education_id, result) => {
    db.query('DELETE FROM educations WHERE education_id = ?', education_id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Educations not found' }, null);
      } else {
        result(null, { message: 'Educations deleted successfully' });
      }
    });
  };
  


module.exports = Educations;
