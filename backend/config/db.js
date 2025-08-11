const mysql = require('mysql2');

// Step 1: connect without database
const db = mysql.createConnection({
  host: '192.168.1.10',
  user: 'root',
  password: ''
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Step 2: create DB if not exists
  db.query(`CREATE DATABASE IF NOT EXISTS db_contact_book`, (err) => {
    if (err) throw err;
    console.log('Database checked/created');

    // Step 3: switch to DB
    db.changeUser({ database: 'db_contact_book' }, (err) => {
      if (err) throw err;
      console.log('Using database db_contact_book');

      // Step 4: create table if not exists
      db.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          phone_number VARCHAR(20) UNIQUE NOT NULL,
          address VARCHAR(255),
          city VARCHAR(100),
          notes TEXT,
          last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `, err => {
        if (err) throw err;
        console.log('Contacts table checked/created');
      });
    });
  });
});

module.exports = db;
