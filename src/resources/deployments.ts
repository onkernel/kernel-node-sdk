// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Deployments extends APIResource {
  /**
   * Create a new deployment.
   *
   * @example
   * ```ts
   * const deployment = await client.deployments.create({
   *   entrypoint_rel_path: 'src/app.py',
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  create(body: DeploymentCreateParams, options?: RequestOptions): APIPromise<DeploymentCreateResponse> {
    return this._client.post('/deployments', multipartFormRequestOptions({ body, ...options }, this._client));
  }

  /**
   * Get information about a deployment's status.
   *
   * @example
   * ```ts
   * const deployment = await client.deployments.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DeploymentRetrieveResponse> {
    return this._client.get(path`/deployments/${id}`, options);
  }

  /**
   * Establishes a Server-Sent Events (SSE) stream that delivers real-time logs and
   * status updates for a deployment. The stream terminates automatically once the
   * deployment reaches a terminal state.
   *
   * @example
   * ```ts
   * const response = await client.deployments.follow('id');
   * ```
   */
  follow(id: string, options?: RequestOptions): APIPromise<Stream<DeploymentFollowResponse>> {
    return this._client.get(path`/deployments/${id}/events`, {
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<DeploymentFollowResponse>>;
  }
}

/**
 * Deployment record information.
 */
export interface DeploymentCreateResponse {
  /**
   * Unique identifier for the deployment
   */
  id: string;

  /**
   * Timestamp when the deployment was created
   */
  created_at: string;

  /**
   * Deployment region code
   */
  region: 'aws.us-east-1a';

  /**
   * Current status of the deployment
   */
  status: 'queued' | 'in_progress' | 'running' | 'failed' | 'stopped';

  /**
   * Relative path to the application entrypoint
   */
  entrypoint_rel_path?: string;

  /**
   * Environment variables configured for this deployment
   */
  env_vars?: Record<string, string>;

  /**
   * Status reason
   */
  status_reason?: string;

  /**
   * Timestamp when the deployment was last updated
   */
  updated_at?: string | null;
}

/**
 * Deployment record information.
 */
export interface DeploymentRetrieveResponse {
  /**
   * Unique identifier for the deployment
   */
  id: string;

  /**
   * Timestamp when the deployment was created
   */
  created_at: string;

  /**
   * Deployment region code
   */
  region: 'aws.us-east-1a';

  /**
   * Current status of the deployment
   */
  status: 'queued' | 'in_progress' | 'running' | 'failed' | 'stopped';

  /**
   * Relative path to the application entrypoint
   */
  entrypoint_rel_path?: string;

  /**
   * Environment variables configured for this deployment
   */
  env_vars?: Record<string, string>;

  /**
   * Status reason
   */
  status_reason?: string;

  /**
   * Timestamp when the deployment was last updated
   */
  updated_at?: string | null;
}

/**
 * Union type representing any deployment event.
 */
export type DeploymentFollowResponse =
  | DeploymentFollowResponse.LogEvent
  | DeploymentFollowResponse.DeploymentStateEvent
  | DeploymentFollowResponse.AppVersionSummaryEvent
  | DeploymentFollowResponse.ErrorEvent;

export namespace DeploymentFollowResponse {
  /**
   * A log entry from the application.
   */
  export interface LogEvent {
    /**
     * Event type identifier (always "log").
     */
    event: 'log';

    /**
     * Log message text.
     */
    message: string;

    /**
     * Time the log entry was produced.
     */
    timestamp: string;
  }

  /**
   * An event representing the current state of a deployment.
   */
  export interface DeploymentStateEvent {
    /**
     * Deployment record information.
     */
    deployment: DeploymentStateEvent.Deployment;

    /**
     * Event type identifier (always "deployment_state").
     */
    event: 'deployment_state';

    /**
     * Time the state was reported.
     */
    timestamp: string;
  }

  export namespace DeploymentStateEvent {
    /**
     * Deployment record information.
     */
    export interface Deployment {
      /**
       * Unique identifier for the deployment
       */
      id: string;

      /**
       * Timestamp when the deployment was created
       */
      created_at: string;

      /**
       * Deployment region code
       */
      region: 'aws.us-east-1a';

      /**
       * Current status of the deployment
       */
      status: 'queued' | 'in_progress' | 'running' | 'failed' | 'stopped';

      /**
       * Relative path to the application entrypoint
       */
      entrypoint_rel_path?: string;

      /**
       * Environment variables configured for this deployment
       */
      env_vars?: Record<string, string>;

      /**
       * Status reason
       */
      status_reason?: string;

      /**
       * Timestamp when the deployment was last updated
       */
      updated_at?: string | null;
    }
  }

  /**
   * Summary of an application version.
   */
  export interface AppVersionSummaryEvent {
    /**
     * Unique identifier for the app version
     */
    id: string;

    /**
     * List of actions available on the app
     */
    actions: Array<AppVersionSummaryEvent.Action>;

    /**
     * Name of the application
     */
    app_name: string;

    /**
     * Event type identifier (always "app_version_summary").
     */
    event: 'app_version_summary';

    /**
     * Deployment region code
     */
    region: 'aws.us-east-1a';

    /**
     * Time the state was reported.
     */
    timestamp: string;

    /**
     * Version label for the application
     */
    version: string;

    /**
     * Environment variables configured for this app version
     */
    env_vars?: Record<string, string>;
  }

  export namespace AppVersionSummaryEvent {
    /**
     * An action available on the app
     */
    export interface Action {
      /**
       * Name of the action
       */
      name?: string;
    }
  }

  /**
   * An error event from the application.
   */
  export interface ErrorEvent {
    error: ErrorEvent.Error;

    /**
     * Event type identifier (always "error").
     */
    event: 'error';

    /**
     * Time the error occurred.
     */
    timestamp: string;
  }

  export namespace ErrorEvent {
    export interface Error {
      /**
       * Application-specific error code (machine-readable)
       */
      code: string;

      /**
       * Human-readable error description for debugging
       */
      message: string;

      /**
       * Additional error details (for multiple errors)
       */
      details?: Array<Error.Detail>;

      inner_error?: Error.InnerError;
    }

    export namespace Error {
      export interface Detail {
        /**
         * Lower-level error code providing more specific detail
         */
        code?: string;

        /**
         * Further detail about the error
         */
        message?: string;
      }

      export interface InnerError {
        /**
         * Lower-level error code providing more specific detail
         */
        code?: string;

        /**
         * Further detail about the error
         */
        message?: string;
      }
    }
  }
}

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
    type DeploymentRetrieveResponse as DeploymentRetrieveResponse,
    type DeploymentFollowResponse as DeploymentFollowResponse,
    type DeploymentCreateParams as DeploymentCreateParams,
  };
}
