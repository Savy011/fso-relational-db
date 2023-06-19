const { Blog } = require('../models');

const router = require('express').Router();

router.get('/', async (_req, res) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [Blog.sequelize.fn('COUNT', Blog.sequelize.col('author')), 'blogs']
      ],
      group: ['author'],
      raw: true
    });

    res.json(authors);
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error ' + e });
  }
});

module.exports = router;
