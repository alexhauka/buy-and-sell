

//  route for login (simplified for demo)
const express = require('express');
const router  = express.Router();

//  Just copied fomr users.js for simple login featuer and fetching user information to the client.
const {
  getUserById,
} = require('../lib/user-queries');


//get /login (may not need this)
router.get('/', (req, res) => {
  res.send('login page')
})

//get /login/:id
router.get('/:id', (req, res) => {
  req.session.user_id = req.params.id;
  // This is changed from redirecting to the main to sending user data.
  getUserById(req.params.id)
  .then((user) => {
    res.json(user)
  });
});

module.exports = router;
