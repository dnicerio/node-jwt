require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'Email is not registered';
  }

  // incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'Password is incorrect';
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    });
  }

  return errors;
}

// create jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

// signup_get, signup_post, login_get, login_post, logout_get
signup_get = (req, res) => {
  res.render('signup');
}

signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    handleErrors(err);
    res.status(400).json({ errors });
  }
}

login_get = (req, res) => {
  res.render('login');
}

login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    handleErrors(err);
    res.status(400).json({ errors });
  }
}

logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
}

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
}
