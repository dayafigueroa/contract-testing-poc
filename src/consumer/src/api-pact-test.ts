import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { API } from "./consumer";
import { describe, it } from 'mocha';
import { expect } from 'chai';

import path = require('path');

const PROVIDER_API_URL = 'http://localhost:3000';
const dataExample = [{id: 1, name: 'botox', price: 200}];

// create object pact for provider
const provider = new PactV3({
  consumer: 'ClientMicroservice',
  provider: 'ProviderMicroservice',
  host: '127.0.0.1',
  dir: path.resolve(`${process.cwd()}/src/consumer`, 'pacts')
});

describe('GET /products', () => {
  it('returns status 200', async () => {
    await provider.addInteraction({
      states: [{ description: "products exist" }],
      uponReceiving: "get all products",
      withRequest: {
        method: "GET",
        path: "/products",
      },
      willRespondWith: {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: MatchersV3.eachLike(dataExample),
      },
    });

    await provider.executeTest(async (mockService) => {
      const api = new API(mockService.url);

      // make request to Pact mock server
      const response = await api.getProducts();
      console.log(response.data);
      expect(response.status).to.eql(200);
      expect(response.data).to.be.an('array');
      expect(response.data.length).to.be.greaterThan(0);
      const prod = response.data[0].find((element: any) => element.name === 'botox');
      expect(prod.name).to.eql('botox');

  });
});

});