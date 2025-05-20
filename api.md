# Apps

Types:

- <code><a href="./src/resources/apps/apps.ts">AppListResponse</a></code>

Methods:

- <code title="get /apps">client.apps.<a href="./src/resources/apps/apps.ts">list</a>({ ...params }) -> AppListResponse</code>

## Deployments

Types:

- <code><a href="./src/resources/apps/deployments.ts">DeploymentCreateResponse</a></code>
- <code><a href="./src/resources/apps/deployments.ts">DeploymentFollowResponse</a></code>

Methods:

- <code title="post /deploy">client.apps.deployments.<a href="./src/resources/apps/deployments.ts">create</a>({ ...params }) -> DeploymentCreateResponse</code>
- <code title="get /apps/{id}/events">client.apps.deployments.<a href="./src/resources/apps/deployments.ts">follow</a>(id) -> unknown</code>

## Invocations

Types:

- <code><a href="./src/resources/apps/invocations.ts">InvocationCreateResponse</a></code>
- <code><a href="./src/resources/apps/invocations.ts">InvocationRetrieveResponse</a></code>

Methods:

- <code title="post /invocations">client.apps.invocations.<a href="./src/resources/apps/invocations.ts">create</a>({ ...params }) -> InvocationCreateResponse</code>
- <code title="get /invocations/{id}">client.apps.invocations.<a href="./src/resources/apps/invocations.ts">retrieve</a>(id) -> InvocationRetrieveResponse</code>

# Browsers

Types:

- <code><a href="./src/resources/browsers.ts">BrowserCreateResponse</a></code>
- <code><a href="./src/resources/browsers.ts">BrowserRetrieveResponse</a></code>

Methods:

- <code title="post /browsers">client.browsers.<a href="./src/resources/browsers.ts">create</a>({ ...params }) -> BrowserCreateResponse</code>
- <code title="get /browsers/{id}">client.browsers.<a href="./src/resources/browsers.ts">retrieve</a>(id) -> BrowserRetrieveResponse</code>
