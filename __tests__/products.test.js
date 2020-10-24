'use strict';

const server = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server.server);

describe('Products', () => {
  let product = {
    category: 'board',
    name: 'monopoly',
    display_name: 'board game',
    description: 'board game',
  };
  // the expected updated product using put
  let newProduct = {
    category: 'board',
    name: 'blaaaaaa',
    display_name: 'board game',
    description: 'board game',
  };

  it('Can post a new product record', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(product)
      .then((data) => {
        let record = data.body;
        Object.keys(product).forEach((key) => {
          expect(record[key]).toEqual(product[key]);
        });
        expect(data.status).toEqual(200);
      });
  });
  it('Can get all product records', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(product)
      .then((data) => {
        return mockRequest.get('/api/v1/products').then((record) => {
          Object.keys(product).forEach((key) => {
            expect(record.body[record.body.length - 1][key]).toEqual(product[key]);
          });
          expect(data.status).toEqual(200);
        });
      });
  });

  it('Can get a product record by id', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(product)
      .then((data) => {
        return mockRequest
          .get(`/api/v1/products/${data.body._id}`)
          .then((record) => {
            Object.keys(product).forEach((key) => {
              expect(record.body[0][key]).toEqual(product[key]);
            });
            expect(data.status).toEqual(200);
          });
      });
  });

  it('Can update a product record by id using put', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(product)
      .then((data) => {
        return mockRequest
          .put(`/api/v1/products/${data.body._id}`)
          .send(newProduct)
          .then((record) => {
            Object.keys(newProduct).forEach((key) => {
              expect(record.body[key]).toEqual(newProduct[key]);
            });
            expect(data.status).toEqual(200);
          });
      });
  });
  it('Can update a product record by id using patch', async () => {
    let patchingpart = {
      name: 'patch method',
    };
    let updated={
      category: 'board',
      name: 'patch method',
      display_name: 'board game',
      description: 'board game',
    }
    await mockRequest
    .post('/api/v1/products')
    .send(product)
    .then((data) => {
      return mockRequest
        .patch(`/api/v1/products/${data.body._id}`)
        .send(patchingpart)
        .then((record) => {
          Object.keys(updated).forEach((key) => {
            expect(record.body[key]).toEqual(updated[key]);
          });
          expect(data.status).toEqual(200);
        });
    });
  });

  it('Can delete a product record by id', async () => {
    await mockRequest
      .post('/api/v1/products')
      .send(product)
      .then((data) => {
        return mockRequest
          .delete(`/api/v1/products/${data.body._id}`)
          .then((record) => {
            Object.keys(newProduct).forEach((key) => {
              expect(record.body.data[key]).toEqual(newProduct[key]);
            });
            expect(record.status).toEqual(200);
          });
      });
  });
});

