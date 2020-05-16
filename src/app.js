require("dotenv").config();
const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  helmet = require("helmet"),
  app = express(),
  { NODE_ENV } = require("./config");

//const authRouter = require('./auth/auth-router')
const CommentsRouter = require('./comments/comments-router')
const StoryRouter = require('./story/story-router')
const morganOption = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';


app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//app.use('/api/auth', authRouter)
app.use('/api', CommentsRouter)
app.use('api', StoryRouter)
app.use(function errorHandler(error, req, res, next) {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
