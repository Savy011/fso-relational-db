const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (_req, res) => {
  const users = await User.findAll({
	include: {
		model: Blog
	}
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.put('/:username', async (req, res) => {
	const user = await User.findOne({ where: { username: req.params.username } })

	if (user) {
		const updatedUser = await user.update(
			{ username: req.body.username },
			{ where: { username: req.params.username } }
		)

    return res.status(200).json(updatedUser)
	} else {
    return res.status(404)
  }

})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router