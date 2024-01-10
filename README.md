# Rainbow Login App

## Consigne initiale

Créer une page qui requière un login et un mot de passe qui sera transformé en hash selon 3 choix possibles (sha1/sha256/MD5) avant d'être retourné au serveur (exécution côté client cryptojs).

Si l'authentification est réussie, une page "hello" est présentée à l'utilisateur avec une image de 2 Mo et une de 30Ko, sinon, la page de connexion est présentée à nouveau avec une image de 500ko.

Mettre en place Log4j pour la journalisation (on fera un point sur l'attaque log4j JNDI dans la restitution) et y logger les événements.

## Requierements

- node.js et npm
- nodemon
```bash
npm i -g nodemon
```
- Les dépendances du projets soont disponibles dans le fichier `package.json`

## Lancement

Installation des dépendances : 

```bash
npm i
```

Démarrage du serveur de developpement

```bash
nodemon index.js
```


