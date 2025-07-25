// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Apps extends APIResource {
  /**
   * List applications. Optionally filter by app name and/or version label.
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
     * List of actions available on the app
     */
    actions: Array<Shared.AppAction>;

    /**
     * Name of the application
     */
    app_name: string;

    /**
     * Deployment ID
     */
    deployment: string;

    /**
     * Environment variables configured for this app version
     */
    env_vars: { [key: string]: string };

    /**
     * Deployment region code
     */
    region: 'aws.us-east-1a';

    /**
     * Version label for the application
     */
    version: string;
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

export declare namespace Apps {
  export { type AppListResponse as AppListResponse, type AppListParams as AppListParams };
}
