

// routes for searching items
const express = require('express');
const router  = express.Router();
const searchItems = require('../lib/search-queries');

//post /search
router.get('/', (req, res) => {
  console.log(req.query);
  searchItems(req.query)
  .then((results) => {
    // res.render('template')
    res.json(results)
  });
});



module.exports = router;
