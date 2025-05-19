export interface KernelContext {
  invocation_id: string;
}

export interface KernelAction {
  name: string;
  handler: (context: KernelContext, input: any) => Promise<any>;
}

export interface KernelJson {
  apps: KernelAppJson[];
}

export interface KernelAppJson {
  name: string;
  actions: KernelActionJson[];
}

export interface KernelActionJson {
  name: string;
}

export class KernelApp {
  name: string;
  actions: Map<string, KernelAction> = new Map();

  constructor(name: string) {
    this.name = name;
    // Register this app in the global registry
    appRegistry.registerApp(this);
  }

  /**
   * Define an action
   */
  action<T, R>(
    nameOrHandler: string | ((input: T) => Promise<R>) | ((context: KernelContext, input: T) => Promise<R>),
    handler?: ((input: T) => Promise<R>) | ((context: KernelContext, input: T) => Promise<R>),
  ) {
    let actionName: string;
    let actionHandler: (context: KernelContext, input: T) => Promise<R>;

    if (typeof nameOrHandler === 'string' && handler) {
      // Case: app.action("name", handler)
      actionName = nameOrHandler;

      // Create a handler that accepts context and input, adapting if needed
      if (handler.length === 1) {
        // Original handler only takes input, so we adapt it to the new signature
        const singleArgHandler = handler as (input: T) => Promise<R>;
        actionHandler = async (context: KernelContext, input: T) => singleArgHandler(input);
      } else {
        // Handler takes both context and input
        actionHandler = handler as (context: KernelContext, input: T) => Promise<R>;
      }
    } else if (typeof nameOrHandler === 'function') {
      // Case: app.action(handler)
      actionName = nameOrHandler.name || 'default';

      // Create a handler that accepts context and input, adapting if needed
      if (nameOrHandler.length === 1) {
        // Original handler only takes input, so we adapt it to the new signature
        const singleArgHandler = nameOrHandler as (input: T) => Promise<R>;
        actionHandler = async (context: KernelContext, input: T) => singleArgHandler(input);
      } else {
        // Handler takes both context and input
        actionHandler = nameOrHandler as (context: KernelContext, input: T) => Promise<R>;
      }
    } else {
      throw new Error('Invalid action definition');
    }

    // Register the action
    this.actions.set(actionName, {
      name: actionName,
      handler: actionHandler,
    });

    return actionHandler;
  }

  /**
   * Get all actions for this app
   */
  getActions(): KernelAction[] {
    return Array.from(this.actions.values());
  }

  /**
   * Get an action by name
   */
  getAction(name: string): KernelAction | undefined {
    return this.actions.get(name);
  }

  /**
   * Export app information without handlers
   */
  toJSON(): KernelAppJson {
    return {
      name: this.name,
      actions: this.getActions().map((action) => ({
        name: action.name,
      })),
    };
  }
}

// Registry for storing all Kernel apps
class KernelAppRegistry {
  private apps: Map<string, KernelApp> = new Map();

  registerApp(app: KernelApp): void {
    this.apps.set(app.name, app);
  }

  getApps(): KernelApp[] {
    return Array.from(this.apps.values());
  }

  getAppByName(name: string): KernelApp | undefined {
    return this.apps.get(name);
  }

  export(): KernelJson {
    return {
      apps: this.getApps().map((app) => app.toJSON()),
    };
  }

  exportJSON(): string {
    return JSON.stringify(this.export(), null, 2);
  }
}

// Create a singleton registry for apps
export const appRegistry = new KernelAppRegistry();
