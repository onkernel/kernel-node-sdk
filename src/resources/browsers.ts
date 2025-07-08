// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as BrowsersAPI from './browsers';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Browsers extends APIResource {
  /**
   * Create a new browser session from within an action.
   *
   * @example
   * ```ts
   * const browser = await client.browsers.create();
   * ```
   */
  create(
    body: BrowserCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrowserCreateResponse> {
    return this._client.post('/browsers', { body, ...options });
  }

  /**
   * Get information about a browser session.
   *
   * @example
   * ```ts
   * const browser = await client.browsers.retrieve(
   *   'htzv5orfit78e1m2biiifpbv',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<BrowserRetrieveResponse> {
    return this._client.get(path`/browsers/${id}`, options);
  }

  /**
   * List active browser sessions
   *
   * @example
   * ```ts
   * const browsers = await client.browsers.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<BrowserListResponse> {
    return this._client.get('/browsers', options);
  }

  /**
   * Delete a persistent browser session by its persistent_id.
   *
   * @example
   * ```ts
   * await client.browsers.delete({
   *   persistent_id: 'persistent_id',
   * });
   * ```
   */
  delete(params: BrowserDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { persistent_id } = params;
    return this._client.delete('/browsers', {
      query: { persistent_id },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Delete a browser session by ID
   *
   * @example
   * ```ts
   * await client.browsers.deleteByID(
   *   'htzv5orfit78e1m2biiifpbv',
   * );
   * ```
   */
  deleteByID(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/browsers/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get browser session replay.
   *
   * @example
   * ```ts
   * const response = await client.browsers.retrieveReplay(
   *   'htzv5orfit78e1m2biiifpbv',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  retrieveReplay(id: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/browsers/${id}/replay`, {
      ...options,
      headers: buildHeaders([{ Accept: 'video/mp4' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

/**
 * Optional persistence configuration for the browser session.
 */
export interface BrowserPersistence {
  /**
   * Unique identifier for the persistent browser session.
   */
  id: string;
}

export interface BrowserCreateResponse {
  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * Unique identifier for the browser session
   */
  session_id: string;

  /**
   * Remote URL for live viewing the browser session. Only available for non-headless
   * browsers.
   */
  browser_live_view_url?: string;

  /**
   * Optional persistence configuration for the browser session.
   */
  persistence?: BrowserPersistence;

  /**
   * Remote URL for viewing the browser session replay if enabled
   */
  replay_view_url?: string;
}

export interface BrowserRetrieveResponse {
  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * Unique identifier for the browser session
   */
  session_id: string;

  /**
   * Remote URL for live viewing the browser session. Only available for non-headless
   * browsers.
   */
  browser_live_view_url?: string;

  /**
   * Optional persistence configuration for the browser session.
   */
  persistence?: BrowserPersistence;

  /**
   * Remote URL for viewing the browser session replay if enabled
   */
  replay_view_url?: string;
}

export type BrowserListResponse = Array<BrowserListResponse.BrowserListResponseItem>;

export namespace BrowserListResponse {
  export interface BrowserListResponseItem {
    /**
     * Websocket URL for Chrome DevTools Protocol connections to the browser session
     */
    cdp_ws_url: string;

    /**
     * Unique identifier for the browser session
     */
    session_id: string;

    /**
     * Remote URL for live viewing the browser session. Only available for non-headless
     * browsers.
     */
    browser_live_view_url?: string;

    /**
     * Optional persistence configuration for the browser session.
     */
    persistence?: BrowsersAPI.BrowserPersistence;

    /**
     * Remote URL for viewing the browser session replay if enabled
     */
    replay_view_url?: string;
  }
}

export interface BrowserCreateParams {
  /**
   * If true, launches the browser using a headless image (no VNC/GUI). Defaults to
   * false.
   */
  headless?: boolean;

  /**
   * action invocation ID
   */
  invocation_id?: string;

  /**
   * Optional persistence configuration for the browser session.
   */
  persistence?: BrowserPersistence;

  /**
   * If true, enables replay recording of the browser session. Defaults to false.
   */
  replay?: boolean;

  /**
   * If true, launches the browser in stealth mode to reduce detection by anti-bot
   * mechanisms.
   */
  stealth?: boolean;
}

export interface BrowserDeleteParams {
  /**
   * Persistent browser identifier
   */
  persistent_id: string;
}

export declare namespace Browsers {
  export {
    type BrowserPersistence as BrowserPersistence,
    type BrowserCreateResponse as BrowserCreateResponse,
    type BrowserRetrieveResponse as BrowserRetrieveResponse,
    type BrowserListResponse as BrowserListResponse,
    type BrowserCreateParams as BrowserCreateParams,
    type BrowserDeleteParams as BrowserDeleteParams,
  };
}
