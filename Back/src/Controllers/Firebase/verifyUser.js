const { auth } = require('../../config/firebase')

const verifyUser = (req, res, next) => {
  const user = auth.currentUser;
  if (user) {
    req.user = user;
    next();
  } else {
    res.redirect('https://pf-henry-plataforma-educativa.vercel.app/'); // replace '/login' with the path to your login page
  }
}

module.exports = { verifyUser }