// signup_get, signup_post, login_get, login_post

signup_get = (req, res) => {
  res.render('signup');
}

signup_post = (req, res) => {
  res.send('new signup');
}

login_get = (req, res) => {
  res.render('login');
}

login_post = (req, res) => {
  res.send('user login');
}

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post
}
