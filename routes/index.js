const express = require('express');
const router = express.Router();
const authentication = require('../module/mid/auther.js');
const k9 = require("../module/k9");
/* GET home page. */
router.get('/', authentication.checkAuthenticated, function (req, res) {
  res.render('index', req.user);
});
// coustomers tuff 
const customerDB = require('../module/db').coustomer;
const actionDB = require('../module/db').action;
const userDB = require('../module/db').user;


router.get('/customers', authentication.checkAuthenticated, (req, res) => {
  bookDB.findById(req.user.book, (err, result) => {
    if (err) return k9.catch(err, { user: req.user })
    k9.searchError(result, res)
    const customersList = []
    for (const coustomerId of result.coustomers) {
      customerDB.findById(coustomerId, (err, result) => {
        if (err) return k9.catch(err, { coustomerId })
        customersList.push(result)
      })
    }
  })
})
router.get('/action/:id', authentication.checkAuthenticated, (req, res) => {
  actionDB.findById(req.params.id, (err, result) => {
    if (err) { k9.catch(err, { params: req.params }) }
    if (!result) return req.send(404)
    if (result.owner === req.user._id) return res.send(result)
    res.send(404)
  })
})
router.post('/customer', authentication.checkAuthenticated, (req, res) => {
  bookDB.findById(req.user.book, (err, result) => {
    if (err) k9.catch(err)
    if (!result) return req.send(404)
    const customer = new customerDB(req.body)
    result.customer.push(customer._id);
    bookDB.findByIdAndUpdate(req.user.book, result.customer, (err) => {
      if (err) return k9.catch(err);
      customer.save((err) => {
        k9.validateError(err, res)
      })
    })
  })
})
router.post('/action/:customerId', authentication.checkAuthenticated, (req, res) => {
  customerDB.findById(req.params.coustomerId, (err, result) => {
    if (err) k9.catch(err)
    if (!result) return req.send(404)
    if (result.owner === req.user._id) {
      const action = new actionDB(req.body)
      result.actions.push(action._id)
      customerDB.findByIdAndUpdate(req.params.coustomerId, result.actions, (err) => {
        if (err) return k9.catch(err);
        action.save((err) => {
          k9.validateError(err, res)
        })
      })
    }
  })
})
router.delete('/customer/:id', authentication.checkAuthenticated, (req, res) => {
  customerDB.findById(req.params.id, (err, result) => {
    if (err) k9.catch(err)
    if (!result) return res.send(404)
    if (result.owner === req.user._id) {
      customerDB.findByIdAndDelete(parmas._id)
    }
  })
})
router.delete('/action/:id', authentication.checkAuthenticated, (req, res) => {
  actionDB.findById(req.params.id, (err, result) => {
    if (err) k9.catch(err)
    if (!result) return res.send(404)
    if (result.owner === req.user._id) {
      actionDB.findByIdAndDelete(parmas._id)
    }
  })
})
router.put('/customer/:id', authentication.checkAuthenticated, (req, res) => {
  customerDB.findById(req.params.id, (err, result) => {
    if (err) k9.catch(err)
    if (!result) return res.send(404)
    if (result.owner === req.user._id) {
      customerDB.findByIdAndUpdate(parmas._id, req.body, (err) => {
        k9.validateError(err)
      })
    }
  })
})
router.put('/action/:id', authentication.checkAuthenticated, (req, res) => {
  actionDB.findById(req.params.id, (err, result) => {
    if (err) k9.catch(err)
    if (!result) return res.send(404)
    if (result.owner === req.user._id) {
      actionDB.findByIdAndUpdate(parmas._id, (err, result) => {
        k9.validateError(err)

      })
    }
  })
})
module.exports = router