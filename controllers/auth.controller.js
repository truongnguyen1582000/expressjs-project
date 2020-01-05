var db = require("../db");
module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var user = db.get('users').find({ email: email }).value();
    if (!user) {
        res.render('auth/login', {
            errs: [
                'Wrong email !'
            ],
            values: req.body
        })
    } else {
        var pass = req.body.password;
        if (user.password == pass) {
            res.cookie('userId', user.id)
            res.redirect('/users');
        } else {
            res.render('auth/login', {
                errs: [
                    'Wrong password !'
                ],
                values: req.body
            })
        }
    }
}