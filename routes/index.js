const express = require('express');
const router = express.Router();
const authentication = require('../module/mid/auther.js');
const k9 = require("../module/k9");

/* GET home page. */
router.get('/',authentication.checkAuthenticated, function(req, res) {
  res.render('index', req.user);
});
router.get('/shat',(req,res)=>{
  // req.flash('notify', 'This is a test notification.')
  // res.send('l,l,')
  res.render('index', req.user);
});
// dep tool
const ErrorDB = require('../module/db/db').error;
const UserDB = require('../module/db/db').user;
router.post('/error',(req,res)=>{
  ErrorDB.find({},(err,errors)=>{
    if (err) {
      return k9.catch(err);
    }
    res.send(errors)
  })
});
router.post('/r_error',(req,res)=>{
  ErrorDB.deleteMany({},{},(err,result)=>{
    if (err)return  k9.catch(err);
    res.send(result)
  })
});
router.post('/user',(req,res)=>{
  UserDB.find({},(err,errors)=>{
    if (err) return k9.catch(err);
    res.send(errors)
  })
});
router.post('/r_user',(req,res)=>{
  UserDB.deleteMany({},{},(err,result)=>{
    if (err)return  k9.catch(err);
    res.send(result)
  })
});

module.exports = router;
