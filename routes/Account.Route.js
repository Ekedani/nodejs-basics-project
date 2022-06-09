const express = require('express');
// eslint-disable-next-line no-unused-vars
const AccountController = require('../controllers/Account.Controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Placeholder');
});

router.put('/password', (req, res) => {
  res.send('Placeholder');
});
