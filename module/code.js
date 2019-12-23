const bcrypt = require('bcrypt');
const k9 = require('../module/k9');
const salt = 10;
module.exports = {
    decode: (password) => {
        try {
            return bcrypt.hashSync(password.toString(), salt);
        } catch (e) {
            k9.catch(e, {password}, true)
        }
    },
    uncode: (password, hashPassword) => {
        try {
            return bcrypt.compareSync(password.toString(), hashPassword.toString());
        } catch (e) {
            k9.catch(e, {password}, true)
        }
    },
    validatePassword: (password) => {
        // Do not show anything when the length of password is zero.
        if (password.length === 0) {
            return false;
        }
        // Create an array and push all possible values that you want in password
        const matchedCase = [];
        // matchedCase.push("[$@$!%*#?&]"); // Special Character
        matchedCase.push("[A-Z]");      // Uppercase Alpabates
        // matchedCase.push("[0-9]");      // Numbers
        matchedCase.push("[a-z]");     // Lowercase Alphabates
        // Check the conditions
        for (let i = 0; i < matchedCase.length; i++) {
            if (!(new RegExp(matchedCase[i])).test(password)) {
                return false
            }
        }
        return true
    }
};