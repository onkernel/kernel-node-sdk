// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Apps extends APIResource {
  /**
   * Deploy a new application
   *
   * @example
   * ```ts
   * const response = await client.apps.deploy({
   *   appName: 'my-awesome-app',
   *   file: fs.createReadStream('path/to/file'),
   *   version: '1.0.0',
   * });
   * ```
   */
  deploy(body: AppDeployParams, options?: RequestOptions): APIPromise<AppDeployResponse> {
    return this._client.post('/apps/deploy', multipartFormRequestOptions({ body, ...options }, this._client));
  }

  /**
   * Invoke an application
   *
   * @example
   * ```ts
   * const response = await client.apps.invoke({
   *   appName: 'my-awesome-app',
   *   payload: '{ "data": "example input" }',
   *   version: '1.0.0',
   * });
   * ```
   */
  invoke(body: AppInvokeParams, options?: RequestOptions): APIPromise<AppInvokeResponse> {
    return this._client.post('/apps/invoke', { body, ...options });
  }

  /**
   * Get an app invocation by id
   *
   * @example
   * ```ts
   * const response = await client.apps.retrieveInvocation(
   *   'ckqwer3o20000jb9s7abcdef',
   * );
   * ```
   */
  retrieveInvocation(id: string, options?: RequestOptions): APIPromise<AppRetrieveInvocationResponse> {
    return this._client.get(path`/apps/invocations/${id}`, options);
  }
}

export interface AppDeployResponse {
  /**
   * ID of the deployed app version
   */
  id: string;

  /**
   * Success message
   */
  message: string;

  /**
   * Status of the deployment
   */
  success: boolean;
}

export interface AppInvokeResponse {
  /**
   * ID of the invocation
   */
  id: string;

  /**
   * Status of the invocation
   */
  status: string;
}

export interface AppRetrieveInvocationResponse {
  id: string;

  appName: string;

  finishedAt: string | null;

  input: string;

  output: string;

  startedAt: string;

  status: string;
}

export interface AppDeployParams {
  /**
   * Name of the application
   */
  appName: string;

  /**
   * ZIP file containing the application
   */
  file: Uploadable;

  /**
   * Version of the application
   */
  version: string;

  /**
   * AWS region for deployment (e.g. "aws.us-east-1a")
   */
  region?: string;
}

export interface AppInvokeParams {
  /**
   * Name of the application
   */
  appName: string;

  /**
   * Input data for the application
   */
  payload: unknown;

  /**
   * Version of the application
   */
  version: string;
}

export declare namespace Apps {
  export {
    type AppDeployResponse as AppDeployResponse,
    type AppInvokeResponse as AppInvokeResponse,
    type AppRetrieveInvocationResponse as AppRetrieveInvocationResponse,
    type AppDeployParams as AppDeployParams,
    type AppInvokeParams as AppInvokeParams,
  };
}
