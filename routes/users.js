

// routes for users
const express = require('express');
const router  = express.Router();
const {
  getUsers,
  getUserById,
  getFavorites,
  getMessages,
  getMessage,
  sendMessage
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
      // console.log(results)
      res.json(results)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
  } else {
    res.redirect('/');
  }
});

//get /users/:id/messages/:messageid
router.get('/:id/messages/:messageid', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.user_id;
    const otherId = req.params.messageid;
    getMessage(userId, otherId)
    .then((results) => {
      // res.render('template')
      res.json(results)
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
  } else {
    res.redirect('/')
  }
})

// post /users/:id/messages/:messageid (message a user)
router.post('/:id/messages/:messageid', (req, res) => {
  if (req.session.user_id) {
    const senderId = req.session.user_id;
    const recId = req.params.messageid
    sendMessage(req.body, senderId, recId)
    .then((message) => {
      res.send(message);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
  } else {
    res.redirect('/');
  }
})

module.exports = router;
