// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel, { toFile } from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource deployments', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.deployments.create({
      entrypoint_rel_path: 'src/app.py',
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
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
  test.skip('create: required and optional params', async () => {
    const response = await client.deployments.create({
      entrypoint_rel_path: 'src/app.py',
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      env_vars: { foo: 'string' },
      force: false,
      region: 'aws.us-east-1a',
      version: '1.0.0',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.deployments.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.deployments.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.deployments.list({ app_name: 'app_name' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Kernel.NotFoundError);
  });

  // Prism doesn't support text/event-stream responses
  test.skip('follow', async () => {
    const responsePromise = client.deployments.follow('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism doesn't support text/event-stream responses
  test.skip('follow: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.deployments.follow(
        'id',
        { since: '2025-06-20T12:00:00Z' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Kernel.NotFoundError);
  });
});
