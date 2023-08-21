const express = require('express');
const { Pool } = require('pg');

const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;

// Database connection configuration
const pool = new Pool({
    user: 'lineage',
    host: 'localhost', // or wherever your database is hosted
    database: 'lineage',
    password: 'lineage',
    port: 5432,
});

app.use(express.json());

// Sample endpoint to insert a person
app.post('/api/addPerson', async (req, res) => {
    try {
        const { firstNames, lastNames, sex, status, birthDate, birthplace, deathDate, deathplace, person_id } = req.body;

        // Insert person into people table
        const response = await pool.query(
            "INSERT INTO people (person_id, first_name, last_name, gender, is_living) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [person_id, firstNames, lastNames, sex, status === 'Living']
        );

        const personId = response.rows[0].id;

        // Insert birth event if provided
        if (birthDate || birthplace) {
            await pool.query(
                "INSERT INTO events (person_id, event_type, date, place) VALUES ($1, 'birth', $2, $3)",
                [personId, birthDate, birthplace]
            );
        }

        // Insert death event if provided and status is not Living
        if (status !== 'Living' && (deathDate || deathplace)) {
            await pool.query(
                "INSERT INTO events (person_id, event_type, date, place) VALUES ($1, 'death', $2, $3)",
                [personId, deathDate, deathplace]
            );
        }

        res.status(201).send({ message: "Person added successfully!", personId: personId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error inserting person." });
    }
});

app.get('/api/dbtest', async (req, res) => {
  try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM pg_tables WHERE schemaname = \'public\'');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
  } catch (err) {
      console.error(err);
      res.send("Error " + err);
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
