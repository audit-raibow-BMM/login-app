const express = require('express');
const bodyParser = require('body-parser');
const cryptoJS = require('crypto-js');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const log4js = require('log4js');

// Conf express
const app = express();
const PORT = 3000;

// Conf body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conf log4js
log4js.configure({
    appenders: { file: { type: 'file', filename: 'rainbow.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } }
});
const logger = log4js.getLogger();

// Conf sqlite
const db = new sqlite3.Database('rainbow_project.db'); // Vous pouvez changer le chemin pour un fichier

// Création de l'utilsiateur initial
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

    const username = 'admin';
    const password = 'admin'; 
    const hashedPassword = cryptoJS.SHA256(password).toString(); 
    const insertUser = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    insertUser.run(username, hashedPassword);
    insertUser.finalize();

    logger.info(`Init : Base de données et utilisateur créés avec succès.`);
});

// Home
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Connexion 
app.get('/login', (req, res) => {
    logger.info(`GET /login, IP : ${getClientIp(req)}`);
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    logger.info(`POST /login, IP : ${getClientIp(req)}, username: ${username}`);

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err || !row) {
            res.sendFile(path.join(__dirname, 'public', 'bad_password.html'));
        } else {
            res.redirect('/hello');
        }
    });
});

// Connexion réussit
app.get('/hello', (req, res) => {
    logger.info(`GET /hello, IP : ${getClientIp(req)}`);
    res.sendFile(path.join(__dirname, 'public', 'hello.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});


function getClientIp(req){
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress; 
}