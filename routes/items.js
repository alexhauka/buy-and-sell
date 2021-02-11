

// routes for items
const express = require('express');
const router  = express.Router();
const {
  getItems,
  getItemById,
  getUserItems,
  addItem,
  editItem,
  deleteItem,
  getComments,
  addComment
} = require('../lib/item-queries');

// get /items (get all)
router.get('/', (req, res) => {
  getItems()
  .then((items) => {
    //res.render('whateverTheTemplateIs')
    res.json(items)
  });
});


//get /items/:id (get one)
router.get('/:id', (req, res) => {
  getItemById(req.params.id)
  .then((item) => {
    //res.render('whateverTheTemplateIs')
    res.json(item)
  });
});

// get /items/user (get a user's items)
router.get('/user', (req, res) => {
  const userId = req.session.user_id
  getUserItems(userId)
  .then((items) => {
    res.json(items)
  });
});



// //get /items/new
// router.get('/new', (req, res) => {
//   res.send('post a new item page')
//   // res.render('whateverTheTemplateIs')
// });

//get /items/:id/comments
router.get('/:id/comments', (req, res) => {
  getComments(req.params.id)
  .then((item) => {
    res.json(item)
  });
});

//post /items  (post a new item)
router.post('/', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.user_id;
    console.log(userId);
    console.log(req.query);
    addItem({...req.query, user_id: userId})
    .then(item => {
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

//post items/:id  (comment on item)
router.post('/:id', (req, res) => {
  if (req.session.user_id) {
    const itemId = req.params.id;
    const userId = req.session.user_id;
    console.log(itemId, userId, req.body);
    addComment(req.body, itemId, userId)
    .then((comment) => {
      console.log('Comment registered.');
      res.json(comment);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  } else {
    res.redirect('/');
  };
});

//post items/:id/edit (edit an owned item)
router.post('/:id/edit', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.user_id;
    const itemId = req.params.id;
    editItem({...req.body, user_id: userId, id: itemId})
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
});

//post items/:id/delete (delete owned item)
router.post('/:id/delete', (req, res) => {
  if (req.session.user_id) {
    const itemId = req.params.id;
    const userId = req.session.user_id;
    deleteItem({id: itemId, user_id: userId})
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
  }
})

module.exports = router;
