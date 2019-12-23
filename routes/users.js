const express = require('express');
const router = express.Router();
const authentication = require('../module/mid/auther.js');
const passport = require('passport');
const User = require('../module/db/db').user;
const code = require('../module/code.js');

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
router.post('/register',authentication.checkNotAuthenticated ,(req, res) => {
    const user = new User(req.body);
    const errorObject = {};
    // password validate
    // if (code.validatePassword(req.body.password)){
        user.password = code.decode(req.body.password);
    // }else {
    //     errorObject.password = 'is invalid'
    // }
    user.save((err) => {
        if (err) {
            for(const property in err.errors){
                errorObject[property] = err.errors[property].message;
            }
            res.send(errorObject)
        }else {
            res.send(true);
        }

    })
});
router.post('/logout', authentication.checkAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/')
});
router.post('/update', authentication.checkAuthenticated, (req, res) => {
    // const x = User.findByIdAndUpdate(req.body._id,req.body)
    User.findById(req.user._id, function (err, doc) {
        if (err) console.log(err);
        doc.username = req.body.username;
        doc.password = code.decode(req.body.password);
        doc.name = req.body.name;
        doc.email = req.body.email;
        doc.save();
        res.redirect('/')
    });
});

module.exports = router;
