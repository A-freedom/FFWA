module.exports = {depTool:(router)=> {
    const ErrorDB = require('../module/db/db').error;
    const UserDB = require('../module/db/db').user;
    router.post('/error', (req, res) => {
      ErrorDB.find({}, (err, errors) => {
        if (err) {
          return k9.catch(err);
        }
        res.send(errors);
      });
    });
    router.post('/r_error', (req, res) => {
      ErrorDB.deleteMany({}, {}, (err, result) => {
        if (err)
          return k9.catch(err);
        res.send(result);
      });
    });
    router.post('/user', (req, res) => {
      UserDB.find({}, (err, errors) => {
        if (err)
          return k9.catch(err);
        res.send(errors);
      });
    });
    router.post('/r_user', (req, res) => {
      UserDB.deleteMany({}, {}, (err, result) => {
        if (err)
          return k9.catch(err);
        res.send(result);
      });
    });
  }}