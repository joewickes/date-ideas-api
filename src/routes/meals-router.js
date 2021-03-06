// Dependencies
const express = require('express');
const path = require('path');
require('dotenv').config();

// Use express methods for route and JSON parsing
const mealsRouter = express.Router()
const jsonBodyParser = express.json()

// Services
const mealsService = require('./../services/meals-service');
const excludedService = require('./../services/excluded-service');

mealsRouter
  .route('/')
  .get((req, res, next) => {
    mealsService.getLoggedOutMeal(req.app.get('db'))
      .then(returned => {
        res.json(returned.rows[0]);
      })
      .catch(next)
  }).post(jsonBodyParser, (req, res, next) => {
    excludedService.deleteExcludedYear(req.app.get('db'), req.body.userId)
      .then(() => {
        mealsService.getLoggedInMeal(req.app.get('db'), req.body.userId)
          .then(response => {
            res.json(response.rows[0]);
          })
        ;
      })
      .catch(next)
    ;
  })

module.exports = mealsRouter;