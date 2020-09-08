const express = require('express')
const router = express.Router();
const User = require('../db/models/user')
const Image = require('../db/models/image')

const userNotFound = next => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (error) {
    console.log('error in the login route: ', error)
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      console.log('error in signup route: ', error)
      next(error)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  // req.session.user = null
  req.session.destroy()
  console.log('session destroyed', req.session)
  res.redirect('/')
})

router.get('/me/images', async(req, res, next) => {
  try {
    if (req.user) {
      const userImages = await Image.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(userImages)
    } else {
      userNotFound(next)
    }
  } catch (error) {
    console.log('error getting images in the auth index.js:', error)
    next(error)
  }
})

router.get('/me', (req, res, next) => {
  try {
    if (req.user) {
      res.json(req.user)
    } else {
      userNotFound(next)
    }
  } catch (error) {
    next(error)
  }
})

router.use('/google', require('./google'))

module.exports = router
