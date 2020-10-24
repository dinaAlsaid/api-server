'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('api server products', () => {
  let sentObj = {
    category: 'board games',
    name: 'monopoly',
    display_name: 'board game',
    description: 'board game',
    _id: 1,
  };

  it('should respond with 201 on post', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(sentObj)
      .then((results) => {
        expect(results.status).toBe(201);
      });
  });
  it('should respond with 200 on get (get all products)', async () => {
    await mockRequest.get('/api/v1/products').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('should respond with 200 on get (get one product)', async () => {
    await mockRequest.get('/api/v1/products/1').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('Can update a product record by using put', async () => {
    let updatedObj = {
      category: 'board',
      name: 'snake and ladder',
      display_name: 'board game',
      description: 'board game',
      _id: 1,
    };
    await mockRequest
      .put('/api/v1/products/1')
      .send(updatedObj)
      .then((results) => {
        expect(results.status).toBe(200);
      });
  });
  it('Can update a product record by using patch', async () => {
    let updatedObj = {
      name: 'snake and ladder',
    };

    await mockRequest
      .patch('/api/v1/products/1')
      .send(updatedObj)
      .then((results) => {
        expect(results.status).toBe(200);
      });
  });

  it('Can delete a product record by id', async () => {
    await mockRequest.delete('/api/v1/products/1').then((results) => {
      expect(results.status).toBe(200);
    });
  });
});

describe('api server categories', () => {
  let sentObj = {
    name: 'toys',
    display_name: 'toddler toys',
    description: 'toys for toddlers',
    _id: 1,
  };

  it('should respond with 201 on post', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(sentObj)
      .then((results) => {
        expect(results.status).toBe(201);
      });
  });
  it('should respond with 200 on get (get all categories)', async () => {
    await mockRequest.get('/api/v1/categories').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('should respond with 200 on get (get one category)', async () => {
    await mockRequest.get('/api/v1/categories/1').then((results) => {
      expect(results.status).toBe(200);
    });
  });
  it('Can update a category record by using put', async () => {
    let updatedObj = {
      name: 'board game ',
      display_name: 'put method',
      description: 'board game',
      _id: 1,
    };
    await mockRequest
      .put('/api/v1/categories/1')
      .send(updatedObj)
      .then((results) => {
        expect(results.status).toBe(200);
      });
  });
  it('Can update a category record by using patch', async () => {
    let updatedObj = {
      name: 'patch method',
    };

    await mockRequest
      .patch('/api/v1/categories/1')
      .send(updatedObj)
      .then((results) => {
        expect(results.status).toBe(200);
      });
  });

  it('Can delete a categories record by id', async () => {
    await mockRequest.delete('/api/v1/categories/1').then((results) => {
      expect(results.status).toBe(200);
    });
  });
});
