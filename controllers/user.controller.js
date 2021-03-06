const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get("users").value()
    })
}

module.exports.search = (req, res) => {
    let q = req.query.q;
    var matchedUsers = db.get("users").value().filter( (user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index', {
        users: matchedUsers
    })
}

module.exports.create = (req, res) => res.render('users/create')

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate()
    console.log(res.locals)
    db.get("users").push(req.body).write();
    res.redirect('/users')
}

module.exports.get = (req, res) => {
    let userId = req.params.userId;
    let user = db.get('users').find({ id: userId}).value();

    res.render('users/detail', {
        user: user
    })
}
