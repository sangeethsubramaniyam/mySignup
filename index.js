


const express = require('express');
const mysql = require('mysql2');

const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1099178@jR',
  // database: 'users'
  database:'signup'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Use parameterized query to prevent SQL injection
    const query = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];
    
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Database error' });
      } else {
        res.json({ message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
