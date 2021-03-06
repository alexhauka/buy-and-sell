

// routes for users
const express = require('express');
const router  = express.Router();
const {
  getUsers,
  getUserById,
  getFavorites,
  addFavorite,
  deleteFavorite,
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
    const userId = req.session.user_id;
    getFavorites(userId)
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
    if (userId === otherId) {
      return res.redirect('/users/:id/messages');
    }
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

// post /users/:id/favorites (add to favorites)
router.post('/:id/favorites', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.user_id;
    const itemId = req.body.item_id;
    addFavorite(userId, itemId)
    .then((item) => {
      res.send(item);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
  } else {
    res.redirect('/');
  };
});

//post /users/:id/favorites/delete (delete favorite)
router.post('/:id/favorites/delete', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.user_id;
    const itemId = req.body.item_id;
    deleteFavorite(userId, itemId)
    //not sure if next two lines are needed
    .then(item => {
      res.send(item);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  } else {
    res.redirect('/');
  };
})

// post /users/:id/messages/:messageid (message a user)
router.post('/:id/messages/:messageid', (req, res) => {
  if (req.session.user_id) {
    const senderId = req.session.user_id;
    const recId = req.params.messageid
    sendMessage(req.body.message, senderId, recId)
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
