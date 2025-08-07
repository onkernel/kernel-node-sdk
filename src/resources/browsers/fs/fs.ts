// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as WatchAPI from './watch';
import {
  Watch,
  WatchEventsParams,
  WatchEventsResponse,
  WatchStartParams,
  WatchStartResponse,
  WatchStopParams,
} from './watch';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Fs extends APIResource {
  watch: WatchAPI.Watch = new WatchAPI.Watch(this._client);

  /**
   * Create a new directory
   *
   * @example
   * ```ts
   * await client.browsers.fs.createDirectory('id', {
   *   path: '/J!',
   * });
   * ```
   */
  createDirectory(id: string, body: FCreateDirectoryParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/browsers/${id}/fs/create_directory`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Delete a directory
   *
   * @example
   * ```ts
   * await client.browsers.fs.deleteDirectory('id', {
   *   path: '/J!',
   * });
   * ```
   */
  deleteDirectory(id: string, body: FDeleteDirectoryParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/browsers/${id}/fs/delete_directory`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Delete a file
   *
   * @example
   * ```ts
   * await client.browsers.fs.deleteFile('id', { path: '/J!' });
   * ```
   */
  deleteFile(id: string, body: FDeleteFileParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/browsers/${id}/fs/delete_file`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get information about a file or directory
   *
   * @example
   * ```ts
   * const response = await client.browsers.fs.fileInfo('id', {
   *   path: '/J!',
   * });
   * ```
   */
  fileInfo(id: string, query: FFileInfoParams, options?: RequestOptions): APIPromise<FFileInfoResponse> {
    return this._client.get(path`/browsers/${id}/fs/file_info`, { query, ...options });
  }

  /**
   * List files in a directory
   *
   * @example
   * ```ts
   * const response = await client.browsers.fs.listFiles('id', {
   *   path: '/J!',
   * });
   * ```
   */
  listFiles(id: string, query: FListFilesParams, options?: RequestOptions): APIPromise<FListFilesResponse> {
    return this._client.get(path`/browsers/${id}/fs/list_files`, { query, ...options });
  }

  /**
   * Move or rename a file or directory
   *
   * @example
   * ```ts
   * await client.browsers.fs.move('id', {
   *   dest_path: '/J!',
   *   src_path: '/J!',
   * });
   * ```
   */
  move(id: string, body: FMoveParams, options?: RequestOptions): APIPromise<void> {
    return this._client.put(path`/browsers/${id}/fs/move`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Read file contents
   *
   * @example
   * ```ts
   * const response = await client.browsers.fs.readFile('id', {
   *   path: '/J!',
   * });
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  readFile(id: string, query: FReadFileParams, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/browsers/${id}/fs/read_file`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * Set file or directory permissions/ownership
   *
   * @example
   * ```ts
   * await client.browsers.fs.setFilePermissions('id', {
   *   mode: '0611',
   *   path: '/J!',
   * });
   * ```
   */
  setFilePermissions(
    id: string,
    body: FSetFilePermissionsParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.put(path`/browsers/${id}/fs/set_file_permissions`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Write or create a file
   *
   * @example
   * ```ts
   * await client.browsers.fs.writeFile(
   *   'id',
   *   fs.createReadStream('path/to/file'),
   *   { path: '/J!' },
   * );
   * ```
   */
  writeFile(
    id: string,
    contents: string | ArrayBuffer | ArrayBufferView | Blob | DataView,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { path, mode } = params;
    return this._client.put(path`/browsers/${id}/fs/write_file`, {
      body: contents,
      ...options,
      headers: buildHeaders([
        { 'Content-Type': 'application/octet-stream', Accept: '*/*' },
        options?.headers,
      ]),
    });
  }
}

export interface FFileInfoResponse {
  /**
   * Whether the path is a directory.
   */
  is_dir: boolean;

  /**
   * Last modification time.
   */
  mod_time: string;

  /**
   * File mode bits (e.g., "drwxr-xr-x" or "-rw-r--r--").
   */
  mode: string;

  /**
   * Base name of the file or directory.
   */
  name: string;

  /**
   * Absolute path.
   */
  path: string;

  /**
   * Size in bytes. 0 for directories.
   */
  size_bytes: number;
}

/**
 * Array of file or directory information entries.
 */
export type FListFilesResponse = Array<FListFilesResponse.FListFilesResponseItem>;

export namespace FListFilesResponse {
  export interface FListFilesResponseItem {
    /**
     * Whether the path is a directory.
     */
    is_dir: boolean;

    /**
     * Last modification time.
     */
    mod_time: string;

    /**
     * File mode bits (e.g., "drwxr-xr-x" or "-rw-r--r--").
     */
    mode: string;

    /**
     * Base name of the file or directory.
     */
    name: string;

    /**
     * Absolute path.
     */
    path: string;

    /**
     * Size in bytes. 0 for directories.
     */
    size_bytes: number;
  }
}

export interface FCreateDirectoryParams {
  /**
   * Absolute directory path to create.
   */
  path: string;

  /**
   * Optional directory mode (octal string, e.g. 755). Defaults to 755.
   */
  mode?: string;
}

export interface FDeleteDirectoryParams {
  /**
   * Absolute path to delete.
   */
  path: string;
}

export interface FDeleteFileParams {
  /**
   * Absolute path to delete.
   */
  path: string;
}

export interface FFileInfoParams {
  /**
   * Absolute path of the file or directory.
   */
  path: string;
}

export interface FListFilesParams {
  /**
   * Absolute directory path.
   */
  path: string;
}

export interface FMoveParams {
  /**
   * Absolute destination path.
   */
  dest_path: string;

  /**
   * Absolute source path.
   */
  src_path: string;
}

export interface FReadFileParams {
  /**
   * Absolute file path to read.
   */
  path: string;
}

export interface FSetFilePermissionsParams {
  /**
   * File mode bits (octal string, e.g. 644).
   */
  mode: string;

  /**
   * Absolute path whose permissions are to be changed.
   */
  path: string;

  /**
   * New group name or GID.
   */
  group?: string;

  /**
   * New owner username or UID.
   */
  owner?: string;
}

Fs.Watch = Watch;

export declare namespace Fs {
  export {
    type FFileInfoResponse as FFileInfoResponse,
    type FListFilesResponse as FListFilesResponse,
    type FCreateDirectoryParams as FCreateDirectoryParams,
    type FDeleteDirectoryParams as FDeleteDirectoryParams,
    type FDeleteFileParams as FDeleteFileParams,
    type FFileInfoParams as FFileInfoParams,
    type FListFilesParams as FListFilesParams,
    type FMoveParams as FMoveParams,
    type FReadFileParams as FReadFileParams,
    type FSetFilePermissionsParams as FSetFilePermissionsParams,
  };

  export {
    Watch as Watch,
    type WatchEventsResponse as WatchEventsResponse,
    type WatchStartResponse as WatchStartResponse,
    type WatchEventsParams as WatchEventsParams,
    type WatchStartParams as WatchStartParams,
    type WatchStopParams as WatchStopParams,
  };
}
