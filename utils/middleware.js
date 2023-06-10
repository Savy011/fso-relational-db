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

module.exports = { errorHandler }