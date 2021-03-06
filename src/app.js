require('dotenv').config();
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  app = express(),
  { NODE_ENV } = require('./config'),
  CommentsRouter = require('./comments/comments-router'),
  StoryRouter = require('./story/story-router'),
  authRouter = require('./auth/auth-router'),
  UsersRouter = require('./users/users-router'),
  morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the It Takes a Village API!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', UsersRouter);
app.use('/api/story', StoryRouter);
app.use('/api/comment', CommentsRouter);

app.use(function errorHandler(error, req, res, next) {
  console.error(error);
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
