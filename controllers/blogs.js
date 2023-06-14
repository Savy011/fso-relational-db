const router = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll({
	include: {
		model: User
	}
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
	const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id});
    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (req.decodedToken.id === req.blog.userId) { 
      await req.blog.destroy()
      res.status(204).json({ message: 'Blog deleted' });
    } else {
      return res.status(401).json({ error: 'Only the Blog creator can delete a blog' })
    }
  } else {
    res.status(404)
  }
});

router.put('/:id', blogFinder, async (req, res, next) => {
  const body = req.body
  if (req.blog) {
    try {
      if (!body || !body.likes) {
        return res.status(400).json({ error: "Missing or invalid request body" });
      }

      const updatedBlog = await req.blog.update(
        { likes: body.likes },
        { where: { id: req.params.id } }
      )
      return res.status(200).json(updatedBlog)
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router