'use strict';

const express = require('express');
const router = express.Router();
const productModel = require('../models/products/products.collection.js');

router.post('/', postProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.patch('/:id', patchProduct);
router.delete('/:id', deleteProduct);

//callback functions

/** Adds a new record to the product collection **/
function postProduct(req, res) {
  let { category, name, display_name, description } = req.body;
  let record = { category, name, display_name, description };

  productModel
    .create(record)
    .then((rec) => {
      res.status(200).json(rec);
    })
    .catch((err) => {
      console.error(err.message);
    });
}
/** retrieves records from the product collection **/

function getProducts(req, res) {
  productModel
    .read(null)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err.message);
    });

}

/** retrieves one record from the product collection **/
function getProductById(req, res) {
  let _id = req.params.id;
  productModel
    .read(_id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

/** updates an existing record in the product collection **/
function updateProduct(req, res) {
  let { category, name, display_name, description } = req.body;
  let id = req.params.id;
  let record = { category, name, display_name, description, id };

  productModel
    .update(id, record)
    .then((rec) => {
      res.status(200).json(rec);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

/** updates an existing record in the product collection **/
function patchProduct(req, res) {
  let id = req.params.id;
  let record = {};

  Object.keys(req.body).forEach((key) => {
    record[key] = req.body[key];
  });

  productModel.update(id,record).then((rec)=>{
    res.status(200).json(rec);

  });
}

/** deletes an existing record to the product collection **/
function deleteProduct(req, res) {
  let id = req.params.id;
  productModel
    .delete(id)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      console.error(err.message);
    });
}

module.exports = router;
