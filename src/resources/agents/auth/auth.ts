// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as InvocationsAPI from './invocations';
import {
  InvocationDiscoverParams,
  InvocationExchangeParams,
  InvocationExchangeResponse,
  InvocationSubmitParams,
  Invocations,
} from './invocations';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Auth extends APIResource {
  invocations: InvocationsAPI.Invocations = new InvocationsAPI.Invocations(this._client);

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
   * Creates a browser session and returns a handoff code for the hosted flow. Uses
   * standard API key or JWT authentication (not the JWT returned by the exchange
   * endpoint).
   *
   * @example
   * ```ts
   * const agentAuthStartResponse =
   *   await client.agents.auth.start({
   *     profile_name: 'auth-abc123',
   *     target_domain: 'doordash.com',
   *   });
   * ```
   */
  start(body: AuthStartParams, options?: RequestOptions): APIPromise<AgentAuthStartResponse> {
    return this._client.post('/agents/auth/start', { body, ...options });
  }
}

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
 * Response from starting an agent authentication invocation
 */
export interface AgentAuthStartResponse {
  /**
   * Unique identifier for the auth agent managing this domain/profile
   */
  auth_agent_id: string;

  /**
   * When the handoff code expires
   */
  expires_at: string;

  /**
   * One-time code for handoff
   */
  handoff_code: string;

  /**
   * URL to redirect user to
   */
  hosted_url: string;

  /**
   * Unique identifier for the invocation
   */
  invocation_id: string;
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

export interface AuthStartParams {
  /**
   * Name of the profile to use for this flow
   */
  profile_name: string;

  /**
   * Target domain for authentication
   */
  target_domain: string;

  /**
   * Optional logo URL for the application
   */
  app_logo_url?: string;

  /**
   * Optional login page URL. If provided, will be stored on the agent and used to
   * skip Phase 1 discovery in future invocations.
   */
  login_url?: string;

  /**
   * Optional proxy configuration
   */
  proxy?: AuthStartParams.Proxy;
}

export namespace AuthStartParams {
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

Auth.Invocations = Invocations;

export declare namespace Auth {
  export {
    type AgentAuthDiscoverResponse as AgentAuthDiscoverResponse,
    type AgentAuthInvocationResponse as AgentAuthInvocationResponse,
    type AgentAuthStartResponse as AgentAuthStartResponse,
    type AgentAuthSubmitResponse as AgentAuthSubmitResponse,
    type AuthAgent as AuthAgent,
    type DiscoveredField as DiscoveredField,
    type AuthStartParams as AuthStartParams,
  };

  export {
    Invocations as Invocations,
    type InvocationExchangeResponse as InvocationExchangeResponse,
    type InvocationDiscoverParams as InvocationDiscoverParams,
    type InvocationExchangeParams as InvocationExchangeParams,
    type InvocationSubmitParams as InvocationSubmitParams,
  };
}
