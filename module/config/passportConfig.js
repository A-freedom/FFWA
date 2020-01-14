var localStrategy = require('passport-local');
var code = require('../code');
var User = require('../db').user;
var k9 = require('../k9');
module.exports = (passport) => {
    const authenticateUser = async (username, password, done) => {
        User.findOne({username: username}, (err, ruslt) => {
            if (err) return k9.catch(err, {username, password}, false) && done(err, false);
            if (!ruslt) {
                return done(null, false, {message: "username is not exist !"});
            } else {
                if (code.uncode(password, ruslt.password)) {
                    return done(null, ruslt)
                } else {
                    done(null, false, {message: "username or password is wrong !"});
                }
            }

        })
    };
    passport.use(new localStrategy({/*options*/ idField: '_id'}, authenticateUser));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}, (err, user) => {
            done(err, user)
        });
    });
};