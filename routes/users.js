

// routes for users
const express = require('express');
const router  = express.Router();
const {
  getUsers,
  getUserById,
  getFavorites,
  getMessages
} = require('../lib/user-queries');

//get users
router.get('/', (req, res) => {
  getUsers()
  .then((users) => {
    //res.render('template')
    res.json(users)
  });
});

//get /users/:id
router.get('/:id', (req, res) => {
  getUserById(req.params.id)
  .then((user) => {
    //res.render('template')
    res.json(user)
  });
});

//get /users/:id/favorites
router.get('/:id/favorites', (req, res) => {
  if (req.session.user_id) {
    getFavorites(req.params.id)
    .then((results) => {
      // res.render('template')
      res.json(results)
    });
  } else {
    res.redirect('/');
  }
});

//get /users/:id/messages
router.get('/:id/messages', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.user_id;
    getMessages(userId)
    .then((results) => {
      // res.render('template')
      res.json(results)
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
