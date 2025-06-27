// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DeploymentsAPI from './deployments';
import {
  DeploymentCreateParams,
  DeploymentCreateResponse,
  DeploymentFollowResponse,
  Deployments,
} from './deployments';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Apps extends APIResource {
  deployments: DeploymentsAPI.Deployments = new DeploymentsAPI.Deployments(this._client);

  /**
   * List applications. Optionally filter by app name and/or version label.
   *
   * @example
   * ```ts
   * const apps = await client.apps.list();
   * ```
   */
  list(query: AppListParams | null | undefined = {}, options?: RequestOptions): APIPromise<AppListResponse> {
    return this._client.get('/apps', { query, ...options });
  }
}

export type AppListResponse = Array<AppListResponse.AppListResponseItem>;

export namespace AppListResponse {
  /**
   * Summary of an application version.
   */
  export interface AppListResponseItem {
    /**
     * Unique identifier for the app version
     */
    id: string;

    /**
     * Name of the application
     */
    app_name: string;

    /**
     * Deployment ID
     */
    deployment: string;

    /**
     * Deployment region code
     */
    region: 'aws.us-east-1a';

    /**
     * Version label for the application
     */
    version: string;

    /**
     * Environment variables configured for this app version
     */
    env_vars?: { [key: string]: string };
  }
}

export interface AppListParams {
  /**
   * Filter results by application name.
   */
  app_name?: string;

  /**
   * Filter results by version label.
   */
  version?: string;
}

Apps.Deployments = Deployments;

export declare namespace Apps {
  export { type AppListResponse as AppListResponse, type AppListParams as AppListParams };

  export {
    Deployments as Deployments,
    type DeploymentCreateResponse as DeploymentCreateResponse,
    type DeploymentFollowResponse as DeploymentFollowResponse,
    type DeploymentCreateParams as DeploymentCreateParams,
  };
}
