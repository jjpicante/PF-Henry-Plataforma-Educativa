const { auth } = require('../../config/firebase');

const postLogout = async (req, res) => {
  try {
    await auth.signOut(res);
    res.clearCookie('connect.sid');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

module.exports = { postLogout };