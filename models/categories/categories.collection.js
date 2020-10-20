'use strict';

const schema = require('./categories-schema.js');

class CategCollection {
  constructor() {
    this.categModel = schema;
  }
  read(_id) {
    //if id exist find by id if not find all 
    let id = _id ? { _id } : {};
    return this.categModel.find(id);
  }
  create(record) {
    const newRec = new schema(record);
    return newRec.save();
  }
  update(_id, record) {
    return this.categModel.findOneAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.categModel.findOneAndDelete(_id);
  }
}

module.exports= new CategCollection();