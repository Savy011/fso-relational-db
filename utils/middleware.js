const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const errorHandler = (error, _req, res, next) => {
  console.error(error)

  if (error.name === 'SequelizeValidationError' && error.message === 'Validation error: Validation is on username failed') {
	return res.status(400).send({ error: 'Given username is not a valid e-mail address' })
  }
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: 'Missing Data Fields' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
  console.log(authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }  
  }  else {
    return res.status(401).json({ error: 'token missing' })  
  }

  next()
}


module.exports = { errorHandler, tokenExtractor }