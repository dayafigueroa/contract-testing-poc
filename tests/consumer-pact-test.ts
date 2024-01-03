import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import axios, { AxiosPromise } from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import path = require('path');

const PROVIDER_API_URL = 'http://localhost:3000';

// client service
const getProducts = (from: string): AxiosPromise => {
  return axios.request({
    baseURL: PROVIDER_API_URL,
    params: {from},
   // headers: { 'Accept': 'application/json' },
    method: 'GET',
    url: '/products',
  });
};

const dataExample = [{id: 1, name: 'botox', price: 200}];

// create object pact for provider
const provider = new PactV3({
  consumer: 'ClientMicroservice',
  provider: 'ProviderMicroservice',
  port: 3000, // Port for the provider service
  dir: path.resolve(`${process.cwd()}/src/`, 'pacts')
});

describe('GET /products', () => {
before(() => {
  provider.given('a list of products')
  .uponReceiving('a request for products')
  .withRequest({
        method: 'GET',
        path: '/products',
        // headers: {
        //   Accept: 'application/json',
        // }
      })
  .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: MatchersV3.eachLike(dataExample),
      },
    );
})

  it('returns status 200', async () => {
    return provider.executeTest(async (mockService) => {
      mockService.url = PROVIDER_API_URL
      const products = await getProducts(mockService.url);
      console.log(products)
  
      // Perform assertions on the retrieved products
      expect(products.status).to.equal(200);
      // expect(products.data).to.be.an('array');
      // expect(products.data[0]).to.not.be.empty;
      // expect(products.data[0]).to.have.property('id');
      // expect(products.data[0]).to.have.property('name');
      // expect(products.data[0]).to.have.property('price');
      // return;
  });
  });
});