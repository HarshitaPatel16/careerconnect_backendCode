const db = require("../config/db");

// Define the customer schema
const Connections = function (Connections) {
  this.connection_id = Connections.connection_id;
  this.user_id_1 = Connections.user_id_1;
  this.user_id_2 = Connections.user_id_2;
  this.status = Connections.status;
  this.created_at = Connections.created_at;

};

// Create a new Connections
Connections.create = (newConnections, result) => {
  db.query("INSERT INTO connections (user_id_1, user_id_2) VALUES (?, ?)", newConnections, (err, res) => {
    if (err) {
      console.error("Error creating Connections:", err);
      result(err, null);
    } else {
      result(null, { id: res.insertId });
    }
  });
};


// Read all Connectionss
Connections.getAll = (result) => {
    db.query('SELECT * FROM connections ORDER BY connection_id DESC;', (err, res) => {
      if (err) {
        console.error('Error reading Connections:', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  };
  
  // Read a single record
  Connections.getById = (id, result) => {
    db.query('SELECT * FROM connections WHERE connection_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error reading Connections:', err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: 'Connections not found' }, null);
      } else {
        result(null, res[0]);
      }
    });
  };
  
  // Update a record
  Connections.updateById = (id, updatedRecord, result) => {
    db.query(
      'UPDATE connections SET ? WHERE connection_id = ?',
      [updatedRecord, id],
      (err, res) => {
        if (err) {
          console.error('Error updating Connections:', err);
          result(err, null);
        } else if (res.affectedRows === 0) {
          result({ message: 'Connections not found' }, null);
        } else {
          result(null, { message: 'Connections updated successfully' });
        }
      }
    );
  };
  
  // Delete a record
  Connections.deleteById = (id, result) => {
    db.query('DELETE FROM connections WHERE connection_id = ?', id, (err, res) => {
      if (err) {
        console.error('Error deleting record:', err);
        result(err, null);
      } else if (res.affectedRows === 0) {
        result({ message: 'Connections not found' }, null);
      } else {
        result(null, { message: 'Connections deleted successfully' });
      }
    });
  };
  


module.exports = Connections;
