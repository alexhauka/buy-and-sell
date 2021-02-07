

// routes for users
const express = require('express');
const router  = express.Router();
const { getUsers, getUserById, getFavorites } = require('../lib/user-queries');

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
  getFavorites(req.params.id)
  .then((results) => {
    // res.render('template')
    res.json(results)
  });
});

//get /users/:id/messages
router.get('/:id/messages', (req, res) => {

})

module.exports = router;
