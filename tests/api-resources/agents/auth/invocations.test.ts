// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invocations', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.agents.auth.invocations.retrieve('invocation_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('discover', async () => {
    const responsePromise = client.agents.auth.invocations.discover('invocation_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('discover: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.agents.auth.invocations.discover(
        'invocation_id',
        { login_url: 'https://doordash.com/account/login' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Kernel.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('exchange: only required params', async () => {
    const responsePromise = client.agents.auth.invocations.exchange('invocation_id', { code: 'abc123xyz' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('exchange: required and optional params', async () => {
    const response = await client.agents.auth.invocations.exchange('invocation_id', { code: 'abc123xyz' });
  });

  // Prism tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.agents.auth.invocations.submit('invocation_id', {
      field_values: { email: 'user@example.com', password: '********' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('submit: required and optional params', async () => {
    const response = await client.agents.auth.invocations.submit('invocation_id', {
      field_values: { email: 'user@example.com', password: '********' },
    });
  });
});
