// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AuthAPI from './auth';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Runs extends APIResource {
  /**
   * Returns run details including app_name and target_domain. Uses the JWT returned
   * by the exchange endpoint, or standard API key or JWT authentication.
   *
   * @example
   * ```ts
   * const agentAuthRunResponse =
   *   await client.agents.auth.runs.retrieve('run_id');
   * ```
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<AuthAPI.AgentAuthRunResponse> {
    return this._client.get(path`/agents/auth/runs/${runID}`, options);
  }

  /**
   * Inspects the target site to detect logged-in state or discover required fields.
   * Returns 200 with success: true when fields are found, or 4xx/5xx for failures.
   * Requires the JWT returned by the exchange endpoint.
   *
   * @example
   * ```ts
   * const agentAuthDiscoverResponse =
   *   await client.agents.auth.runs.discover('run_id');
   * ```
   */
  discover(
    runID: string,
    body?: RunDiscoverParams | null | undefined,
    options?: RequestOptions,
  ): APIPromise<AuthAPI.AgentAuthDiscoverResponse> {
    return this._client.post(path`/agents/auth/runs/${runID}/discover`, { body, ...options });
  }

  /**
   * Validates the handoff code and returns a JWT token for subsequent requests. No
   * authentication required (the handoff code serves as the credential).
   *
   * @example
   * ```ts
   * const response = await client.agents.auth.runs.exchange(
   *   'run_id',
   *   { code: 'otp_abc123xyz' },
   * );
   * ```
   */
  exchange(
    runID: string,
    body: RunExchangeParams,
    options?: RequestOptions,
  ): APIPromise<RunExchangeResponse> {
    return this._client.post(path`/agents/auth/runs/${runID}/exchange`, { body, ...options });
  }

  /**
   * Submits field values for the discovered login form and may return additional
   * auth fields or success. Requires the JWT returned by the exchange endpoint.
   *
   * @example
   * ```ts
   * const agentAuthSubmitResponse =
   *   await client.agents.auth.runs.submit('run_id', {
   *     field_values: {
   *       email: 'user@example.com',
   *       password: '********',
   *     },
   *   });
   * ```
   */
  submit(
    runID: string,
    body: RunSubmitParams,
    options?: RequestOptions,
  ): APIPromise<AuthAPI.AgentAuthSubmitResponse> {
    return this._client.post(path`/agents/auth/runs/${runID}/submit`, { body, ...options });
  }
}

/**
 * Response from exchange endpoint
 */
export interface RunExchangeResponse {
  /**
   * JWT token with run_id claim (30 minute TTL)
   */
  jwt: string;

  /**
   * Run ID
   */
  run_id: string;
}

export interface RunDiscoverParams {}

export interface RunExchangeParams {
  /**
   * Handoff code from start endpoint
   */
  code: string;
}

export interface RunSubmitParams {
  /**
   * Values for the discovered login fields
   */
  field_values: { [key: string]: string };
}

export declare namespace Runs {
  export {
    type RunExchangeResponse as RunExchangeResponse,
    type RunDiscoverParams as RunDiscoverParams,
    type RunExchangeParams as RunExchangeParams,
    type RunSubmitParams as RunSubmitParams,
  };
}
