'use strict';

const express = require('express');
const router = express.Router();
const modelFinder = require('../lib/middleware/model-finder.js');

router.param('model', modelFinder);

router.post('/:model', postHandler);
router.get('/:model', getAllHandler);
router.get('/:model/:id', getByIdHandler);
router.put('/:model/:id', updateHandler);
router.delete('/:model/:id', deleteHandler);

/** Adds a new record to the product collection **/
function postHandler(req, res) {
  // it's not going to take the ctegory anyway for the category model
  let record;
  if (req.params.model === 'todo') {
    let { text, rating, assignee, complete } = req.body;
    record = { text, rating, assignee, complete };

  } else {
    let { category, name, display_name, description } = req.body;
    record = { category, name, display_name, description };
  }

  req.model
    .create(record)
    .then((rec) => {
      res.status(200).json(rec);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

/** retrieves records from the product collection **/
function getAllHandler(req, res) {
  req.model
    .read(null)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

/** retrieves one record from the product collection **/
function getByIdHandler(req, res) {
  let _id = req.params.id;
  req.model
    .read(_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

/** updates an existing record in the product collection **/
function updateHandler(req, res) {
  // also not mapping the category so it is fine like this
  let record;
  let id = req.params.id;
  if (req.params.model === 'todo') {
    let { text, rating, assignee, complete } = req.body;
    record = { text, rating, assignee, complete, id };

  } else {
    let { category, name, display_name, description } = req.body;
    record = { category, name, display_name, description, id };
  }
  req.model
    .update(id, record)
    .then((rec) => {
      res.status(200).json(rec);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

/** deletes an existing record to the product collection **/
function deleteHandler(req, res) {
  let id = req.params.id;
  req.model
    .delete(id)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.error(err.message);
    });
}

module.exports = router;
