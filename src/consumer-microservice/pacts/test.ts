import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import axios, { AxiosPromise, Axios } from 'axios';
import path = require('path');
import { expect } from 'chai';
import { fetchDataFromProvider } from '../consumer';

const PROVIDER_API_URL = 'http://localhost:3000/data';

// Create a 'pact' between the two applications in the integration we are testing
const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'MyConsumer',
  provider: 'MyProvider',
});

const getData = (from: string): AxiosPromise => {
  return axios.request({
    baseURL: PROVIDER_API_URL,
    params: { from },
    headers: { Accept: 'application/json' },
    method: 'GET',
    url: '/data',
  });
};

const dataExample = { message: '123', timestamp: Date.now().toString() };
const EXPECTED_BODY = MatchersV3.eachLike(dataExample);

describe('GET /data', () => {
  it('returns an HTTP 200', async () => {
    provider
    .given('I want to communicate with server')
    .uponReceiving('a request for data with the builder pattern')
    .withRequest({
      method: 'GET',
      path: '/data',
      query: { from: 'today' },
      headers: { Accept: 'application/json' },
    })
    .willRespondWith({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: EXPECTED_BODY,
    });

    // return provider.executeTest((mockserver) => {
    //   // Act: test our API client behaves correctly
    //   //
    //   // Note we configure the Data Service API client dynamically to 
    //   // point to the mock service Pact created for us, instead of 
    //   // the real one
    //   // const dataService = new axios();
    //   const response = await fetchDataFromProvider(mockserver.url);

    //   // Assert: check the result
    //   expect(response.data[0]).to.deep.eq(dataExample);
    // });

  })
});