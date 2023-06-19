const express = require('express');
const app = express();
require('express-async-errors');

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors');
const { errorHandler } = require('./utils/middleware');

app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

start();
