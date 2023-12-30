const db = require("../config/db");

// Define the customer schema
const Skills = function (Skills) {
  this.skills_id = Skills.skills_id;
  this.skils_name = Skills.skils_name;
  this.user_id = Skills.user_id;

};

// Create a new Skills
Skills.create = (newSkills, result) => {
  db.query("INSERT INTO skills SET ?", newSkills, (err, res) => {
    if (err) {
      console.error("Error creating Skills:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Skillss
Skills.getAll = (result) => {
    db.query('SELECT * FROM skills ORDER BY user_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Skills:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record

  Skills.getById = (user_id, result) => {
    db.query('SELECT * FROM skills WHERE user_id = ?', user_id, (err, res) => {
      if (err) {
        console.error('Error reading Skills:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Skills not found' }, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Skills.getById = (user_id, result) => {
  //   db.query('SELECT * FROM skills WHERE user_id = ?', user_id, (err, res) => {
  //     if (err) {
  //       console.error('Error reading Skills:', err);
  //       result(err, null);
  //     } else if (res.length === 0) {
  //       result({ message: 'Skills not found' }, null);
  //     } else {
  //       result(null, res[0]);
  //     }
  //   });
  // };
  
  // Update a record
  Skills.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE skills SET ? WHERE skills_id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Skills:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Skills not found' }, null);
        } else {
          result(null, { message: 'Skills updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Skills.deleteById = (id, result) => {
    db.query('DELETE FROM skills WHERE skills_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Skills not found' }, null);
      } else {
        result(null, { message: 'Skills deleted successfully' });
      }
    });
  };
  


module.exports = Skills;
