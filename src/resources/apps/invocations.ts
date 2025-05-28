// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Invocations extends APIResource {
  /**
   * Invoke an application
   *
   * @example
   * ```ts
   * const invocation = await client.apps.invocations.create({
   *   action_name: 'analyze',
   *   app_name: 'my-app',
   *   version: '1.0.0',
   * });
   * ```
   */
  create(body: InvocationCreateParams, options?: RequestOptions): APIPromise<InvocationCreateResponse> {
    return this._client.post('/invocations', { body, ...options });
  }

  /**
   * Get an app invocation by id
   *
   * @example
   * ```ts
   * const invocation = await client.apps.invocations.retrieve(
   *   'rr33xuugxj9h0bkf1rdt2bet',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<InvocationRetrieveResponse> {
    return this._client.get(path`/invocations/${id}`, options);
  }

  /**
   * Update invocation status or output
   *
   * @example
   * ```ts
   * const invocation = await client.apps.invocations.update(
   *   'id',
   *   { status: 'succeeded' },
   * );
   * ```
   */
  update(
    id: string,
    body: InvocationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<InvocationUpdateResponse> {
    return this._client.patch(path`/invocations/${id}`, { body, ...options });
  }
}

export interface InvocationCreateResponse {
  /**
   * ID of the invocation
   */
  id: string;

  /**
   * Status of the invocation
   */
  status: 'queued' | 'running' | 'succeeded' | 'failed';

  /**
   * The return value of the action that was invoked, rendered as a JSON string. This
   * could be: string, number, boolean, array, object, or null.
   */
  output?: string;

  /**
   * Status reason
   */
  status_reason?: string;
}

export interface InvocationRetrieveResponse {
  /**
   * ID of the invocation
   */
  id: string;

  /**
   * Name of the action invoked
   */
  action_name: string;

  /**
   * Name of the application
   */
  app_name: string;

  /**
   * RFC 3339 Nanoseconds timestamp when the invocation started
   */
  started_at: string;

  /**
   * Status of the invocation
   */
  status: 'queued' | 'running' | 'succeeded' | 'failed';

  /**
   * RFC 3339 Nanoseconds timestamp when the invocation finished (null if still
   * running)
   */
  finished_at?: string | null;

  /**
   * Output produced by the action, rendered as a JSON string. This could be: string,
   * number, boolean, array, object, or null.
   */
  output?: string;

  /**
   * Payload provided to the invocation. This is a string that can be parsed as JSON.
   */
  payload?: string;

  /**
   * Status reason
   */
  status_reason?: string;
}

export interface InvocationUpdateResponse {
  /**
   * ID of the invocation
   */
  id: string;

  /**
   * Name of the action invoked
   */
  action_name: string;

  /**
   * Name of the application
   */
  app_name: string;

  /**
   * RFC 3339 Nanoseconds timestamp when the invocation started
   */
  started_at: string;

  /**
   * Status of the invocation
   */
  status: 'queued' | 'running' | 'succeeded' | 'failed';

  /**
   * RFC 3339 Nanoseconds timestamp when the invocation finished (null if still
   * running)
   */
  finished_at?: string | null;

  /**
   * Output produced by the action, rendered as a JSON string. This could be: string,
   * number, boolean, array, object, or null.
   */
  output?: string;

  /**
   * Payload provided to the invocation. This is a string that can be parsed as JSON.
   */
  payload?: string;

  /**
   * Status reason
   */
  status_reason?: string;
}

export interface InvocationCreateParams {
  /**
   * Name of the action to invoke
   */
  action_name: string;

  /**
   * Name of the application
   */
  app_name: string;

  /**
   * Version of the application
   */
  version: string;

  /**
   * If true, invoke asynchronously. When set, the API responds 202 Accepted with
   * status "queued".
   */
  async?: boolean;

  /**
   * Input data for the action, sent as a JSON string.
   */
  payload?: string;
}

export interface InvocationUpdateParams {
  /**
   * New status for the invocation.
   */
  status: 'succeeded' | 'failed';

  /**
   * Updated output of the invocation rendered as JSON string.
   */
  output?: string;
}

export declare namespace Invocations {
  export {
    type InvocationCreateResponse as InvocationCreateResponse,
    type InvocationRetrieveResponse as InvocationRetrieveResponse,
    type InvocationUpdateResponse as InvocationUpdateResponse,
    type InvocationCreateParams as InvocationCreateParams,
    type InvocationUpdateParams as InvocationUpdateParams,
  };
}
