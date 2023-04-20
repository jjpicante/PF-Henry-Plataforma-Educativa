const { auth } = require('../../config/firebase')

const verifyUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Error('Authorization header is required')
    }
    const token = authorization.split(' ')[1]
    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error(error)
    res.status(401).send({ error: 'Unauthorized' })
  }
}

module.exports = { verifyUser }