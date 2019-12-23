module.exports = {
    checkAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login')
    },
    checkNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        return next();
    }
};