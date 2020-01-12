const express = require('express');
const router = express.Router();
const authentication = require('../module/mid/auther.js');
const k9 = require("../module/k9");

/* GET home page. */
router.get('/', authentication.checkAuthenticated, function (req, res) {
  res.render('index', req.user);
});
// coustomers tuff 
const customerDB = require('../module/db/db').coustomer;
const actionDB = require('../module/db/db').action;

router.get('/customers/:username',(req, res) => {
  customerDB.find({username:req.params.username}, (err, result) => {
    if (err) return k9.catch(err);
    res.send(result.book)
  })
})
router.get('/customer/:id',(req,res)=>{
  customerDB.findById(req.params.id,(err,result)=>{
    k9.findError(err,result,res)
    res.send(result)
  })
})
router.post('/customer',(req, res) => {
  const customer = new customerDB(req.body)
  customer.save((err) => {
      k9.saveError(err,res)
  })
})

router.get('/actions/:name',(req, res) => {
  // if this function will not work it will be a awiat function shat !
  customerDB.find({ name: req.params.name }, (err, result) => {
    if (err) return k9.catch(err);
    if (result.length === 0) return res.send(404)
    res.send(result.action)
  })
})
router.get('/action/:id',(req,res)=>{
  actionDB.findById(req.params.id,(err,result)=>{
    k9.findError(err,result,res)
    res.send(result)
  })
})
router.post('/action/:customer',(req, res) => {
  customerDB.findOne({name:req.params.customer},(err,result)=>{
    if(err) return k9.catch(err)
    if(!result) return res.send(404)
    const action = new actionDB(req.body)
    action.save((err)=>{
      k9.saveError(err,res,true)
      result.actions.push(action._id)
      customerDB.findByIdAndUpdate(result._id,{actions:result.actions},(err)=>{
        if(err) return k9.saveError(err,res)
        res.send(action)
      })
    })
    
  })
  
})



module.exports = router;


