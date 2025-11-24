// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as RunsAPI from './runs';
import { RunDiscoverParams, RunExchangeParams, RunExchangeResponse, RunSubmitParams, Runs } from './runs';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Auth extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);

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
 * Response from get run endpoint
 */
export interface AgentAuthRunResponse {
  /**
   * App name (org name at time of run creation)
   */
  app_name: string;

  /**
   * When the handoff code expires
   */
  expires_at: string;

  /**
   * Run status
   */
  status: 'ACTIVE' | 'ENDED' | 'EXPIRED' | 'CANCELED';

  /**
   * Target domain for authentication
   */
  target_domain: string;
}

/**
 * Response from starting an agent authentication run
 */
export interface AgentAuthStartResponse {
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
   * Unique identifier for the run
   */
  run_id: string;
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
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'code' | 'checkbox';

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

Auth.Runs = Runs;

export declare namespace Auth {
  export {
    type AgentAuthDiscoverResponse as AgentAuthDiscoverResponse,
    type AgentAuthRunResponse as AgentAuthRunResponse,
    type AgentAuthStartResponse as AgentAuthStartResponse,
    type AgentAuthSubmitResponse as AgentAuthSubmitResponse,
    type DiscoveredField as DiscoveredField,
    type AuthStartParams as AuthStartParams,
  };

  export {
    Runs as Runs,
    type RunExchangeResponse as RunExchangeResponse,
    type RunDiscoverParams as RunDiscoverParams,
    type RunExchangeParams as RunExchangeParams,
    type RunSubmitParams as RunSubmitParams,
  };
}
