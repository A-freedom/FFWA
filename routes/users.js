const express = require('express');
const router = express.Router();
const authentication = require('../module/mid/auther.js');
const passport = require('passport');
const userDB = require('../module/db').user;
const code = require('../module/code.js');
const k9 = require('../module/k9')
const bookDB = require('../module/db').book

/* GET users listing. */
router.get('/', authentication.checkAuthenticated, function (req, res) {

    res.send(req.user);
});
router.get('/login', authentication.checkNotAuthenticated, (req, res) => {
    res.render('login')
});
router.get('/register', authentication.checkNotAuthenticated, (req, res) => {
    res.render('register')
});
router.get('/update', authentication.checkNotAuthenticated, (req, res) => {
    res.redirect('/users/')
});


/* POST users listing. */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));
router.post('/register', authentication.checkNotAuthenticated, (req, res) => {
    const user = new userDB(req.body);
    const errorObject = {};
    // password validate
    // if (code.validatePassword(req.body.password)){
    user.password = code.decode(req.body.password);
    // }else {
    //     errorObject.password = 'is invalid'
    // }
    user.validate((err) => {
        if (err) return k9.validateError(err, res)
        const book = new bookDB()
        book.save((err) => {
            if (err) return k9.validateError(err, res)
            user.book = book._id
            user.save((err) => {
                k9.validateError(err, res)

            })
        })
    })
});
router.post('/logout', authentication.checkAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/')
});
router.post('/update', authentication.checkAuthenticated, (req, res) => {
    // const x = User.findByIdAndUpdate(req.body._id,req.body)
    userDB.findById(req.user._id, function (err, doc) {
        if (err) console.log(err);
        doc.username = req.body.username;
        doc.password = code.decode(req.body.password);
        doc.name = req.body.name;
        doc.email = req.body.email;
        doc.save((err) => {
            k9.validateError(err, res)
        });
        res.redirect('/')
    });
});

module.exports = router;
