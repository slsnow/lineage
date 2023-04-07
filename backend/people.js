// people.js
const express = require('express');
const router = express.Router();
const db = require('./database');

// Create a person
router.post('/', async (req, res) => {
  try {
    const { gedcom_id, first_name, last_name } = req.body;
    const result = await db.query(
      'INSERT INTO people (gedcom_id, first_name, last_name) VALUES ($1, $2, $3) RETURNING *',
      [gedcom_id, first_name, last_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create a person' });
  }
});

// Get a person by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM people WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get a person by ID' });
  }
});

// Find a person by name (search)
router.get('/search/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await db.query(
      "SELECT * FROM people WHERE first_name ILIKE $1 OR last_name ILIKE $1",
      [`%${name}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to find a person by name' });
  }
});

// Modify/update a person (by ID)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { gedcom_id, first_name, last_name } = req.body;
    const result = await db.query(
      'UPDATE people SET gedcom_id = $1, first_name = $2, last_name = $3 WHERE id = $4 RETURNING *',
      [gedcom_id, first_name, last_name, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update a person' });
  }
});

// Delete a person by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM people WHERE id = $1', [id]);
    res.status(204).json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete a person' });
  }
});

module.exports = router;
