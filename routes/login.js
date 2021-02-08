

//  route for login (simplified for demo)
const express = require('express');
const router  = express.Router();


//get /login (may not need this)
router.get('/', (req, res) => {
  res.send('login page')
})

//get /login/:id
router.get('/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
  console.log(req.session.user_id)
});

module.exports = router;
