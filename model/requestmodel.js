const db = require("../config/db");

// Define the customer schema
const Requests = function (Requests) {
  this.request_id = Requests.request_id;
  this.user_id_From = Requests.user_id_From;
  this.user_id_To = Requests.user_id_To;
 

};

// Create a new Requests
Requests.create = (newRequests, result) => {
  db.query("INSERT INTO request SET", newRequests, (err, res) => {
    if (err) {
      console.error("Error creating Requests:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Requestss
Requests.getAll = (result) => {
    db.query('SELECT * FROM request ORDER BY request_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Requests:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Requests.getById = (id, result) => {
    db.query('SELECT * FROM request WHERE request_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error reading Requests:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Requests not found' }, null);
      } else {
        result(null, res[0]);
      }
    });
  };


  Requests.getByUserIds = (user_id_From, user_id_To, result) => {
    db.query(
      'SELECT * FROM request WHERE user_id_From = ? AND user_id_To = ?',
      [user_id_From, user_id_To],
      (err, res) => {
        if (err) {
          console.error('Error reading Requests:', err);
          result(err, null);
        } else if (res.length === 0) {
          result(null, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  };
  
  // Update a record
  Requests.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE request SET ? WHERE request_id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Requests:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Requests not found' }, null);
        } else {
          result(null, { message: 'Requests updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Requests.deleteById = (id, result) => {
    db.query('DELETE FROM request WHERE request_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Requests not found' }, null);
      } else {
        result(null, { message: 'Requests deleted successfully' });
      }
    });
  };
  


module.exports = Requests;
