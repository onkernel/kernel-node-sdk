// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { OffsetPagination, type OffsetPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Credentials extends APIResource {
  /**
   * Create a new credential for storing login information. Values are encrypted at
   * rest.
   *
   * @example
   * ```ts
   * const credential = await client.credentials.create({
   *   domain: 'netflix.com',
   *   name: 'my-netflix-login',
   *   values: {
   *     username: 'user@example.com',
   *     password: 'mysecretpassword',
   *   },
   * });
   * ```
   */
  create(body: CredentialCreateParams, options?: RequestOptions): APIPromise<Credential> {
    return this._client.post('/credentials', { body, ...options });
  }

  /**
   * Retrieve a credential by its ID. Credential values are not returned.
   *
   * @example
   * ```ts
   * const credential = await client.credentials.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Credential> {
    return this._client.get(path`/credentials/${id}`, options);
  }

  /**
   * Update a credential's name or values. Values are encrypted at rest.
   *
   * @example
   * ```ts
   * const credential = await client.credentials.update('id');
   * ```
   */
  update(id: string, body: CredentialUpdateParams, options?: RequestOptions): APIPromise<Credential> {
    return this._client.patch(path`/credentials/${id}`, { body, ...options });
  }

  /**
   * List credentials owned by the caller's organization. Credential values are not
   * returned.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const credential of client.credentials.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: CredentialListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CredentialsOffsetPagination, Credential> {
    return this._client.getAPIList('/credentials', OffsetPagination<Credential>, { query, ...options });
  }

  /**
   * Delete a credential by its ID.
   *
   * @example
   * ```ts
   * await client.credentials.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/credentials/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type CredentialsOffsetPagination = OffsetPagination<Credential>;

/**
 * Request to create a new credential
 */
export interface CreateCredentialRequest {
  /**
   * Target domain this credential is for
   */
  domain: string;

  /**
   * Unique name for the credential within the organization
   */
  name: string;

  /**
   * Field name to value mapping (e.g., username, password)
   */
  values: { [key: string]: string };
}

/**
 * A stored credential for automatic re-authentication
 */
export interface Credential {
  /**
   * Unique identifier for the credential
   */
  id: string;

  /**
   * When the credential was created
   */
  created_at: string;

  /**
   * Target domain this credential is for
   */
  domain: string;

  /**
   * Unique name for the credential within the organization
   */
  name: string;

  /**
   * When the credential was last updated
   */
  updated_at: string;
}

/**
 * Request to update an existing credential
 */
export interface UpdateCredentialRequest {
  /**
   * New name for the credential
   */
  name?: string;

  /**
   * Field name to value mapping (e.g., username, password). Replaces all existing
   * values.
   */
  values?: { [key: string]: string };
}

export interface CredentialCreateParams {
  /**
   * Target domain this credential is for
   */
  domain: string;

  /**
   * Unique name for the credential within the organization
   */
  name: string;

  /**
   * Field name to value mapping (e.g., username, password)
   */
  values: { [key: string]: string };
}

export interface CredentialUpdateParams {
  /**
   * New name for the credential
   */
  name?: string;

  /**
   * Field name to value mapping (e.g., username, password). Replaces all existing
   * values.
   */
  values?: { [key: string]: string };
}

export interface CredentialListParams extends OffsetPaginationParams {
  /**
   * Filter by domain
   */
  domain?: string;
}

export declare namespace Credentials {
  export {
    type CreateCredentialRequest as CreateCredentialRequest,
    type Credential as Credential,
    type UpdateCredentialRequest as UpdateCredentialRequest,
    type CredentialsOffsetPagination as CredentialsOffsetPagination,
    type CredentialCreateParams as CredentialCreateParams,
    type CredentialUpdateParams as CredentialUpdateParams,
    type CredentialListParams as CredentialListParams,
  };
}
