const express = require('express')
const passport = require('passport')
const List = require('../models/list')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/list', requireToken, (req, res, next) => {
  List.find()
    .then(list => {
      return list.map(list => list.toObject())
    })
    .then(list => res.status(200).json({ list: list }))

    .catch(next)
})

router.get('/list/:id', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then(list => res.status(200).json({ list: list.toObject() }))
    .catch(next)
})

router.post('/list', requireToken, (req, res, next) => {
  req.body.list.owner = req.user.id

  List.create(req.body.list)
    .then(list => {
      res.status(201).json({ list: list.toObject() })
    })
    .catch(next)
})

router.patch('/list/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.list.owner

  List.findById(req.params.id)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      return list.updateOne(req.body.list)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/list/:id', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      list.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
