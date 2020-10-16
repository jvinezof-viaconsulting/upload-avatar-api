var express = require('express');
var router = express.Router();
var controller = require('../controllers/avatarController');

router.post("/upload", controller.upload);

module.exports = router;
