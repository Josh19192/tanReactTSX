const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');


const app = express();

// Enable CORS to allow requests from different origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Database connection (update credentials as necessary)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'child_vaccine' // Replace with your database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    // Stop the app if the connection fails
    process.exit(1);
  } else {
    console.log('Connected to the database.');
  }
});

// Endpoint to save child info
app.post('/add-child', (req, res) => {
  const data = req.body;

  // MySQL query to insert child info into the database
  const query = `
    INSERT INTO child_info (
      first_name, middle_name, last_name, sex, birthdate, address,
      place_of_birth, birth_method, child_blood_type, number,
      mother_fname, mother_mname, mother_lname, mother_blood_type,
      mother_citizenship, mother_occupation, father_fname,
      father_mname, father_lname, father_blood_type, father_citizenship, father_occupation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Values to be inserted into the database
  const values = [
    data.first_name, data.middle_name, data.last_name, data.sex, data.birthdate, data.address,
    data.place_of_birth, data.birth_method, data.child_blood_type, data.number,
    data.mother_fname, data.mother_mname, data.mother_lname, data.mother_blood_type,
    data.mother_citizenship, data.mother_occupation, data.father_fname,
    data.father_mname, data.father_lname, data.father_blood_type, data.father_citizenship, data.father_occupation
  ];

  // Execute the query to insert the data into the database
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving child info:', err);
      return res.status(500).send('Error saving child info.');
    }
    res.status(200).send('Child info saved successfully.');
  });
});

app.get('/children', (req, res) => {
  const sql = 'SELECT * FROM child_info';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching children data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

// Delete a child record
app.delete('/children/:id', (req, res) => {
  const childId = req.params.id;
  const sql = 'DELETE FROM child_info WHERE id = ?';
  db.query(sql, [childId], (err, result) => {
    if (err) {
      console.error('Error deleting child:', err);
      return res.status(500).send('Server error');
    }
    res.send('Child deleted');
  });
});

app.post('/add-vaccine', (req, res) => {
  const data = req.body;

  // MySQL query to insert vaccine info into the database
  const query = `
    INSERT INTO vaccine_tbl (
      vaccine_name, vaccine_brand, dose, date_added
    ) VALUES (?, ?, ?, ?)
  `;

  // Values to be inserted into the database
  const values = [
    data.vaccine_name,
    data.vaccine_brand,
    data.dose,
    new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
  ];

  // Execute the query to insert the data into the database
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error saving vaccine info:', err);
      return res.status(500).send('Error saving vaccine info.');
    }
    res.status(200).send('Vaccine info saved successfully.');
  });
});

app.get('/vaccine', (req, res) => {
  const sql = 'SELECT id, vaccine_name,vaccine_brand,dose FROM vaccine_tbl';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching children data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});

app.delete('/vaccine/:id', (req, res) => {
  const vaccineId = req.params.id;
  const sql = 'DELETE FROM vaccine_tbl WHERE id = ?';
  db.query(sql, [vaccineId], (err, result) => {
    if (err) {
      console.error('Error deleting vaccine:', err);
      return res.status(500).send('Server error');
    }
    res.send('Vaccine deleted');
  });
});

app.put("/vaccine/:id", (req, res) => {
  const { id } = req.params;
  const updatedVaccine = req.body;

  // MySQL query to update the vaccine record
  const query = `
    UPDATE vaccine_tbl
    SET vaccine_name = ?, vaccine_brand = ?, dose = ?
    WHERE id = ?
  `;

  const values = [
    updatedVaccine.vaccine_name,
    updatedVaccine.vaccine_brand,
    updatedVaccine.dose,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating vaccine:', err);
      return res.status(500).send('Error updating vaccine.');
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Vaccine updated successfully' });
    } else {
      res.status(404).json({ message: 'Vaccine not found' });
    }
  });
});

app.put("/child/:id", (req, res) => {
  const { id } = req.params;
  const updatedChild = req.body;

  // MySQL query to update the child_info record
  const query = `
    UPDATE child_info
    SET 
      first_name = ?, 
      middle_name = ?, 
      last_name = ?, 
      sex = ?, 
      birthdate = ?, 
      address = ?, 
      place_of_birth = ?, 
      birth_method = ?, 
      child_blood_type = ?, 
      number = ?, 
      mother_fname = ?, 
      mother_mname = ?, 
      mother_lname = ?, 
      mother_blood_type = ?, 
      mother_citizenship = ?, 
      mother_occupation = ?, 
      father_fname = ?, 
      father_mname = ?, 
      father_lname = ?, 
      father_blood_type = ?, 
      father_citizenship = ?, 
      father_occupation = ?
    WHERE id = ?
  `;

  const values = [
    updatedChild.first_name,
    updatedChild.middle_name,
    updatedChild.last_name,
    updatedChild.sex,
    updatedChild.birthdate,
    updatedChild.address,
    updatedChild.place_of_birth,
    updatedChild.birth_method,
    updatedChild.child_blood_type,
    updatedChild.number,
    updatedChild.mother_fname,
    updatedChild.mother_mname,
    updatedChild.mother_lname,
    updatedChild.mother_blood_type,
    updatedChild.mother_citizenship,
    updatedChild.mother_occupation,
    updatedChild.father_fname,
    updatedChild.father_mname,
    updatedChild.father_lname,
    updatedChild.father_blood_type,
    updatedChild.father_citizenship,
    updatedChild.father_occupation,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating child information:', err);
      return res.status(500).send('Error updating child information.');
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Child information updated successfully' });
    } else {
      res.status(404).json({ message: 'Child not found' });
    }
  });
});

app.post('/shot', (req, res) => {
  const { child_id, vaccine_id, dose_no, shot_date, remarks } = req.body;


  connection.query('INSERT INTO shot_records (child_id, vaccine_id, dose_no, shot_date) VALUES (?, ?, ?, ?)', [child_id, vaccine_id, dose_no, shot_date], (err, result) => {
    if (err) {
      console.error('Error inserting into database:', err);
      res.status(500).send(`Error inserting into database: ${err.message}`); // Send the actual error message
      return;
    }
    res.status(201).send('Data inserted successfully');
  });
});

app.get('/shot_recs', (req, res) => {
  console.log('Received request for shot records');
  db.query(`
    SELECT sr.id, CONCAT(c.first_name, ' ', c.last_name) AS child_name, v.vaccine_name, sr.dose_no, sr.shot_date 
    FROM shot_records sr
    INNER JOIN child_info c ON sr.child_id = c.id
    INNER JOIN vaccine_tbl v ON sr.vaccine_id = v.id
    ORDER BY sr.id ASC
  `, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Results:', results); // Log the fetched data
    res.json(results);
  });
});

app.get('/shot_rec/:id', (req, res) => {
  // Extract the ID parameter from the URL path
  const id = req.params.id;

  connection.query(
    `SELECT sr.id, CONCAT(c.first_name, ' ', c.last_name) AS child_name, v.vaccine_name, sr.dose_no, sr.shot_date
    FROM shot_records sr
    INNER JOIN child_info c ON sr.child_id = c.id
    INNER JOIN vaccine_tbl v ON sr.vaccine_id = v.id 
    WHERE sr.id = ?`,
    id,
    (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Data not found');
        return;
      }
      // Send the fetched data as JSON response
      res.json(results[0]);
    }
  );
});

app.get('/doses/:vaccineName', (req, res) => {
  const vaccineName = req.params.vaccineName;

  const query = `
    SELECT dose 
    FROM vaccine_tbl 
    WHERE vaccine_name = ?
  `;

  db.query(query, [vaccineName], (err, results) => {
    if (err) {
      console.error('Error fetching dose data:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }

    if (results.length > 0) {
      const doses = results.map((row) => row.dose); // Extract dose numbers
      res.json({ doses });
    } else {
      res.status(404).json({ error: 'Vaccine not found' });
    }
  });
});

app.post('/inject', (req, res) => {
  const { child_id, vaccine_id, dose_no, shot_date } = req.body;

  const query = 'INSERT INTO shot_records (child_id, vaccine_id, dose_no, shot_date) VALUES (?, ?, ?, ?)';
  db.query(query, [child_id, vaccine_id, dose_no, shot_date], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving injection.');
    } else {
      res.send('Injection saved successfully.');
    }
  });
});

app.get('/vaccine_id/:vaccineName', (req, res) => {
  const vaccineName = req.params.vaccineName;

  // Query to get vaccine ID from vaccine name
  const query = 'SELECT id FROM vaccine_tbl WHERE vaccine_name = ?';
  
  db.query(query, [vaccineName], (err, results) => {
    if (err) {
      console.error('Error fetching vaccine ID:', err);
      return res.status(500).json({ message: 'Error fetching vaccine ID' });
    }
    
    if (results.length > 0) {
      // Return vaccine ID
      res.json({ vaccine_id: results[0].id });  // Match the column name 'id'
    } else {
      res.status(404).json({ message: 'Vaccine not found' });
    }
  });
});


app.post('/createUser', (req, res) => {
  const { username, password, repassword } = req.body;

  // Check if passwords match
  if (password !== repassword) {
      return res.status(400).json({ error: "Password doesn't match" });
  }

  // Hash the password
  const hashedPassword = "BhsXkflnsm" + crypto.createHash('md5').update(password).digest("hex") + "ls0a1L2";

  // Check if the username already exists
 
      // Insert new user into the database
      const queryInsertUser = "INSERT INTO admin_login (username, password) VALUES (?, ?)";
      db.query(queryInsertUser, [username, hashedPassword], (error, results) => {
          if (error) {
              console.error('Error inserting new user:', error);
              return res.status(500).json({ error: 'Internal server error' });
          }

          res.json({ message: 'Successfully created' });
      });
  
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Log the password received from the frontend
  console.log("Received password:", password);

  const query = `SELECT * FROM admin_login WHERE username = ? AND password = ?`;
  
  db.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Query result:', results);
    
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(404).json({ error: 'Invalid credentials' });
    }
  });
});
app.get('/total-children', (req, res) => {
  // Assuming you are using a database connection
  const query = 'SELECT COUNT(*) AS totalChildren FROM child_info';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json({ totalChildren: results[0].totalChildren });
  });
});
app.get('/total-vaccine', (req, res) => {
  // Assuming you are using a database connection
  const query = 'SELECT COUNT(*) AS totalVaccine FROM vaccine_tbl';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json({ totalVaccine: results[0].totalVaccine });
  });
});

app.get('/total-injected', (req, res) => {
  // Assuming you are using a database connection
  const query = 'SELECT COUNT(*) AS totalInjected FROM shot_records';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json({ totalInjected: results[0].totalInjected });
  });
});

app.get('/total-injected-today', (req, res) => {
  // SQL query to count rows where shot_date matches today's date
  const query = 'SELECT COUNT(*) AS totalInjectedToday FROM shot_records WHERE DATE(shot_date) = CURDATE()';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching data' });
    }
    res.json({ totalInjectedToday: results[0].totalInjectedToday }); // Send the total injected count for today
  });
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

