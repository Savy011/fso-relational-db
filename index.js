const express = require('express');
const app = express();
require('express-async-errors')

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogRouter = require('./controllers/blogs');
const { errorHandler } = require('./utils/middleware');

app.use(express.json());
app.use('/api/blogs', blogRouter)
app.use(errorHandler)

const start = async () => {
	await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
	})
}

start()