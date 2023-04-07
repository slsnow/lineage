const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'lineage',
  password: 'lineage',
  host: 'localhost',
  database: 'lineage_db',
  port: 5432,
});

const router = express.Router();

router.use(express.json());

// Create a new person
router.post('/', async (req, res) => {
  const { gedcom_id, first_name, last_name, gender, birth_date, birth_place, death_date, death_place } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO people (gedcom_id, first_name, last_name, gender, birth_date, birth_place, death_date, death_place) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [gedcom_id, first_name, last_name, gender, birth_date, birth_place, death_date, death_place]
    );
    const newPersonId = result.rows[0].id;
    res.status(201).json({ id: newPersonId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the person.' });
  }
});

// Get a person by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Person not found.' });
    } else {
      const person = result.rows[0];
      res.json(person);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the person.' });
  }
});

// Update a person by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { gedcom_id, first_name, last_name, gender, birth_date, birth_place, death_date, death_place } = req.body;

  try {
    const result = await pool.query(
      'UPDATE people SET gedcom_id = $1, first_name = $2, last_name = $3, gender = $4, birth_date = $5, birth_place = $6, death_date = $7, death_place = $8 WHERE id = $9',
      [gedcom_id, first_name, last_name, gender, birth_date, birth_place, death_date, death_place, id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Person not found.' });
    } else {
      res.json({ message: 'Person updated successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the person.' });
  }
});

// Delete a person by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM people WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Person not found.' });
    } else {
      res.json({ message: 'Person deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the person.' });
  }
});

module.exports = router;
