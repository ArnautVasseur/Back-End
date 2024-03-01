const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./database/database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

app.get('/', (req, res) => {
    res.redirect('/players_ie1');
});

app.get('/players_ie1', (req, res) => {
    db.all('SELECT * FROM Players_IE1', (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(rows); // Return the list of recipes as JSON response
    });
});

app.post('/inscription', (req, res) => {
    const { username, password } = req.body;

    // Vérifie si tous les paramètres sont renseignés
    if (!username || !password) {
        res.status(400).json({ error: 'username and password are required' });
        return;
    }
    
    // Ajoute le nouveau user à la table User avec points initialisé à 0
    db.run('INSERT INTO Users (username, password, points) VALUES (?, ?, 1)', [username, password], function (err) {
        if (err) {
            console.error('Error inscription:', err.message);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.json({ user_ID: this.lastID, username });
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Récupération de l'utilisateur depuis la base de données
    db.get(`
        SELECT *
        FROM Users
        WHERE username = ?
        AND password = ?`, [username, password], async (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Erreur interne du serveur' });
            return;
        }
        if (!user) {
            res.status(401).json({ error: 'username ou password incorrect' });
            return;
        }
        res.json({token : user.user_ID});
    });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});