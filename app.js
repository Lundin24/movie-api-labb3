const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

// --- 1. GET ALL MOVIES ---
app.get('/movies', (req, res) => {
    const query = 'SELECT * FROM movies';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// --- 2. GET ONE MOVIE ---
app.get('/movies/:id', (req, res) => {
    const query = 'SELECT * FROM movies WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// --- 3. CREATE MOVIE ---
app.post('/movies', (req, res) => {
    const { title, director, year, rating } = req.body;
    const query = 'INSERT INTO movies (title, director, year, rating) VALUES (?, ?, ?, ?)';
    db.query(query, [title, director, year, rating], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Movie added!', id: result.insertId });
    });
});

// --- 4. UPDATE MOVIE ---
app.put('/movies/:id', (req, res) => {
    const { title, director, year, rating } = req.body;
    const query = 'UPDATE movies SET title = ?, director = ?, year = ?, rating = ? WHERE id = ?';
    db.query(query, [title, director, year, rating, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Movie updated!' });
    });
});

// --- 5. DELETE MOVIE ---
app.delete('/movies/:id', (req, res) => {
    const query = 'DELETE FROM movies WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Movie deleted!' });
    });
});

// --- 6. STATS ---
app.get('/stats', (req, res) => {
    const query = 'SELECT COUNT(*) AS total_movies, AVG(rating) AS average_rating FROM movies';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});