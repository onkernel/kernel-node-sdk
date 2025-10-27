// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BrowsersAPI from './browsers';
import * as ComputerAPI from './computer';
import {
  Computer,
  ComputerCaptureScreenshotParams,
  ComputerClickMouseParams,
  ComputerDragMouseParams,
  ComputerMoveMouseParams,
  ComputerPressKeyParams,
  ComputerScrollParams,
  ComputerTypeTextParams,
} from './computer';
import * as LogsAPI from './logs';
import { LogStreamParams, Logs } from './logs';
import * as PlaywrightAPI from './playwright';
import { Playwright, PlaywrightExecuteParams, PlaywrightExecuteResponse } from './playwright';
import * as ProcessAPI from './process';
import {
  Process,
  ProcessExecParams,
  ProcessExecResponse,
  ProcessKillParams,
  ProcessKillResponse,
  ProcessSpawnParams,
  ProcessSpawnResponse,
  ProcessStatusParams,
  ProcessStatusResponse,
  ProcessStdinParams,
  ProcessStdinResponse,
  ProcessStdoutStreamParams,
  ProcessStdoutStreamResponse,
} from './process';
import * as ReplaysAPI from './replays';
import {
  ReplayDownloadParams,
  ReplayListResponse,
  ReplayStartParams,
  ReplayStartResponse,
  ReplayStopParams,
  Replays,
} from './replays';
import * as FsAPI from './fs/fs';
import {
  FCreateDirectoryParams,
  FDeleteDirectoryParams,
  FDeleteFileParams,
  FDownloadDirZipParams,
  FFileInfoParams,
  FFileInfoResponse,
  FListFilesParams,
  FListFilesResponse,
  FMoveParams,
  FReadFileParams,
  FSetFilePermissionsParams,
  FUploadParams,
  FUploadZipParams,
  FWriteFileParams,
  Fs,
} from './fs/fs';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Browsers extends APIResource {
  replays: ReplaysAPI.Replays = new ReplaysAPI.Replays(this._client);
  fs: FsAPI.Fs = new FsAPI.Fs(this._client);
  process: ProcessAPI.Process = new ProcessAPI.Process(this._client);
  logs: LogsAPI.Logs = new LogsAPI.Logs(this._client);
  computer: ComputerAPI.Computer = new ComputerAPI.Computer(this._client);
  playwright: PlaywrightAPI.Playwright = new PlaywrightAPI.Playwright(this._client);

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
   * Loads one or more unpacked extensions and restarts Chromium on the browser
   * instance.
   *
   * @example
   * ```ts
   * await client.browsers.loadExtensions('id', {
   *   extensions: [
   *     {
   *       name: 'name',
   *       zip_file: fs.createReadStream('path/to/file'),
   *     },
   *   ],
   * });
   * ```
   */
  loadExtensions(id: string, body: BrowserLoadExtensionsParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(
      path`/browsers/${id}/extensions`,
      multipartFormRequestOptions(
        { body, ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
        this._client,
      ),
    );
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

/**
 * Browser profile metadata.
 */
export interface Profile {
  /**
   * Unique identifier for the profile
   */
  id: string;

  /**
   * Timestamp when the profile was created
   */
  created_at: string;

  /**
   * Timestamp when the profile was last used
   */
  last_used_at?: string;

  /**
   * Optional, easier-to-reference name for the profile
   */
  name?: string | null;

  /**
   * Timestamp when the profile was last updated
   */
  updated_at?: string;
}

export interface BrowserCreateResponse {
  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * When the browser session was created.
   */
  created_at: string;

  /**
   * Whether the browser session is running in headless mode.
   */
  headless: boolean;

  /**
   * Unique identifier for the browser session
   */
  session_id: string;

  /**
   * Whether the browser session is running in stealth mode.
   */
  stealth: boolean;

  /**
   * The number of seconds of inactivity before the browser session is terminated.
   */
  timeout_seconds: number;

  /**
   * Remote URL for live viewing the browser session. Only available for non-headless
   * browsers.
   */
  browser_live_view_url?: string;

  /**
   * Whether the browser session is running in kiosk mode.
   */
  kiosk_mode?: boolean;

  /**
   * Optional persistence configuration for the browser session.
   */
  persistence?: BrowserPersistence;

  /**
   * Browser profile metadata.
   */
  profile?: Profile;

  /**
   * ID of the proxy associated with this browser session, if any.
   */
  proxy_id?: string;

  /**
   * Initial browser window size in pixels with optional refresh rate. If omitted,
   * image defaults apply (commonly 1024x768@60). Only specific viewport
   * configurations are supported. The server will reject unsupported combinations.
   * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
   * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
   * automatically determined from the width and height if they match a supported
   * configuration exactly. Note: Higher resolutions may affect the responsiveness of
   * live view browser
   */
  viewport?: BrowserCreateResponse.Viewport;
}

export namespace BrowserCreateResponse {
  /**
   * Initial browser window size in pixels with optional refresh rate. If omitted,
   * image defaults apply (commonly 1024x768@60). Only specific viewport
   * configurations are supported. The server will reject unsupported combinations.
   * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
   * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
   * automatically determined from the width and height if they match a supported
   * configuration exactly. Note: Higher resolutions may affect the responsiveness of
   * live view browser
   */
  export interface Viewport {
    /**
     * Browser window height in pixels.
     */
    height: number;

    /**
     * Browser window width in pixels.
     */
    width: number;

    /**
     * Display refresh rate in Hz. If omitted, automatically determined from width and
     * height.
     */
    refresh_rate?: number;
  }
}

export interface BrowserRetrieveResponse {
  /**
   * Websocket URL for Chrome DevTools Protocol connections to the browser session
   */
  cdp_ws_url: string;

  /**
   * When the browser session was created.
   */
  created_at: string;

  /**
   * Whether the browser session is running in headless mode.
   */
  headless: boolean;

  /**
   * Unique identifier for the browser session
   */
  session_id: string;

  /**
   * Whether the browser session is running in stealth mode.
   */
  stealth: boolean;

  /**
   * The number of seconds of inactivity before the browser session is terminated.
   */
  timeout_seconds: number;

  /**
   * Remote URL for live viewing the browser session. Only available for non-headless
   * browsers.
   */
  browser_live_view_url?: string;

  /**
   * Whether the browser session is running in kiosk mode.
   */
  kiosk_mode?: boolean;

  /**
   * Optional persistence configuration for the browser session.
   */
  persistence?: BrowserPersistence;

  /**
   * Browser profile metadata.
   */
  profile?: Profile;

  /**
   * ID of the proxy associated with this browser session, if any.
   */
  proxy_id?: string;

  /**
   * Initial browser window size in pixels with optional refresh rate. If omitted,
   * image defaults apply (commonly 1024x768@60). Only specific viewport
   * configurations are supported. The server will reject unsupported combinations.
   * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
   * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
   * automatically determined from the width and height if they match a supported
   * configuration exactly. Note: Higher resolutions may affect the responsiveness of
   * live view browser
   */
  viewport?: BrowserRetrieveResponse.Viewport;
}

export namespace BrowserRetrieveResponse {
  /**
   * Initial browser window size in pixels with optional refresh rate. If omitted,
   * image defaults apply (commonly 1024x768@60). Only specific viewport
   * configurations are supported. The server will reject unsupported combinations.
   * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
   * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
   * automatically determined from the width and height if they match a supported
   * configuration exactly. Note: Higher resolutions may affect the responsiveness of
   * live view browser
   */
  export interface Viewport {
    /**
     * Browser window height in pixels.
     */
    height: number;

    /**
     * Browser window width in pixels.
     */
    width: number;

    /**
     * Display refresh rate in Hz. If omitted, automatically determined from width and
     * height.
     */
    refresh_rate?: number;
  }
}

export type BrowserListResponse = Array<BrowserListResponse.BrowserListResponseItem>;

export namespace BrowserListResponse {
  export interface BrowserListResponseItem {
    /**
     * Websocket URL for Chrome DevTools Protocol connections to the browser session
     */
    cdp_ws_url: string;

    /**
     * When the browser session was created.
     */
    created_at: string;

    /**
     * Whether the browser session is running in headless mode.
     */
    headless: boolean;

    /**
     * Unique identifier for the browser session
     */
    session_id: string;

    /**
     * Whether the browser session is running in stealth mode.
     */
    stealth: boolean;

    /**
     * The number of seconds of inactivity before the browser session is terminated.
     */
    timeout_seconds: number;

    /**
     * Remote URL for live viewing the browser session. Only available for non-headless
     * browsers.
     */
    browser_live_view_url?: string;

    /**
     * Whether the browser session is running in kiosk mode.
     */
    kiosk_mode?: boolean;

    /**
     * Optional persistence configuration for the browser session.
     */
    persistence?: BrowsersAPI.BrowserPersistence;

    /**
     * Browser profile metadata.
     */
    profile?: BrowsersAPI.Profile;

    /**
     * ID of the proxy associated with this browser session, if any.
     */
    proxy_id?: string;

    /**
     * Initial browser window size in pixels with optional refresh rate. If omitted,
     * image defaults apply (commonly 1024x768@60). Only specific viewport
     * configurations are supported. The server will reject unsupported combinations.
     * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
     * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
     * automatically determined from the width and height if they match a supported
     * configuration exactly. Note: Higher resolutions may affect the responsiveness of
     * live view browser
     */
    viewport?: BrowserListResponseItem.Viewport;
  }

  export namespace BrowserListResponseItem {
    /**
     * Initial browser window size in pixels with optional refresh rate. If omitted,
     * image defaults apply (commonly 1024x768@60). Only specific viewport
     * configurations are supported. The server will reject unsupported combinations.
     * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
     * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
     * automatically determined from the width and height if they match a supported
     * configuration exactly. Note: Higher resolutions may affect the responsiveness of
     * live view browser
     */
    export interface Viewport {
      /**
       * Browser window height in pixels.
       */
      height: number;

      /**
       * Browser window width in pixels.
       */
      width: number;

      /**
       * Display refresh rate in Hz. If omitted, automatically determined from width and
       * height.
       */
      refresh_rate?: number;
    }
  }
}

export interface BrowserCreateParams {
  /**
   * List of browser extensions to load into the session. Provide each by id or name.
   */
  extensions?: Array<BrowserCreateParams.Extension>;

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
   * If true, launches the browser in kiosk mode to hide address bar and tabs in live
   * view.
   */
  kiosk_mode?: boolean;

  /**
   * Optional persistence configuration for the browser session.
   */
  persistence?: BrowserPersistence;

  /**
   * Profile selection for the browser session. Provide either id or name. If
   * specified, the matching profile will be loaded into the browser session.
   * Profiles must be created beforehand.
   */
  profile?: BrowserCreateParams.Profile;

  /**
   * Optional proxy to associate to the browser session. Must reference a proxy
   * belonging to the caller's org.
   */
  proxy_id?: string;

  /**
   * If true, launches the browser in stealth mode to reduce detection by anti-bot
   * mechanisms.
   */
  stealth?: boolean;

  /**
   * The number of seconds of inactivity before the browser session is terminated.
   * Only applicable to non-persistent browsers. Activity includes CDP connections
   * and live view connections. Defaults to 60 seconds. Minimum allowed is 10
   * seconds. Maximum allowed is 86400 (24 hours). We check for inactivity every 5
   * seconds, so the actual timeout behavior you will see is +/- 5 seconds around the
   * specified value.
   */
  timeout_seconds?: number;

  /**
   * Initial browser window size in pixels with optional refresh rate. If omitted,
   * image defaults apply (commonly 1024x768@60). Only specific viewport
   * configurations are supported. The server will reject unsupported combinations.
   * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
   * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
   * automatically determined from the width and height if they match a supported
   * configuration exactly. Note: Higher resolutions may affect the responsiveness of
   * live view browser
   */
  viewport?: BrowserCreateParams.Viewport;
}

export namespace BrowserCreateParams {
  /**
   * Extension selection for the browser session. Provide either id or name of an
   * extension uploaded to Kernel.
   */
  export interface Extension {
    /**
     * Extension ID to load for this browser session
     */
    id?: string;

    /**
     * Extension name to load for this browser session (instead of id). Must be 1-255
     * characters, using letters, numbers, dots, underscores, or hyphens.
     */
    name?: string;
  }

  /**
   * Profile selection for the browser session. Provide either id or name. If
   * specified, the matching profile will be loaded into the browser session.
   * Profiles must be created beforehand.
   */
  export interface Profile {
    /**
     * Profile ID to load for this browser session
     */
    id?: string;

    /**
     * Profile name to load for this browser session (instead of id). Must be 1-255
     * characters, using letters, numbers, dots, underscores, or hyphens.
     */
    name?: string;

    /**
     * If true, save changes made during the session back to the profile when the
     * session ends.
     */
    save_changes?: boolean;
  }

  /**
   * Initial browser window size in pixels with optional refresh rate. If omitted,
   * image defaults apply (commonly 1024x768@60). Only specific viewport
   * configurations are supported. The server will reject unsupported combinations.
   * Supported resolutions are: 2560x1440@10, 1920x1080@25, 1920x1200@25,
   * 1440x900@25, 1024x768@60 If refresh_rate is not provided, it will be
   * automatically determined from the width and height if they match a supported
   * configuration exactly. Note: Higher resolutions may affect the responsiveness of
   * live view browser
   */
  export interface Viewport {
    /**
     * Browser window height in pixels.
     */
    height: number;

    /**
     * Browser window width in pixels.
     */
    width: number;

    /**
     * Display refresh rate in Hz. If omitted, automatically determined from width and
     * height.
     */
    refresh_rate?: number;
  }
}

export interface BrowserDeleteParams {
  /**
   * Persistent browser identifier
   */
  persistent_id: string;
}

export interface BrowserLoadExtensionsParams {
  /**
   * List of extensions to upload and activate
   */
  extensions: Array<BrowserLoadExtensionsParams.Extension>;
}

export namespace BrowserLoadExtensionsParams {
  export interface Extension {
    /**
     * Folder name to place the extension under /home/kernel/extensions/<name>
     */
    name: string;

    /**
     * Zip archive containing an unpacked Chromium extension (must include
     * manifest.json)
     */
    zip_file: Uploadable;
  }
}

Browsers.Replays = Replays;
Browsers.Fs = Fs;
Browsers.Process = Process;
Browsers.Logs = Logs;
Browsers.Computer = Computer;
Browsers.Playwright = Playwright;

export declare namespace Browsers {
  export {
    type BrowserPersistence as BrowserPersistence,
    type Profile as Profile,
    type BrowserCreateResponse as BrowserCreateResponse,
    type BrowserRetrieveResponse as BrowserRetrieveResponse,
    type BrowserListResponse as BrowserListResponse,
    type BrowserCreateParams as BrowserCreateParams,
    type BrowserDeleteParams as BrowserDeleteParams,
    type BrowserLoadExtensionsParams as BrowserLoadExtensionsParams,
  };

  export {
    Replays as Replays,
    type ReplayListResponse as ReplayListResponse,
    type ReplayStartResponse as ReplayStartResponse,
    type ReplayDownloadParams as ReplayDownloadParams,
    type ReplayStartParams as ReplayStartParams,
    type ReplayStopParams as ReplayStopParams,
  };

  export {
    Fs as Fs,
    type FFileInfoResponse as FFileInfoResponse,
    type FListFilesResponse as FListFilesResponse,
    type FCreateDirectoryParams as FCreateDirectoryParams,
    type FDeleteDirectoryParams as FDeleteDirectoryParams,
    type FDeleteFileParams as FDeleteFileParams,
    type FDownloadDirZipParams as FDownloadDirZipParams,
    type FFileInfoParams as FFileInfoParams,
    type FListFilesParams as FListFilesParams,
    type FMoveParams as FMoveParams,
    type FReadFileParams as FReadFileParams,
    type FSetFilePermissionsParams as FSetFilePermissionsParams,
    type FUploadParams as FUploadParams,
    type FUploadZipParams as FUploadZipParams,
    type FWriteFileParams as FWriteFileParams,
  };

  export {
    Process as Process,
    type ProcessExecResponse as ProcessExecResponse,
    type ProcessKillResponse as ProcessKillResponse,
    type ProcessSpawnResponse as ProcessSpawnResponse,
    type ProcessStatusResponse as ProcessStatusResponse,
    type ProcessStdinResponse as ProcessStdinResponse,
    type ProcessStdoutStreamResponse as ProcessStdoutStreamResponse,
    type ProcessExecParams as ProcessExecParams,
    type ProcessKillParams as ProcessKillParams,
    type ProcessSpawnParams as ProcessSpawnParams,
    type ProcessStatusParams as ProcessStatusParams,
    type ProcessStdinParams as ProcessStdinParams,
    type ProcessStdoutStreamParams as ProcessStdoutStreamParams,
  };

  export { Logs as Logs, type LogStreamParams as LogStreamParams };

  export {
    Computer as Computer,
    type ComputerCaptureScreenshotParams as ComputerCaptureScreenshotParams,
    type ComputerClickMouseParams as ComputerClickMouseParams,
    type ComputerDragMouseParams as ComputerDragMouseParams,
    type ComputerMoveMouseParams as ComputerMoveMouseParams,
    type ComputerPressKeyParams as ComputerPressKeyParams,
    type ComputerScrollParams as ComputerScrollParams,
    type ComputerTypeTextParams as ComputerTypeTextParams,
  };

  export {
    Playwright as Playwright,
    type PlaywrightExecuteResponse as PlaywrightExecuteResponse,
    type PlaywrightExecuteParams as PlaywrightExecuteParams,
  };
}
