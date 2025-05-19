// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Browsers extends APIResource {
  /**
   * Create Browser Session
   *
   * @example
   * ```ts
   * const browser = await client.browsers.create({
   *   invocation_id: 'ckqwer3o20000jb9s7abcdef',
   * });
   * ```
   */
  create(body: BrowserCreateParams, options?: RequestOptions): APIPromise<BrowserCreateResponse> {
    return this._client.post('/browsers', { body, ...options });
  }

  /**
   * Get Browser Session by ID
   *
   * @example
   * ```ts
   * const browser = await client.browsers.retrieve(
   *   'e5bf36fe-9247-4e2b-8b5a-2f594cc1c073',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<BrowserRetrieveResponse> {
    return this._client.get(path`/browsers/${id}`, options);
  }
}

export interface BrowserCreateResponse {
  /**
   * Remote URL for live viewing the browser session
   */
  browser_live_view_url: string;

  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * Unique identifier for the browser session
   */
  session_id: string;
}

export interface BrowserRetrieveResponse {
  /**
   * Remote URL for live viewing the browser session
   */
  browser_live_view_url: string;

  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * Unique identifier for the browser session
   */
  session_id: string;
}

export interface BrowserCreateParams {
  /**
   * action invocation ID
   */
  invocation_id: string;
}

export declare namespace Browsers {
  export {
    type BrowserCreateResponse as BrowserCreateResponse,
    type BrowserRetrieveResponse as BrowserRetrieveResponse,
    type BrowserCreateParams as BrowserCreateParams,
  };
}
