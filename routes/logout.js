

// routes for logout
const express = require('express');
const router  = express.Router();


//get /logout
router.get('/', (req, res) => {
  req.session = null;
  res.redirect('/')
})

module.exports = router;
