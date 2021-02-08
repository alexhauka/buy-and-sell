

// routes for items
const express = require('express');
const router  = express.Router();
const { getItems, getItemById, addItem } = require('../lib/item-queries');

// get /items
router.get('/', (req, res) => {
  getItems()
  .then((items) => {
    //res.render('whateverTheTemplateIs')
    res.json(items)
  });
});

//get /items/:id
router.get('/:id', (req, res) => {
  getItemById(req.params.id)
  .then((item) => {
    //res.render('whateverTheTemplateIs')
    res.json(item)
  });
});

//get /items/new
router.get('/new', (req, res) => {
  res.send('post a new item page')
  // res.render('whateverTheTemplateIs')
})

//post items/new
router.post('/new', (req, res) => {
  const userId = req.session.userId;
  addItem({...req.body, user_id: userId})
  .then(item => {
    res.send(item);
  })
  .catch(e => {
    console.error(e);
    res.send(e);
  });
})

module.exports = router;
