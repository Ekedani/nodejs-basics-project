const express = require('express');
const AccountController = require('../controllers/Account.Controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Placeholder');
});

router.put('/password', AccountController.changePassword);

module.exports = router;
