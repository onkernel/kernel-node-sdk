// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel, { toFile } from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource apps', () => {
  // skipped: tests are disabled for the time being
  test.skip('deploy: only required params', async () => {
    const responsePromise = client.apps.deploy({
      appName: 'my-awesome-app',
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      version: '1.0.0',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deploy: required and optional params', async () => {
    const response = await client.apps.deploy({
      appName: 'my-awesome-app',
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
      version: '1.0.0',
      region: 'aws.us-east-1a',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('invoke: only required params', async () => {
    const responsePromise = client.apps.invoke({
      actionName: 'analyze',
      appName: 'my-awesome-app',
      payload: '{ "data": "example input" }',
      version: '1.0.0',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('invoke: required and optional params', async () => {
    const response = await client.apps.invoke({
      actionName: 'analyze',
      appName: 'my-awesome-app',
      payload: '{ "data": "example input" }',
      version: '1.0.0',
    });
  });
});
