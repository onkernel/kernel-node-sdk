// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DeploymentsAPI from './deployments';
import { DeploymentCreateParams, DeploymentCreateResponse, Deployments } from './deployments';
import * as InvocationsAPI from './invocations';
import {
  InvocationCreateParams,
  InvocationCreateResponse,
  InvocationRetrieveResponse,
  Invocations,
} from './invocations';

export class Apps extends APIResource {
  deployments: DeploymentsAPI.Deployments = new DeploymentsAPI.Deployments(this._client);
  invocations: InvocationsAPI.Invocations = new InvocationsAPI.Invocations(this._client);
}

Apps.Deployments = Deployments;
Apps.Invocations = Invocations;

export declare namespace Apps {
  export {
    Deployments as Deployments,
    type DeploymentCreateResponse as DeploymentCreateResponse,
    type DeploymentCreateParams as DeploymentCreateParams,
  };

  export {
    Invocations as Invocations,
    type InvocationCreateResponse as InvocationCreateResponse,
    type InvocationRetrieveResponse as InvocationRetrieveResponse,
    type InvocationCreateParams as InvocationCreateParams,
  };
}
