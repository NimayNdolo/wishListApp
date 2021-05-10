const express = require('express')
const passport = require('passport')
const List = require('../models/list')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/lists', requireToken, (req, res, next) => {
  const id = req.user.id
  List.find({ owner: id })
    .then(lists => {
      return lists.map(list => list.toObject())
    })
    .then(list => res.status(200).json({ list: list }))
    .catch(next)
})

router.get('/lists/:id', requireToken, (req, res, next) => {
  List.findById(req.params.id)
    .then(handle404)
    .then(list => res.status(200).json({ list: list.toObject() }))
    .catch(next)
})

router.post('/lists', requireToken, (req, res, next) => {
  const list = req.body.list
  list.owner = req.user.id

  List.create(req.body.list)
    .then(list => {
      res.status(201).json({ list })
    })
    .catch(next)
})

router.patch('/lists/:id', requireToken, removeBlanks, (req, res, next) => {
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

router.delete('/lists/:id', requireToken, (req, res, next) => {
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
