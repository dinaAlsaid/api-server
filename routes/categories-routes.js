'use strict';

const express = require('express');
const router = express.Router();
const categoryModel = require('../models/categories/categories.collection.js');

router.post('/', postCategories);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

//--------------------callbacks ---------------------

/** Adds a new record to the category collection **/
function postCategories(req, res) {
  let { name, display_name, description } = req.body;
  let record = { name, display_name, description };

  categoryModel.create(record).then((rec)=>{
    res.status(200).json(rec);
  }).catch((err)=>{console.error(err.message)})
}

/** retrieves records from the category collection **/
function getCategories(req, res) {
  categoryModel.read(null).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{console.error(err.message)})
}

/** retrieves one record from the category collection **/
function getCategoryById(req, res) {
  let _id = req.params.id;
  categoryModel.read(_id).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{console.error(err.message)})

}

/** updates an existing record in the category collection **/
function updateCategory(req, res) {
  let { name, display_name, description } = req.body;
  let id = req.params.id;
  let record = { name, display_name, description, id };

  categoryModel.update(id,record).then((rec)=>{
    res.status(200).json(rec);
  }).catch((err)=>{console.error(err.message)})

}

/** deletes an existing record to the category collection **/
function deleteCategory(req, res) {
  let id = req.params.id;
  categoryModel.delete(id).then((data)=>{
    res.status(200).json({data});

  }).catch((err)=>{console.error(err.message)})
}

module.exports = router;
