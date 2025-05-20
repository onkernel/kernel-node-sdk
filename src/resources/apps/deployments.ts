// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { Stream } from '../../core/streaming';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Deployments extends APIResource {
  /**
   * Deploy a new application
   *
   * @example
   * ```ts
   * const deployment = await client.apps.deployments.create({
   *   entrypoint_rel_path: 'src/app.py',
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  create(body: DeploymentCreateParams, options?: RequestOptions): APIPromise<DeploymentCreateResponse> {
    return this._client.post('/deploy', multipartFormRequestOptions({ body, ...options }, this._client));
  }

  /**
   * Establishes a Server-Sent Events (SSE) stream that delivers real-time logs and
   * status updates for a deployed application. The stream terminates automatically
   * once the application reaches a terminal state.
   *
   * @example
   * ```ts
   * const response = await client.apps.deployments.follow('id');
   * ```
   */
  follow(id: string, options?: RequestOptions): APIPromise<Stream<DeploymentFollowResponse>> {
    return this._client.get(path`/apps/${id}/events`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<DeploymentFollowResponse>>;
  }
}

export interface DeploymentCreateResponse {
  /**
   * List of apps deployed
   */
  apps: Array<DeploymentCreateResponse.App>;

  /**
   * Current status of the deployment
   */
  status: 'queued' | 'deploying' | 'succeeded' | 'failed';

  /**
   * Status reason
   */
  status_reason?: string;
}

export namespace DeploymentCreateResponse {
  export interface App {
    /**
     * ID for the app version deployed
     */
    id: string;

    /**
     * List of actions available on the app
     */
    actions: Array<App.Action>;

    /**
     * Name of the app
     */
    name: string;
  }

  export namespace App {
    export interface Action {
      /**
       * Name of the action
       */
      name: string;
    }
  }
}

/**
 * A stream of application events (state updates and logs) in SSE format.
 */
export type DeploymentFollowResponse = unknown;

export interface DeploymentCreateParams {
  /**
   * Relative path to the entrypoint of the application
   */
  entrypoint_rel_path: string;

  /**
   * ZIP file containing the application source directory
   */
  file: Uploadable;

  /**
   * Map of environment variables to set for the deployed application. Each key-value
   * pair represents an environment variable.
   */
  env_vars?: Record<string, string>;

  /**
   * Allow overwriting an existing app version
   */
  force?: boolean;

  /**
   * Region for deployment. Currently we only support "aws.us-east-1a"
   */
  region?: 'aws.us-east-1a';

  /**
   * Version of the application. Can be any string.
   */
  version?: string;
}

export declare namespace Deployments {
  export {
    type DeploymentCreateResponse as DeploymentCreateResponse,
    type DeploymentFollowResponse as DeploymentFollowResponse,
    type DeploymentCreateParams as DeploymentCreateParams,
  };
}
