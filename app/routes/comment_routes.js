const express = require('express')
const passport = require('passport')
const List = require('../models/list')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// COMMENT ROUTES

// CREATE
router.post('/comment/:id', requireToken, (req, res, next) => {
  const comment = req.body.list.comments
  const commentId = req.params.id
  List.findById(commentId)
    .then(handle404)
    .then(list => {
      list.comments.push({ content: comment, owner: req.user.id })
      return list.save()
    })
    .then(list => {
      res.status(201).json({ list })
    })
    .catch(next)
})

// DELETE

router.delete('/comment/:commentId/:listId', requireToken, (req, res, next) => {
  const commentId = req.params.commentId
  const listId = req.params.listId
  List.findById(listId)
    .then(handle404)
    .then(list => {
      requireOwnership(req, list)
      list.comments.id(commentId).remove()
      return list.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
