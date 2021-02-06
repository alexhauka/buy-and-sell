

// routes for users
const express = require('express');
const router  = express.Router();
const { getUsers, getUserById } = require('../lib/user-queries');

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

module.exports = router;
