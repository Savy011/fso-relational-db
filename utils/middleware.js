const errorHandler = (error, _req, res, next) => {
  console.error(error)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: 'Missing Data Fields' })
  } 

  next(error)
}

module.exports = { errorHandler }