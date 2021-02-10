

// routes for items
const express = require('express');
const router  = express.Router();
const {
  getItems,
  getItemById,
  addItem,
  editItem,
  deleteItem,
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

// //get /items/new
// router.get('/new', (req, res) => {
//   res.send('post a new item page')
//   // res.render('whateverTheTemplateIs')
// });

//post /items  (post a new item)
router.post('/', (req, res) => {
  if (req.session.user_id) {
    const userId = req.session.userId;
    addItem({...req.body, user_id: userId})
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
    addComment(req.body, itemId, userId)
    .then((comment) => {
      res.send(comment);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    })
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
