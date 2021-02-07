

// routes for items
const express = require('express');
const router  = express.Router();
const { getItems, getItemById } = require('../lib/item-queries');

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

module.exports = router;
