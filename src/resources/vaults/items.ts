// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ItemsAPI from './items';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Items extends APIResource {
  /**
   * The response advertises operations that are valid in the item's current state
   * and live data that can be requested through `expand`. Read each operation's
   * description before using it. Expanded data is fetched from the provider and is
   * not persisted in the vault item. Requesting an unavailable expansion returns 409
   * instead of a partial item.
   *
   * @example
   * ```ts
   * const vaultItem = await client.vaults.items.retrieve('x', {
   *   id_or_name: 'id_or_name',
   * });
   * ```
   */
  retrieve(key: string, params: ItemRetrieveParams, options?: RequestOptions): APIPromise<VaultItem> {
    const { id_or_name, ...query } = params;
    return this._client.get(path`/vaults/${id_or_name}/items/${key}`, { query, ...options });
  }

  /**
   * Requested cards accept a replacement specification. Pending issuance requests
   * may update provider-supported fields on their existing request, subject to
   * atomic provider approval checks; omitted optional fields remain unchanged and
   * explicit empty lists clear them. Wallet/provider binding and unsupported fields
   * cannot change after authorization starts. An uncertain update enters
   * recovery_required and must not be retried. Checkout cards may be edited between
   * authorizations.
   *
   * @example
   * ```ts
   * const vaultItem = await client.vaults.items.update('x', {
   *   id_or_name: 'id_or_name',
   *   spec: {
   *     provider: 'link',
   *     wallet: 'link-wallet',
   *     payment_method_id: 'pm_example',
   *     amount: 3000,
   *     currency: 'usd',
   *     merchant_name: 'Example Store',
   *     merchant_url: 'https://store.example.com',
   *     context:
   *       'The order total changed to USD 30.00 including shipping and taxes for one notebook. Update this unapproved request rather than creating a second payment.',
   *   },
   * });
   * ```
   */
  update(key: string, params: ItemUpdateParams, options?: RequestOptions): APIPromise<VaultItem> {
    const { id_or_name, ...body } = params;
    return this._client.patch(path`/vaults/${id_or_name}/items/${key}`, { body, ...options });
  }

  /**
   * List vault items without secret values
   *
   * @example
   * ```ts
   * const vaultItems = await client.vaults.items.list(
   *   'id_or_name',
   * );
   * ```
   */
  list(idOrName: string, options?: RequestOptions): APIPromise<ItemListResponse> {
    return this._client.get(path`/vaults/${idOrName}/items`, options);
  }

  /**
   * Unresolved payment operations block deletion, including operations on child
   * cards of a wallet. Reconcile the original attempt with the provider or support
   * first; deleting or recreating an item is not proof that a payment did not occur.
   *
   * @example
   * ```ts
   * await client.vaults.items.delete('x', {
   *   id_or_name: 'id_or_name',
   * });
   * ```
   */
  delete(key: string, params: ItemDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { id_or_name } = params;
    return this._client.delete(path`/vaults/${id_or_name}/items/${key}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List immutable audit events for a vault item
   *
   * @example
   * ```ts
   * const vaultItemEvents = await client.vaults.items.events(
   *   'key',
   *   { id_or_name: 'id_or_name' },
   * );
   * ```
   */
  events(key: string, params: ItemEventsParams, options?: RequestOptions): APIPromise<ItemEventsResponse> {
    const { id_or_name, ...query } = params;
    return this._client.get(path`/vaults/${id_or_name}/items/${key}/events`, { query, ...options });
  }

  /**
   * Retrieve the item first and invoke only an operation listed in
   * `available_operations`, following its natural-language description. Operations
   * may call an external provider and return updated state. Link cards advertise
   * authorize. AgentCard cards are created with PUT and request approval when their
   * aliases are used at checkout; they do not expose this operation. If
   * spend-request creation is rate limited, returns HTTP 429 with code
   * `spend_request_rate_limited`; stop and back off before retrying.
   *
   * @example
   * ```ts
   * const vaultItem =
   *   await client.vaults.items.performOperation('key', {
   *     id_or_name: 'id_or_name',
   *     type: 'authorize',
   *   });
   * ```
   */
  performOperation(
    key: string,
    params: ItemPerformOperationParams,
    options?: RequestOptions,
  ): APIPromise<VaultItem> {
    const { id_or_name, ...body } = params;
    return this._client.post(path`/vaults/${id_or_name}/items/${key}/operations`, { body, ...options });
  }

  /**
   * Create an item under a key unique within its vault, or retrieve the existing
   * item when its specification matches. An identical card PUT returns the existing
   * card in any lifecycle state without polling the provider, reauthorizing,
   * replacing aliases, or resetting recovery. Conflicting specifications return 409.
   * Provider-specific authorization requirements and retry behavior are described in
   * the item's request schema.
   *
   * @example
   * ```ts
   * const vaultItem = await client.vaults.items.upsert('x', {
   *   id_or_name: 'id_or_name',
   *   spec: { provider: 'link' },
   *   type: 'card',
   * });
   * ```
   */
  upsert(key: string, params: ItemUpsertParams, options?: RequestOptions): APIPromise<VaultItem> {
    const { id_or_name, ...body } = params;
    return this._client.put(path`/vaults/${id_or_name}/items/${key}`, { body, ...options });
  }
}

/**
 * The in-flight or most recent checkout authorization. Present while a checkout is
 * pending approval and after it settles.
 */
export interface AgentcardCheckoutAuthorization {
  id: string;

  amount_cents: number;

  created_at: string;

  currency: string;

  merchant: string;

  psp: string;

  status: 'awaiting_approval' | 'approved' | 'declined' | 'expired';

  actual_cents?: number;

  /**
   * Display amount shown on the approval screen.
   */
  amount?: string;

  amount_authority?: 'display_only' | 'stripe_payment_intent';

  amount_verified?: boolean;

  approval_url?: string;

  /**
   * Browser session that submitted the checkout.
   */
  browser_id?: string;

  charged_amount_cents?: number;

  charged_currency?: string;

  charged_kind?: 'captured' | 'authorized' | 'none';

  expected_cents?: number;

  expires_at?: string;

  psp_error_code?: string;

  reason?: string;

  replay_attempted?: boolean;

  /**
   * Whether the processor response was delivered to the browser.
   */
  replay_delivered?: boolean;

  /**
   * HTTP status of the replayed processor response.
   */
  replay_status?: number;
}

/**
 * Live payment card. Test-mode card creation is not supported.
 */
export type CardVaultItemSpec =
  | CardVaultItemSpec.LinkCardVaultItemSpec
  | CardVaultItemSpec.AgentCardCardVaultItemSpec;

export namespace CardVaultItemSpec {
  /**
   * Live payment card. Test-mode card creation is not supported.
   */
  export interface LinkCardVaultItemSpec {
    /**
     * Integer amount in minor currency units.
     */
    amount: number;

    context: string;

    currency: string;

    merchant_name: string;

    merchant_url: string;

    /**
     * Payment-method ID returned by the referenced wallet's payment-method listing.
     * The provider decides whether the selected funding method can satisfy the card
     * request.
     */
    payment_method_id: string;

    provider: 'link';

    /**
     * Wallet item key used to mint this card.
     */
    wallet: string;

    expires_at?: number;

    line_items?: Array<LinkCardVaultItemSpec.LineItem>;

    metadata?: { [key: string]: string };

    totals?: Array<LinkCardVaultItemSpec.Total>;
  }

  export namespace LinkCardVaultItemSpec {
    export interface LineItem {
      name: string;

      description?: string;

      image_url?: string;

      product_url?: string;

      quantity?: number;

      sku?: string;

      totals?: Array<LineItem.Total>;

      /**
       * Unit amount in minor currency units.
       */
      unit_amount?: number;

      url?: string;
    }

    export namespace LineItem {
      export interface Total {
        /**
         * Total amount in minor currency units.
         */
        amount: number;

        display_text: string;

        type: string;
      }
    }

    export interface Total {
      /**
       * Total amount in minor currency units.
       */
      amount: number;

      display_text: string;

      type: string;
    }
  }

  /**
   * AgentCard reusable live payment card. Test-mode card creation is not supported.
   * Each checkout creates an approval-gated authorization for spec.merchant /
   * spec.amount. The card stays ready after each authorization.
   */
  export interface AgentCardCardVaultItemSpec {
    /**
     * Integer amount in minor currency units.
     */
    amount: number;

    currency: string;

    /**
     * Merchant name shown on the cardholder's approval screen.
     */
    merchant: string;

    provider: 'agentcard';

    /**
     * Wallet item key used to authorize checkouts.
     */
    wallet: string;

    /**
     * AgentCard vaulted card to pay with. Omitted, the cardholder picks on the
     * approval screen.
     */
    card_id?: string;
  }
}

export type CardVaultItemState = CardVaultItemState.LinkCardState | CardVaultItemState.AgentCardCardState;

export namespace CardVaultItemState {
  export interface LinkCardState {
    provider: 'link';

    /**
     * recovery_required means an original provider operation has an unresolved
     * outcome. Do not retry, delete, or replace it. Known references may be observed
     * safely, but unknown creation without an ID and uncertain card-material retrieval
     * require manual reconciliation with the provider or support. There is no reset or
     * caller-asserted reconciliation operation.
     */
    status:
      | 'requested'
      | 'pending_authorization'
      | 'ready'
      | 'consumed'
      | 'expired'
      | 'declined'
      | 'recovery_required';

    aliases?: ItemsAPI.VaultCardAliases;

    domains?: Array<string>;

    masks?: LinkCardState.Masks;

    status_reason?: string;
  }

  export namespace LinkCardState {
    export interface Masks {
      brand?: string;

      last4?: string;

      [k: string]: string | undefined;
    }
  }

  export interface AgentCardCardState {
    provider: 'agentcard';

    /**
     * recovery_required means the original checkout outcome is unresolved. Do not
     * retry, delete, or replace it. Known authorization IDs may be reconciled through
     * provider observations; otherwise contact the provider or support for manual
     * reconciliation. It does not mean declined or expired.
     */
    status: 'requested' | 'ready' | 'pending_approval' | 'degraded' | 'recovery_required';

    aliases?: ItemsAPI.VaultCardAliases;

    /**
     * The in-flight or most recent checkout authorization. Present while a checkout is
     * pending approval and after it settles.
     */
    authorization?: ItemsAPI.AgentcardCheckoutAuthorization;

    masks?: AgentCardCardState.Masks;

    status_reason?: string;
  }

  export namespace AgentCardCardState {
    export interface Masks {
      brand?: string;

      last4?: string;

      [k: string]: string | undefined;
    }
  }
}

export interface VaultCardAliases {
  cvc: string;

  exp_month: string;

  exp_year: string;

  number: string;
}

export type VaultItem = VaultItem.WalletVaultItem | VaultItem.CardVaultItem;

export namespace VaultItem {
  export interface WalletVaultItem {
    id: string;

    available_expansions: Array<WalletVaultItem.AvailableExpansion>;

    available_operations: Array<WalletVaultItem.AvailableOperation>;

    created_at: string;

    /**
     * Immutable item key assigned when the item is created.
     */
    key: string;

    /**
     * AgentCard wallet. Omit provider_config to use Kernel-managed credentials, or
     * select a customer-owned configuration. Mode (sandbox vs live) is determined by
     * the selected credential; there is no per-item test flag. Without user_id,
     * creation returns a hosted enrollment action and Kernel polls until the user
     * connects. user_id may only reference a user already enrolled by a wallet in this
     * organization under the same configuration.
     */
    spec: ItemsAPI.WalletVaultItemSpec;

    state: ItemsAPI.WalletVaultItemState;

    type: 'wallet';

    updated_at: string;

    action?: ItemsAPI.VaultItemAction;

    /**
     * Live, non-persisted data requested through the item GET expand parameter.
     */
    expanded?: WalletVaultItem.Expanded;

    expires_at?: string;
  }

  export namespace WalletVaultItem {
    /**
     * Live data that can currently be requested by passing its type to the item GET
     * expand parameter.
     */
    export interface AvailableExpansion {
      description: string;

      type: 'payment_methods';
    }

    /**
     * An operation that is currently valid for this item. Read the description before
     * invoking it through the item operations endpoint.
     */
    export interface AvailableOperation {
      description: string;

      type: 'authorize';
    }

    /**
     * Live, non-persisted data requested through the item GET expand parameter.
     */
    export interface Expanded {
      payment_methods?: Array<ItemsAPI.VaultPaymentMethod>;
    }
  }

  export interface CardVaultItem {
    id: string;

    available_expansions: Array<CardVaultItem.AvailableExpansion>;

    available_operations: Array<CardVaultItem.AvailableOperation>;

    created_at: string;

    /**
     * Immutable item key assigned when the item is created.
     */
    key: string;

    /**
     * Live payment card. Test-mode card creation is not supported.
     */
    spec: ItemsAPI.CardVaultItemSpec;

    state: ItemsAPI.CardVaultItemState;

    type: 'card';

    updated_at: string;

    action?: ItemsAPI.VaultItemAction;

    expires_at?: string;
  }

  export namespace CardVaultItem {
    /**
     * Live data that can currently be requested by passing its type to the item GET
     * expand parameter.
     */
    export interface AvailableExpansion {
      description: string;

      type: 'payment_methods';
    }

    /**
     * An operation that is currently valid for this item. Read the description before
     * invoking it through the item operations endpoint.
     */
    export interface AvailableOperation {
      description: string;

      type: 'authorize';
    }
  }
}

export type VaultItemAction =
  | VaultItemAction.LinkOAuthAction
  | VaultItemAction.SpendApprovalAction
  | VaultItemAction.PushApprovalAction
  | VaultItemAction.CollectAction
  | VaultItemAction.MfaAction
  | VaultItemAction.EmbeddedCeremonyAction
  | VaultItemAction.CardEnrollmentAction;

export namespace VaultItemAction {
  export interface LinkOAuthAction {
    name: 'link_oauth';

    url: string;
  }

  export interface SpendApprovalAction {
    name: 'spend_approval';

    url: string;
  }

  export interface PushApprovalAction {
    name: 'push_approval';
  }

  export interface CollectAction {
    name: 'collect';
  }

  export interface MfaAction {
    name: 'mfa';
  }

  export interface EmbeddedCeremonyAction {
    name: 'embedded_ceremony';
  }

  export interface CardEnrollmentAction {
    name: 'card_enrollment';

    url: string;
  }
}

export interface VaultItemEvent {
  id: string;

  created_at: string;

  name: string;

  /**
   * Browser session associated with the event, when applicable.
   */
  browser_id?: string;

  data?: { [key: string]: unknown };
}

export interface VaultPaymentMethod {
  id: string;

  /**
   * Provider-reported advisory capabilities. A missing capability is unknown, not
   * ineligible; only eligible=false is an explicit negative signal.
   */
  capabilities: VaultPaymentMethod.Capabilities;

  display: VaultPaymentMethod.Display;

  is_default: boolean;

  /**
   * Provider that issued this payment-method ID.
   */
  provider: string;

  /**
   * Provider-neutral payment-method type normalized to lowercase.
   */
  type: string;
}

export namespace VaultPaymentMethod {
  /**
   * Provider-reported advisory capabilities. A missing capability is unknown, not
   * ineligible; only eligible=false is an explicit negative signal.
   */
  export interface Capabilities {
    single_use_card?: Capabilities.SingleUseCard;
  }

  export namespace Capabilities {
    export interface SingleUseCard {
      eligible: boolean;

      reasons: Array<string>;
    }
  }

  export interface Display {
    brand?: string;

    label?: string;

    last4?: string;
  }
}

/**
 * AgentCard wallet. Omit provider_config to use Kernel-managed credentials, or
 * select a customer-owned configuration. Mode (sandbox vs live) is determined by
 * the selected credential; there is no per-item test flag. Without user_id,
 * creation returns a hosted enrollment action and Kernel polls until the user
 * connects. user_id may only reference a user already enrolled by a wallet in this
 * organization under the same configuration.
 */
export type WalletVaultItemSpec =
  | WalletVaultItemSpec.LinkWalletVaultItemSpec
  | WalletVaultItemSpec.AgentCardWalletVaultItemSpec;

export namespace WalletVaultItemSpec {
  export interface LinkWalletVaultItemSpec {
    authorization: LinkWalletVaultItemSpec.Authorization;

    provider: 'link';
  }

  export namespace LinkWalletVaultItemSpec {
    export interface Authorization {
      client: Authorization.KernelManagedOAuthClient | Authorization.CustomerManagedOAuthClient;

      method: 'oauth';
    }

    export namespace Authorization {
      export interface KernelManagedOAuthClient {
        type: 'kernel_managed';
      }

      export interface CustomerManagedOAuthClient {
        /**
         * Select a provider config by ID or name. Responses return the ID. Renaming a
         * config does not change existing wallet bindings; a wallet cannot switch to a
         * different config after creation.
         */
        provider_config: CustomerManagedOAuthClient.ProviderConfig;

        type: 'customer_managed';
      }

      export namespace CustomerManagedOAuthClient {
        /**
         * Select a provider config by ID or name. Responses return the ID. Renaming a
         * config does not change existing wallet bindings; a wallet cannot switch to a
         * different config after creation.
         */
        export interface ProviderConfig {
          id?: string;

          name?: string;
        }
      }
    }
  }

  /**
   * AgentCard wallet. Omit provider_config to use Kernel-managed credentials, or
   * select a customer-owned configuration. Mode (sandbox vs live) is determined by
   * the selected credential; there is no per-item test flag. Without user_id,
   * creation returns a hosted enrollment action and Kernel polls until the user
   * connects. user_id may only reference a user already enrolled by a wallet in this
   * organization under the same configuration.
   */
  export interface AgentCardWalletVaultItemSpec {
    provider: 'agentcard';

    /**
     * Select an AgentCard configuration. The wallet's configuration cannot be changed
     * after creation.
     */
    provider_config?: AgentCardWalletVaultItemSpec.ProviderConfig;

    user_id?: string;
  }

  export namespace AgentCardWalletVaultItemSpec {
    /**
     * Select an AgentCard configuration. The wallet's configuration cannot be changed
     * after creation.
     */
    export interface ProviderConfig {
      id?: string;

      name?: string;
    }
  }
}

export type WalletVaultItemState =
  | WalletVaultItemState.LinkWalletState
  | WalletVaultItemState.AgentCardWalletState;

export namespace WalletVaultItemState {
  export interface LinkWalletState {
    provider: 'link';

    status: 'pending_authorization' | 'connected' | 'declined' | 'reconnect_required' | 'degraded';

    status_reason?: string;
  }

  export interface AgentCardWalletState {
    provider: 'agentcard';

    status: 'pending_authorization' | 'connected' | 'degraded';

    status_reason?: string;

    /**
     * AgentCard user id linked to this wallet. Present once connected.
     */
    user_id?: string;
  }
}

export type ItemListResponse = Array<VaultItem>;

export type ItemEventsResponse = Array<VaultItemEvent>;

export interface ItemRetrieveParams {
  /**
   * Path param
   */
  id_or_name: string;

  /**
   * Query param: Live fields advertised by `available_expansions` to include in
   * `expanded`.
   */
  expand?: Array<'payment_methods'>;

  /**
   * Query param: Hold for up to this many seconds while the item is pending
   * authorization or approval.
   */
  wait?: number;
}

export interface ItemUpdateParams {
  /**
   * Path param
   */
  id_or_name: string;

  /**
   * Body param: Live payment card. Test-mode card creation is not supported.
   */
  spec: CardVaultItemSpec;
}

export interface ItemDeleteParams {
  id_or_name: string;
}

export interface ItemEventsParams {
  /**
   * Path param
   */
  id_or_name: string;

  /**
   * Query param: Return events after this event ID.
   */
  after?: string;

  /**
   * Query param: Long-poll for new events for up to this many seconds.
   */
  wait?: number;
}

export interface ItemPerformOperationParams {
  /**
   * Path param
   */
  id_or_name: string;

  /**
   * Body param
   */
  type: 'authorize';
}

export type ItemUpsertParams =
  | ItemUpsertParams.WalletVaultItemRequest
  | ItemUpsertParams.CardVaultItemRequest;

export declare namespace ItemUpsertParams {
  export interface WalletVaultItemRequest {
    /**
     * Path param
     */
    id_or_name: string;

    /**
     * Body param: AgentCard wallet. Omit provider_config to use Kernel-managed
     * credentials, or select a customer-owned configuration. Mode (sandbox vs live) is
     * determined by the selected credential; there is no per-item test flag. Without
     * user_id, creation returns a hosted enrollment action and Kernel polls until the
     * user connects. user_id may only reference a user already enrolled by a wallet in
     * this organization under the same configuration.
     */
    spec:
      | WalletVaultItemRequest.LinkWalletVaultItemRequestSpec
      | WalletVaultItemRequest.AgentCardWalletVaultItemSpec;

    /**
     * Body param
     */
    type: 'wallet';
  }

  export namespace WalletVaultItemRequest {
    export interface LinkWalletVaultItemRequestSpec {
      /**
       * Kernel starts and completes the user's Link authorization flow.
       */
      authorization:
        | LinkWalletVaultItemRequestSpec.KernelManagedLinkAuthorizationInput
        | LinkWalletVaultItemRequestSpec.ImportedLinkAuthorizationInput;

      provider: 'link';
    }

    export namespace LinkWalletVaultItemRequestSpec {
      /**
       * Kernel starts and completes the user's Link authorization flow.
       */
      export interface KernelManagedLinkAuthorizationInput {
        client: KernelManagedLinkAuthorizationInput.Client;

        method: 'oauth';
      }

      export namespace KernelManagedLinkAuthorizationInput {
        export interface Client {
          type: 'kernel_managed';
        }
      }

      /**
       * The customer's backend completes Link OAuth and supplies the resulting tokens.
       * For a new wallet, Kernel verifies the access token can access Link payment
       * methods without consuming or rotating the refresh token. Valid access creates a
       * wallet with state.status=connected. An expired, invalid, revoked, or
       * insufficiently scoped access token returns 400 and no wallet is created. Refresh
       * expired tokens in your backend before importing them. A failed import does not
       * modify existing wallets. After successful import, Kernel owns subsequent
       * refresh-token rotation; the customer must stop refreshing this grant. Import
       * does not verify the refresh token: if it or the configured client credentials
       * are rejected during a later refresh, the imported wallet becomes degraded. An
       * unknown refresh outcome also leaves it degraded; Kernel does not retry a refresh
       * token that may already have been consumed. There is no in-place reauthorization
       * operation for an imported wallet. If this imported wallet's credentials become
       * unusable, obtain a fresh Link OAuth grant in your backend and create a wallet
       * under a NEW wallet key. Use the new wallet for NEW cards and payments, not to
       * retry an old payment whose outcome is uncertain. This does not replace the old
       * grant, rebind existing cards, or resolve their payment outcomes. Retain the old
       * wallet and its cards while reconciling any uncertain payments with the provider
       * or support. Do not repeat an uncertain payment on the new wallet, and do not
       * treat deletion as evidence that it did not execute. Deletion of the old wallet
       * can remain blocked by unresolved child cards. Repeating a create for the same
       * item key and non-secret spec returns the existing wallet without replacing
       * tokens, even if they have rotated or the wallet needs reconnection. ID and name
       * references resolving to the same config are equivalent. A different config or
       * non-secret spec returns 409. This create operation does not replace an existing
       * grant.
       */
      export interface ImportedLinkAuthorizationInput {
        client: ImportedLinkAuthorizationInput.Client;

        method: 'oauth';

        /**
         * Send the token pair from your backend. Both tokens must be from the same Link
         * grant under the referenced client. Supply a currently valid access token. Kernel
         * refreshes when needed after import and uses the expiry returned by Link for
         * subsequent tokens. Tokens are never returned in wallet responses, events, or
         * logs.
         */
        tokens: ImportedLinkAuthorizationInput.Tokens;
      }

      export namespace ImportedLinkAuthorizationInput {
        export interface Client {
          /**
           * Select a provider config by ID or name. Responses return the ID. Renaming a
           * config does not change existing wallet bindings; a wallet cannot switch to a
           * different config after creation.
           */
          provider_config: Client.ProviderConfig;

          type: 'customer_managed';
        }

        export namespace Client {
          /**
           * Select a provider config by ID or name. Responses return the ID. Renaming a
           * config does not change existing wallet bindings; a wallet cannot switch to a
           * different config after creation.
           */
          export interface ProviderConfig {
            id?: string;

            name?: string;
          }
        }

        /**
         * Send the token pair from your backend. Both tokens must be from the same Link
         * grant under the referenced client. Supply a currently valid access token. Kernel
         * refreshes when needed after import and uses the expiry returned by Link for
         * subsequent tokens. Tokens are never returned in wallet responses, events, or
         * logs.
         */
        export interface Tokens {
          access_token: string;

          refresh_token: string;
        }
      }
    }

    /**
     * AgentCard wallet. Omit provider_config to use Kernel-managed credentials, or
     * select a customer-owned configuration. Mode (sandbox vs live) is determined by
     * the selected credential; there is no per-item test flag. Without user_id,
     * creation returns a hosted enrollment action and Kernel polls until the user
     * connects. user_id may only reference a user already enrolled by a wallet in this
     * organization under the same configuration.
     */
    export interface AgentCardWalletVaultItemSpec {
      provider: 'agentcard';

      /**
       * Select an AgentCard configuration. The wallet's configuration cannot be changed
       * after creation.
       */
      provider_config?: AgentCardWalletVaultItemSpec.ProviderConfig;

      user_id?: string;
    }

    export namespace AgentCardWalletVaultItemSpec {
      /**
       * Select an AgentCard configuration. The wallet's configuration cannot be changed
       * after creation.
       */
      export interface ProviderConfig {
        id?: string;

        name?: string;
      }
    }
  }

  export interface CardVaultItemRequest {
    /**
     * Path param
     */
    id_or_name: string;

    /**
     * Body param: Live payment card. Test-mode card creation is not supported.
     */
    spec: CardVaultItemSpec;

    /**
     * Body param
     */
    type: 'card';
  }
}

export declare namespace Items {
  export {
    type AgentcardCheckoutAuthorization as AgentcardCheckoutAuthorization,
    type CardVaultItemSpec as CardVaultItemSpec,
    type CardVaultItemState as CardVaultItemState,
    type VaultCardAliases as VaultCardAliases,
    type VaultItem as VaultItem,
    type VaultItemAction as VaultItemAction,
    type VaultItemEvent as VaultItemEvent,
    type VaultPaymentMethod as VaultPaymentMethod,
    type WalletVaultItemSpec as WalletVaultItemSpec,
    type WalletVaultItemState as WalletVaultItemState,
    type ItemListResponse as ItemListResponse,
    type ItemEventsResponse as ItemEventsResponse,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
    type ItemEventsParams as ItemEventsParams,
    type ItemPerformOperationParams as ItemPerformOperationParams,
    type ItemUpsertParams as ItemUpsertParams,
  };
}
