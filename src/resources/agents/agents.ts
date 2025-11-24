// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthAPI from './auth/auth';
import {
  AgentAuthDiscoverResponse,
  AgentAuthRunResponse,
  AgentAuthStartResponse,
  AgentAuthSubmitResponse,
  Auth,
  AuthStartParams,
  DiscoveredField,
} from './auth/auth';

export class Agents extends APIResource {
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);
}

Agents.Auth = Auth;

export declare namespace Agents {
  export {
    Auth as Auth,
    type AgentAuthDiscoverResponse as AgentAuthDiscoverResponse,
    type AgentAuthRunResponse as AgentAuthRunResponse,
    type AgentAuthStartResponse as AgentAuthStartResponse,
    type AgentAuthSubmitResponse as AgentAuthSubmitResponse,
    type DiscoveredField as DiscoveredField,
    type AuthStartParams as AuthStartParams,
  };
}
