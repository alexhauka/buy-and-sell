

// routes for searching items
const express = require('express');
const router  = express.Router();
const searchItems = require('../lib/search-queries');

//get /search
router.get('/', (req, res) => {
  res.send('search page');
});

//post /search
router.post('/', (req, res) => {
  searchItems(req.body)
  .then((results) => {
    // res.render('template')
    res.json(results)
  });
});



module.exports = router;
