// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as InvocationsAPI from './invocations';
import {
  InvocationCreateParams,
  InvocationDiscoverParams,
  InvocationExchangeParams,
  InvocationExchangeResponse,
  InvocationSubmitParams,
  Invocations,
} from './invocations';
import { APIPromise } from '../../../core/api-promise';
import { OffsetPagination, type OffsetPaginationParams, PagePromise } from '../../../core/pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Auth extends APIResource {
  invocations: InvocationsAPI.Invocations = new InvocationsAPI.Invocations(this._client);

  /**
   * Creates a new auth agent for the specified domain and profile combination, or
   * returns an existing one if it already exists. This is idempotent - calling with
   * the same domain and profile will return the same agent. Does NOT start an
   * invocation - use POST /agents/auth/invocations to start an auth flow.
   *
   * @example
   * ```ts
   * const authAgent = await client.agents.auth.create({
   *   profile_name: 'user-123',
   *   target_domain: 'netflix.com',
   * });
   * ```
   */
  create(body: AuthCreateParams, options?: RequestOptions): APIPromise<AuthAgent> {
    return this._client.post('/agents/auth', { body, ...options });
  }

  /**
   * Retrieve an auth agent by its ID. Returns the current authentication status of
   * the managed profile.
   *
   * @example
   * ```ts
   * const authAgent = await client.agents.auth.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AuthAgent> {
    return this._client.get(path`/agents/auth/${id}`, options);
  }

  /**
   * List auth agents with optional filters for profile_name and target_domain.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const authAgent of client.agents.auth.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AuthListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AuthAgentsOffsetPagination, AuthAgent> {
    return this._client.getAPIList('/agents/auth', OffsetPagination<AuthAgent>, { query, ...options });
  }

  /**
   * Deletes an auth agent and terminates its workflow. This will:
   *
   * - Soft delete the auth agent record
   * - Gracefully terminate the agent's Temporal workflow
   * - Cancel any in-progress invocations
   *
   * @example
   * ```ts
   * await client.agents.auth.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/agents/auth/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Triggers automatic re-authentication for an auth agent using stored credentials.
   * Requires the auth agent to have a linked credential, stored selectors, and
   * login_url. Returns immediately with status indicating whether re-auth was
   * started.
   *
   * @example
   * ```ts
   * const reauthResponse = await client.agents.auth.reauth(
   *   'id',
   * );
   * ```
   */
  reauth(id: string, options?: RequestOptions): APIPromise<ReauthResponse> {
    return this._client.post(path`/agents/auth/${id}/reauth`, options);
  }
}

export type AuthAgentsOffsetPagination = OffsetPagination<AuthAgent>;

/**
 * Response from discover endpoint matching AuthBlueprint schema
 */
export interface AgentAuthDiscoverResponse {
  /**
   * Whether discovery succeeded
   */
  success: boolean;

  /**
   * Error message if discovery failed
   */
  error_message?: string;

  /**
   * Discovered form fields (present when success is true)
   */
  fields?: Array<DiscoveredField>;

  /**
   * Whether user is already logged in
   */
  logged_in?: boolean;

  /**
   * URL of the discovered login page
   */
  login_url?: string;

  /**
   * Title of the login page
   */
  page_title?: string;
}

/**
 * Response from get invocation endpoint
 */
export interface AgentAuthInvocationResponse {
  /**
   * App name (org name at time of invocation creation)
   */
  app_name: string;

  /**
   * When the handoff code expires
   */
  expires_at: string;

  /**
   * Invocation status
   */
  status: 'IN_PROGRESS' | 'SUCCESS' | 'EXPIRED' | 'CANCELED';

  /**
   * Target domain for authentication
   */
  target_domain: string;
}

/**
 * Response from submit endpoint matching SubmitResult schema
 */
export interface AgentAuthSubmitResponse {
  /**
   * Whether submission succeeded
   */
  success: boolean;

  /**
   * Additional fields needed (e.g., OTP) - present when needs_additional_auth is
   * true
   */
  additional_fields?: Array<DiscoveredField>;

  /**
   * App name (only present when logged_in is true)
   */
  app_name?: string;

  /**
   * Error message if submission failed
   */
  error_message?: string;

  /**
   * Whether user is now logged in
   */
  logged_in?: boolean;

  /**
   * Whether additional authentication fields are needed
   */
  needs_additional_auth?: boolean;

  /**
   * Target domain (only present when logged_in is true)
   */
  target_domain?: string;
}

/**
 * An auth agent that manages authentication for a specific domain and profile
 * combination
 */
export interface AuthAgent {
  /**
   * Unique identifier for the auth agent
   */
  id: string;

  /**
   * Target domain for authentication
   */
  domain: string;

  /**
   * Name of the profile associated with this auth agent
   */
  profile_name: string;

  /**
   * Current authentication status of the managed profile
   */
  status: 'AUTHENTICATED' | 'NEEDS_AUTH';

  /**
   * Whether automatic re-authentication is possible (has credential_id, selectors,
   * and login_url)
   */
  can_reauth?: boolean;

  /**
   * ID of the linked credential for automatic re-authentication
   */
  credential_id?: string;

  /**
   * Name of the linked credential for automatic re-authentication
   */
  credential_name?: string;

  /**
   * Whether this auth agent has stored selectors for deterministic re-authentication
   */
  has_selectors?: boolean;

  /**
   * When the last authentication check was performed
   */
  last_auth_check_at?: string;
}

/**
 * Request to create or find an auth agent
 */
export interface AuthAgentCreateRequest {
  /**
   * Name of the profile to use for this auth agent
   */
  profile_name: string;

  /**
   * Target domain for authentication
   */
  target_domain: string;

  /**
   * Optional name of an existing credential to use for this auth agent. If provided,
   * the credential will be linked to the agent and its values will be used to
   * auto-fill the login form on invocation.
   */
  credential_name?: string;

  /**
   * Optional login page URL. If provided, will be stored on the agent and used to
   * skip discovery in future invocations.
   */
  login_url?: string;

  /**
   * Optional proxy configuration
   */
  proxy?: AuthAgentCreateRequest.Proxy;
}

export namespace AuthAgentCreateRequest {
  /**
   * Optional proxy configuration
   */
  export interface Proxy {
    /**
     * ID of the proxy to use
     */
    proxy_id?: string;
  }
}

/**
 * Request to create an invocation for an existing auth agent
 */
export interface AuthAgentInvocationCreateRequest {
  /**
   * ID of the auth agent to create an invocation for
   */
  auth_agent_id: string;

  /**
   * If provided, saves the submitted credentials under this name upon successful
   * login. The credential will be linked to the auth agent for automatic
   * re-authentication.
   */
  save_credential_as?: string;
}

/**
 * Response when the agent is already authenticated.
 */
export type AuthAgentInvocationCreateResponse =
  | AuthAgentInvocationCreateResponse.AuthAgentAlreadyAuthenticated
  | AuthAgentInvocationCreateResponse.AuthAgentInvocationCreated;

export namespace AuthAgentInvocationCreateResponse {
  /**
   * Response when the agent is already authenticated.
   */
  export interface AuthAgentAlreadyAuthenticated {
    /**
     * Indicates the agent is already authenticated and no invocation was created.
     */
    status: 'already_authenticated';
  }

  /**
   * Response when a new invocation was created.
   */
  export interface AuthAgentInvocationCreated {
    /**
     * When the handoff code expires.
     */
    expires_at: string;

    /**
     * One-time code for handoff.
     */
    handoff_code: string;

    /**
     * URL to redirect user to.
     */
    hosted_url: string;

    /**
     * Unique identifier for the invocation.
     */
    invocation_id: string;

    /**
     * Indicates an invocation was created.
     */
    status: 'invocation_created';
  }
}

/**
 * A discovered form field
 */
export interface DiscoveredField {
  /**
   * Field label
   */
  label: string;

  /**
   * Field name
   */
  name: string;

  /**
   * CSS selector for the field
   */
  selector: string;

  /**
   * Field type
   */
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'code';

  /**
   * Field placeholder
   */
  placeholder?: string;

  /**
   * Whether field is required
   */
  required?: boolean;
}

/**
 * Response from triggering re-authentication
 */
export interface ReauthResponse {
  /**
   * Result of the re-authentication attempt
   */
  status: 'reauth_started' | 'already_authenticated' | 'cannot_reauth';

  /**
   * ID of the re-auth invocation if one was created
   */
  invocation_id?: string;

  /**
   * Human-readable description of the result
   */
  message?: string;
}

export interface AuthCreateParams {
  /**
   * Name of the profile to use for this auth agent
   */
  profile_name: string;

  /**
   * Target domain for authentication
   */
  target_domain: string;

  /**
   * Optional name of an existing credential to use for this auth agent. If provided,
   * the credential will be linked to the agent and its values will be used to
   * auto-fill the login form on invocation.
   */
  credential_name?: string;

  /**
   * Optional login page URL. If provided, will be stored on the agent and used to
   * skip discovery in future invocations.
   */
  login_url?: string;

  /**
   * Optional proxy configuration
   */
  proxy?: AuthCreateParams.Proxy;
}

export namespace AuthCreateParams {
  /**
   * Optional proxy configuration
   */
  export interface Proxy {
    /**
     * ID of the proxy to use
     */
    proxy_id?: string;
  }
}

export interface AuthListParams extends OffsetPaginationParams {
  /**
   * Filter by profile name
   */
  profile_name?: string;

  /**
   * Filter by target domain
   */
  target_domain?: string;
}

Auth.Invocations = Invocations;

export declare namespace Auth {
  export {
    type AgentAuthDiscoverResponse as AgentAuthDiscoverResponse,
    type AgentAuthInvocationResponse as AgentAuthInvocationResponse,
    type AgentAuthSubmitResponse as AgentAuthSubmitResponse,
    type AuthAgent as AuthAgent,
    type AuthAgentCreateRequest as AuthAgentCreateRequest,
    type AuthAgentInvocationCreateRequest as AuthAgentInvocationCreateRequest,
    type AuthAgentInvocationCreateResponse as AuthAgentInvocationCreateResponse,
    type DiscoveredField as DiscoveredField,
    type ReauthResponse as ReauthResponse,
    type AuthAgentsOffsetPagination as AuthAgentsOffsetPagination,
    type AuthCreateParams as AuthCreateParams,
    type AuthListParams as AuthListParams,
  };

  export {
    Invocations as Invocations,
    type InvocationExchangeResponse as InvocationExchangeResponse,
    type InvocationCreateParams as InvocationCreateParams,
    type InvocationDiscoverParams as InvocationDiscoverParams,
    type InvocationExchangeParams as InvocationExchangeParams,
    type InvocationSubmitParams as InvocationSubmitParams,
  };
}
