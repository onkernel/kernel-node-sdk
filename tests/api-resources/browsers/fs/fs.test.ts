// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Kernel, { toFile } from '@onkernel/sdk';

const client = new Kernel({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource fs', () => {
  // skipped: tests are disabled for the time being
  test.skip('createDirectory: only required params', async () => {
    const responsePromise = client.browsers.fs.createDirectory('id', { path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('createDirectory: required and optional params', async () => {
    const response = await client.browsers.fs.createDirectory('id', { path: '/J!', mode: '0611' });
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteDirectory: only required params', async () => {
    const responsePromise = client.browsers.fs.deleteDirectory('id', { path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteDirectory: required and optional params', async () => {
    const response = await client.browsers.fs.deleteDirectory('id', { path: '/J!' });
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteFile: only required params', async () => {
    const responsePromise = client.browsers.fs.deleteFile('id', { path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('deleteFile: required and optional params', async () => {
    const response = await client.browsers.fs.deleteFile('id', { path: '/J!' });
  });

  // skipped: tests are disabled for the time being
  test.skip('fileInfo: only required params', async () => {
    const responsePromise = client.browsers.fs.fileInfo('id', { path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('fileInfo: required and optional params', async () => {
    const response = await client.browsers.fs.fileInfo('id', { path: '/J!' });
  });

  // skipped: tests are disabled for the time being
  test.skip('listFiles: only required params', async () => {
    const responsePromise = client.browsers.fs.listFiles('id', { path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('listFiles: required and optional params', async () => {
    const response = await client.browsers.fs.listFiles('id', { path: '/J!' });
  });

  // skipped: tests are disabled for the time being
  test.skip('move: only required params', async () => {
    const responsePromise = client.browsers.fs.move('id', { dest_path: '/J!', src_path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('move: required and optional params', async () => {
    const response = await client.browsers.fs.move('id', { dest_path: '/J!', src_path: '/J!' });
  });

  // skipped: tests are disabled for the time being
  test.skip('readFile: required and optional params', async () => {
    const response = await client.browsers.fs.readFile('id', { path: '/J!' });
  });

  // skipped: tests are disabled for the time being
  test.skip('setFilePermissions: only required params', async () => {
    const responsePromise = client.browsers.fs.setFilePermissions('id', { mode: '0611', path: '/J!' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('setFilePermissions: required and optional params', async () => {
    const response = await client.browsers.fs.setFilePermissions('id', {
      mode: '0611',
      path: '/J!',
      group: 'group',
      owner: 'owner',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('writeFile: only required params', async () => {
    const responsePromise = client.browsers.fs.writeFile(
      'id',
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { path: '/J!' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('writeFile: required and optional params', async () => {
    const response = await client.browsers.fs.writeFile(
      'id',
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { path: '/J!', mode: '0611' },
    );
  });
});
