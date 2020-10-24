'use strict';

const server = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server.server);

describe('categories', () => {
  let category = {
    name: 'monopoly',
    display_name: 'board game',
    description: 'board game',
  };
  // the expected updated category using put
  let newcategory = {
    name: 'blaaaaaa',
    display_name: 'board game',
    description: 'board game',
  };

  it('Can post a new category record', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(category)
      .then((data) => {
        let record = data.body;
        Object.keys(category).forEach((key) => {
          expect(record[key]).toEqual(category[key]);
        });
        expect(data.status).toEqual(200);
      });
  });
  it('Can get all category records', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(category)
      .then((data) => {
        return mockRequest.get('/api/v1/categories').then((record) => {
          Object.keys(category).forEach((key) => {
            expect(record.body[record.body.length - 1][key]).toEqual(category[key]);
          });
          expect(data.status).toEqual(200);
        });
      });
  });

  it('Can get a category record by id', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(category)
      .then((data) => {
        return mockRequest
          .get(`/api/v1/categories/${data.body._id}`)
          .then((record) => {
            Object.keys(category).forEach((key) => {
              expect(record.body[0][key]).toEqual(category[key]);
            });
            expect(data.status).toEqual(200);
          });
      });
  });

  it('Can update a category record by id', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(category)
      .then((data) => {
        return mockRequest
          .put(`/api/v1/categories/${data.body._id}`)
          .send(newcategory)
          .then((record) => {
            Object.keys(newcategory).forEach((key) => {
              expect(record.body[key]).toEqual(newcategory[key]);
            });
            expect(data.status).toEqual(200);
          });
      });
  });

  it('Can delete a category record by id', async () => {
    await mockRequest
      .post('/api/v1/categories')
      .send(category)
      .then((data) => {
        return mockRequest
          .delete(`/api/v1/categories/${data.body._id}`)
          .then((record) => {
            Object.keys(newcategory).forEach((key) => {
              expect(record.body.data[key]).toEqual(newcategory[key]);
            });
            expect(record.status).toEqual(200);
          });
      });
  });
});
