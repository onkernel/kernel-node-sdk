// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource auth', () => {
  // Prism tests are disabled
  test.skip('start: only required params', async () => {
    const responsePromise = client.agents.auth.start({
      profile_name: 'auth-abc123',
      target_domain: 'doordash.com',
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
  test.skip('start: required and optional params', async () => {
    const response = await client.agents.auth.start({
      profile_name: 'auth-abc123',
      target_domain: 'doordash.com',
      app_logo_url: 'https://example.com/logo.png',
      proxy: { proxy_id: 'proxy_id' },
    });
  });
});
