// Dependencies
const express = require('express');
const path = require('path');
require('dotenv').config();

// Use express methods for route and JSON parsing
const activitiesRouter = express.Router()
const jsonBodyParser = express.json()

// Services
const activitiesService = require('./../services/activities-service');
const excludedService = require('./../services/excluded-service');

activitiesRouter
  .route('/')
  .get((req, res, next) => {
    activitiesService.getLoggedOutActivity(req.app.get('db'))
      .then(returned => {
        res.json(returned.rows[0]);
      })
      .catch(next)
  }).post(jsonBodyParser, (req, res, next) => {
    excludedService.deleteExcludedYear(req.app.get('db'), req.body.userId)
      .then(() => {
        activitiesService.getLoggedInActivity(req.app.get('db'), req.body.userId)
        .then(response => {
          res.json(response.rows[0]);
        })
      }).catch(next)
    ;
  })

module.exports = activitiesRouter;