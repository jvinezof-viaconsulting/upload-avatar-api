var express = require('express');
var router = express.Router();

var avatars = require('./avatars');

router.use('/avatars', avatars);

module.exports = router;
