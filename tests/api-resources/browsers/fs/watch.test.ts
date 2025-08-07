// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource watch', () => {
  // skipped: currently no good way to test endpoints with content type text/event-stream, Prism mock server will fail
  test.skip('events: only required params', async () => {
    const responsePromise = client.browsers.fs.watch.events('watch_id', { id: 'id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: currently no good way to test endpoints with content type text/event-stream, Prism mock server will fail
  test.skip('events: required and optional params', async () => {
    const response = await client.browsers.fs.watch.events('watch_id', { id: 'id' });
  });

  // skipped: tests are disabled for the time being
  test.skip('start: only required params', async () => {
    const responsePromise = client.browsers.fs.watch.start('id', { path: 'path' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('start: required and optional params', async () => {
    const response = await client.browsers.fs.watch.start('id', { path: 'path', recursive: true });
  });

  // skipped: tests are disabled for the time being
  test.skip('stop: only required params', async () => {
    const responsePromise = client.browsers.fs.watch.stop('watch_id', { id: 'id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('stop: required and optional params', async () => {
    const response = await client.browsers.fs.watch.stop('watch_id', { id: 'id' });
  });
});
