const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Регистрация пользователя
module.exports.createUser = async (req, res) => {
  const serviceData = req.body;
  try {
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
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
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in userService.js', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Вход пользователя
module.exports.loginUser = async (req, res) => {
  const serviceData = req.body;
  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Password is invalid' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1d' }
    );

    // Возвращаем токен и информацию о пользователе
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error('Error in userService.js', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Получение профиля пользователя
module.exports.getUserProfile = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization.split('Bearer ')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Возвращаем информацию о пользователе, исключая пароль
    res.status(200).json(user.toObject());
  } catch (error) {
    console.error('Error in userService.js', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Обновление профиля пользователя
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
      return res.status(404).json({ message: 'User not found!' });
    }

    // Возвращаем обновленную информацию о пользователе
    res.status(200).json(user.toObject());
  } catch (error) {
    console.error('Error in userService.js', error);
    res.status(500).json({ message: 'Server error' });
  }
};


