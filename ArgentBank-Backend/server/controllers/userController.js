const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription d'utilisateur
module.exports.createUser = async (req, res) => {
  const serviceData = req.body;
  try {
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12);
    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      userName: serviceData.userName,
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur dans userService.js', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion d'utilisateur
module.exports.loginUser = async (req, res) => {
  const serviceData = req.body;
  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé!' });
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Mot de passe invalide' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'clé-secrète-par-défaut',
      { expiresIn: '1d' }
    );

    // Retourne le jeton et les informations de l'utilisateur
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error('Erreur dans userService.js', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtention du profil utilisateur
module.exports.getUserProfile = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization.split('Bearer ')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé!' });
    }

    // Retourne les informations de l'utilisateur, en excluant le mot de passe
    res.status(200).json(user.toObject());
  } catch (error) {
    console.error('Erreur dans userService.js', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mise à jour du profil utilisateur
module.exports.updateUserProfile = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization.split('Bearer ')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        userName: req.body.userName,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé!' });
    }

    // Retourne les informations mises à jour de l'utilisateur
    res.status(200).json(user.toObject());
  } catch (error) {
    console.error('Erreur dans userService.js', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



