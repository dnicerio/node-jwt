const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  errors = { email: '', password: '' };

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

// signup_get, signup_post, login_get, login_post
signup_get = (req, res) => {
  res.render('signup');
}

signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  }
  catch (err) {
    handleErrors(err);
    res.status(400).json({ errors });
  }
}

login_get = (req, res) => {
  res.render('login');
}

login_post = (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post
}
