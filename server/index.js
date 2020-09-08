const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('./db/_db');
const multer = require('multer')
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
// const db = require('./db')
const sessionStore = new SequelizeStore({db})
const app = express();

module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // use .env file if in development mode
  // if (process.env.NODE_ENV !== 'production') {
  //   const dotenv = require('dotenv');
  //   const result = dotenv.config();
  //   if (result.error) {
  //     throw(result.error);
  //   }
  // }

  // logging middleware
  app.use(morgan('dev'));

  // upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`
});

  // Cross-Origin requests allowed
  app.use(cors());

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  // app.use(express.static(path.join(__dirname, 'public')));
  // app.use(express.static(path.join(__dirname, 'uploads')));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/api', require('./api/images'));
  app.use('/auth', require('./auth/index'))

  // server production assests (static file-serving middleware)
  // app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('..client/build/uploads', express.static('uploads'))
  if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static(path.join(__dirname, '../client/build')));

    // sends index.html if express doesn't recognize the route
    app.use('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
  }

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  });
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
  // await syncDb();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}