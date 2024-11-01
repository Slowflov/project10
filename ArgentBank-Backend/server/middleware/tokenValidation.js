const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => {
  let response = {
    status: 401, // Définition du statut par défaut pour les erreurs
    message: 'Non autorisé' // Message d'erreur général
  };

  try {
    // Vérification de la présence de l'en-tête d'autorisation
    if (!req.headers.authorization) {
      throw new Error('Le jeton est manquant dans l\'en-tête');
    }

    // Extraction du jeton de l'en-tête
    const userToken = req.headers.authorization.split('Bearer ')[1].trim(); // Ajout d'un espace après 'Bearer'

    // Vérification du jeton
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || 'clé-secrète-par-défaut'
    );

    // En cas de validation réussie du jeton, on sauvegarde les informations utilisateur dans l'objet requête
    req.user = decodedToken; // Sauvegarde du jeton décodé pour un usage ultérieur
    return next(); // Passage au middleware suivant
  } catch (error) {
    console.error('Erreur dans tokenValidation.js', error);
    response.message = error.message; // Définition du message d'erreur issu de l'exception
  }

  return res.status(response.status).send(response); // Envoi de la réponse avec l'erreur
};


