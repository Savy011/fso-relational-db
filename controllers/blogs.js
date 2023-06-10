const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
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

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(204).json({ message: 'Blog deleated' });
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