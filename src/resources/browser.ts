// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Browser extends APIResource {
  /**
   * Create Browser Session
   */
  createSession(
    body: BrowserCreateSessionParams,
    options?: RequestOptions,
  ): APIPromise<BrowserCreateSessionResponse> {
    return this._client.post('/browser', { body, ...options });
  }
}

export interface BrowserCreateSessionResponse {
  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * Remote URL for live viewing the browser session
   */
  remote_url: string;

  /**
   * Unique identifier for the browser session
   */
  sessionId: string;
}

export interface BrowserCreateSessionParams {
  /**
   * Kernel App invocation ID
   */
  invocationId: string;
}

export declare namespace Browser {
  export {
    type BrowserCreateSessionResponse as BrowserCreateSessionResponse,
    type BrowserCreateSessionParams as BrowserCreateSessionParams,
  };
}
