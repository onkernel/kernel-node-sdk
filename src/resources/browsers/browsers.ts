// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BrowsersAPI from './browsers';
import * as ReplaysAPI from './replays';
import {
  ReplayDownloadParams,
  ReplayListResponse,
  ReplayStartParams,
  ReplayStartResponse,
  ReplayStopParams,
  Replays,
} from './replays';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Browsers extends APIResource {
  replays: ReplaysAPI.Replays = new ReplaysAPI.Replays(this._client);

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

Browsers.Replays = Replays;

export declare namespace Browsers {
  export {
    type BrowserPersistence as BrowserPersistence,
    type BrowserCreateResponse as BrowserCreateResponse,
    type BrowserRetrieveResponse as BrowserRetrieveResponse,
    type BrowserListResponse as BrowserListResponse,
    type BrowserCreateParams as BrowserCreateParams,
    type BrowserDeleteParams as BrowserDeleteParams,
  };

  export {
    Replays as Replays,
    type ReplayListResponse as ReplayListResponse,
    type ReplayStartResponse as ReplayStartResponse,
    type ReplayDownloadParams as ReplayDownloadParams,
    type ReplayStartParams as ReplayStartParams,
    type ReplayStopParams as ReplayStopParams,
  };
}
