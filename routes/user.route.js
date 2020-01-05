var express = require('express')
var router = express.Router();

var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate')


router.get('/', controller.index)

router.get('/cookies', function(req, res, next) {
    res.cookie('user-id', 1234)
    res.send('Fucking bitch ! :))');
})

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.getId)

router.post('/create', validate.postCreate, controller.postCreate)

module.exports = router;