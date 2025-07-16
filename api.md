# Shared

Types:

- <code><a href="./src/resources/shared.ts">AppAction</a></code>
- <code><a href="./src/resources/shared.ts">ErrorDetail</a></code>
- <code><a href="./src/resources/shared.ts">ErrorEvent</a></code>
- <code><a href="./src/resources/shared.ts">ErrorModel</a></code>
- <code><a href="./src/resources/shared.ts">HeartbeatEvent</a></code>
- <code><a href="./src/resources/shared.ts">LogEvent</a></code>

# Deployments

Types:

- <code><a href="./src/resources/deployments.ts">DeploymentStateEvent</a></code>
- <code><a href="./src/resources/deployments.ts">DeploymentCreateResponse</a></code>
- <code><a href="./src/resources/deployments.ts">DeploymentRetrieveResponse</a></code>
- <code><a href="./src/resources/deployments.ts">DeploymentListResponse</a></code>
- <code><a href="./src/resources/deployments.ts">DeploymentFollowResponse</a></code>

Methods:

- <code title="post /deployments">client.deployments.<a href="./src/resources/deployments.ts">create</a>({ ...params }) -> DeploymentCreateResponse</code>
- <code title="get /deployments/{id}">client.deployments.<a href="./src/resources/deployments.ts">retrieve</a>(id) -> DeploymentRetrieveResponse</code>
- <code title="get /deployments">client.deployments.<a href="./src/resources/deployments.ts">list</a>({ ...params }) -> DeploymentListResponse</code>
- <code title="get /deployments/{id}/events">client.deployments.<a href="./src/resources/deployments.ts">follow</a>(id, { ...params }) -> DeploymentFollowResponse</code>

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
- <code title="get /apps/{id}/events">client.apps.deployments.<a href="./src/resources/apps/deployments.ts">follow</a>(id) -> DeploymentFollowResponse</code>

# Invocations

Types:

- <code><a href="./src/resources/invocations.ts">InvocationStateEvent</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationCreateResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationRetrieveResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationUpdateResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationFollowResponse</a></code>

Methods:

- <code title="post /invocations">client.invocations.<a href="./src/resources/invocations.ts">create</a>({ ...params }) -> InvocationCreateResponse</code>
- <code title="get /invocations/{id}">client.invocations.<a href="./src/resources/invocations.ts">retrieve</a>(id) -> InvocationRetrieveResponse</code>
- <code title="patch /invocations/{id}">client.invocations.<a href="./src/resources/invocations.ts">update</a>(id, { ...params }) -> InvocationUpdateResponse</code>
- <code title="delete /invocations/{id}/browsers">client.invocations.<a href="./src/resources/invocations.ts">deleteBrowsers</a>(id) -> void</code>
- <code title="get /invocations/{id}/events">client.invocations.<a href="./src/resources/invocations.ts">follow</a>(id) -> InvocationFollowResponse</code>

# Browsers

Types:

- <code><a href="./src/resources/browsers/browsers.ts">BrowserPersistence</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">BrowserCreateResponse</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">BrowserRetrieveResponse</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">BrowserListResponse</a></code>

Methods:

- <code title="post /browsers">client.browsers.<a href="./src/resources/browsers/browsers.ts">create</a>({ ...params }) -> BrowserCreateResponse</code>
- <code title="get /browsers/{id}">client.browsers.<a href="./src/resources/browsers/browsers.ts">retrieve</a>(id) -> BrowserRetrieveResponse</code>
- <code title="get /browsers">client.browsers.<a href="./src/resources/browsers/browsers.ts">list</a>() -> BrowserListResponse</code>
- <code title="delete /browsers">client.browsers.<a href="./src/resources/browsers/browsers.ts">delete</a>({ ...params }) -> void</code>
- <code title="delete /browsers/{id}">client.browsers.<a href="./src/resources/browsers/browsers.ts">deleteByID</a>(id) -> void</code>

## Replays

Types:

- <code><a href="./src/resources/browsers/replays.ts">ReplayListResponse</a></code>
- <code><a href="./src/resources/browsers/replays.ts">ReplayStartResponse</a></code>

Methods:

- <code title="get /browsers/{id}/replays">client.browsers.replays.<a href="./src/resources/browsers/replays.ts">list</a>(id) -> ReplayListResponse</code>
- <code title="get /browsers/{id}/replays/{replay_id}">client.browsers.replays.<a href="./src/resources/browsers/replays.ts">download</a>(replayID, { ...params }) -> Response</code>
- <code title="post /browsers/{id}/replays">client.browsers.replays.<a href="./src/resources/browsers/replays.ts">start</a>(id, { ...params }) -> ReplayStartResponse</code>
- <code title="post /browsers/{id}/replays/{replay_id}/stop">client.browsers.replays.<a href="./src/resources/browsers/replays.ts">stop</a>(replayID, { ...params }) -> void</code>
