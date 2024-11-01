// Fichier principal du serveur (server.js)
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./swagger.yaml'); // Chargement du document Swagger
const dbConnection = require('./database/connection'); // Module de connexion à la base de données

// Pas besoin de charger les variables d'environnement, car nous avons supprimé l'utilisation de DB_URI
// require('dotenv').config();  // Supprimé

const app = express();
const PORT = process.env.PORT || 3001;

// Connexion à la base de données
dbConnection();  // Connexion à la base de données sans utilisation de DB_URI

// Gestion des problèmes de CORS
app.use(cors());

// Middleware pour les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gestion des routes utilisateur
app.use('/api/v1/user', require('./routes/userRoutes')); // Routes utilisateur

// Documentation API
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Configuration de Swagger UI
}

app.get('/', (req, res) => {
  res.send('Bonjour depuis mon serveur Express v2!');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});






