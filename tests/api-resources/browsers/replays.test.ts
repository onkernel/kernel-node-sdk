// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource replays', () => {
  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.browsers.replays.list('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('download: required and optional params', async () => {
    const response = await client.browsers.replays.download('replay_id', { id: 'id' });
  });

  // skipped: tests are disabled for the time being
  test.skip('start', async () => {
    const responsePromise = client.browsers.replays.start('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('start: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.browsers.replays.start(
        'id',
        { framerate: 1, max_duration_in_seconds: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Kernel.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('stop: only required params', async () => {
    const responsePromise = client.browsers.replays.stop('replay_id', { id: 'id' });
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
    const response = await client.browsers.replays.stop('replay_id', { id: 'id' });
  });
});
