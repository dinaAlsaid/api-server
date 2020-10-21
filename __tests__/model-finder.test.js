'use strict';

const server = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server.server);
const modelFinder = require('../lib/middleware/model-finder.js');

describe('modelFinder function', () => {
  it('requires the right model',  () => {
    let req={
        params: {
            model: 'categories'
        },
        model: 'model'
    }
    let res={};
    let next=()=>{console.log('done')};

    modelFinder(req,res,next);
    expect(req.model).toEqual(require('../models/categories/categories.collection.js'))
  });
});
