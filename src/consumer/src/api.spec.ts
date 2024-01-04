import { API } from "./consumer";
import {describe, it, before, beforeEach, after, afterEach } from "mocha";
import { assert, expect } from "chai";
const nock = require('nock');

describe('test fetching all products', () => {
  const consumer: API = new API();

  it('fetch all products (from provider server)', async () => {
    const response = await consumer.getProducts();
    assert.equal(response.status, 200);
    assert.isTrue(response.data.length > 0);
  });

  it('fetch all products (from mock object)', async () => {
    const products = [
      { id: 1, name: 'botox', price: 200 },
      { id: 2, name: 'juvederm 1', price: 100 },
      { id: 3, name: 'juvederm 2', price: 150 }
    ]
    nock(consumer.url)
        .get('/products')
        .reply(200,
            products,
            {'Access-Control-Allow-Origin': '*'});
    const respProducts = await consumer.getProducts();
    expect(respProducts.data).to.eql(products);
  });
});