var db = require('../db');
var shortid = require('shortid');

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
};

module.exports.search = (req, res) => {
    var q = req.query.q;
    var usersdb = db.get('users').value();
    var matchedUsers = usersdb.filter(function(user) {
        return user.name.includes(q) == 1;
    })

    res.render('users/index', {
        users: matchedUsers
    })
}

module.exports.getId = function(req, res) {
    var id = req.params.id; // take id from path

    var user = db.get('users').find({ id: id }).value(); // find user have id

    res.render('users/view', {
        user: user
    })
}

module.exports.create = (req, res) => {
    res.render('users/create')
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    var err = [];
    if (!req.body.name) {
        err.push('Name is empty');
    }
    if (!req.body.phone) {
        err.push('Phone is empty');
    }
    if (err.length) {
        res.render('users/create', {
            errs: err,
            values: req.body
        })
    }
    db.get('users').push(req.body).write();
    res.redirect('/users')
}