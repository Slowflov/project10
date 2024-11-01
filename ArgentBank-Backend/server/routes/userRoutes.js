const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tokenValidation = require('../middleware/tokenValidation');

// Inscription de l'utilisateur
router.post('/signup', userController.createUser);

// Connexion de l'utilisateur
router.post('/login', userController.loginUser);

// Récupération du profil de l'utilisateur
router.get(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
);

// Mise à jour du profil de l'utilisateur
router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
);

// Nouvelle route pour récupérer les informations de l'utilisateur
router.get('/', tokenValidation.validateToken, userController.getUserProfile);

module.exports = router;


