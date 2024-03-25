// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'ouss@gmail.com' && password === 'mm') {
        res.json({ message: 'Authentification réussie' });
    } else {
        res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
