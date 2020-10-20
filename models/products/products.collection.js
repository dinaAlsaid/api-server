'use strict';
const schema = require('./products-schema.js');

class ProCollection {
  constructor() {
    this.ProModel = schema;
  }
  read(_id) {
    //if id exist find by id if not find all
    let id = _id ? { _id } : {};
    return this.ProModel.find(id);
  }
  create(record) {
    const newRec = new schema(record);
    return newRec.save();
  }
  update(_id, record) {
    return this.ProModel.findOneAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.ProModel.findOneAndDelete(_id);
  }
}

module.exports = new ProCollection();
