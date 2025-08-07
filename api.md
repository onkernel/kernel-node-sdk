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

- <code><a href="./src/resources/apps.ts">AppListResponse</a></code>

Methods:

- <code title="get /apps">client.apps.<a href="./src/resources/apps.ts">list</a>({ ...params }) -> AppListResponse</code>

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

## Fs

Types:

- <code><a href="./src/resources/browsers/fs/fs.ts">FFileInfoResponse</a></code>
- <code><a href="./src/resources/browsers/fs/fs.ts">FListFilesResponse</a></code>

Methods:

- <code title="put /browsers/{id}/fs/create_directory">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">createDirectory</a>(id, { ...params }) -> void</code>
- <code title="put /browsers/{id}/fs/delete_directory">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">deleteDirectory</a>(id, { ...params }) -> void</code>
- <code title="put /browsers/{id}/fs/delete_file">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">deleteFile</a>(id, { ...params }) -> void</code>
- <code title="get /browsers/{id}/fs/file_info">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">fileInfo</a>(id, { ...params }) -> FFileInfoResponse</code>
- <code title="get /browsers/{id}/fs/list_files">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">listFiles</a>(id, { ...params }) -> FListFilesResponse</code>
- <code title="put /browsers/{id}/fs/move">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">move</a>(id, { ...params }) -> void</code>
- <code title="get /browsers/{id}/fs/read_file">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">readFile</a>(id, { ...params }) -> Response</code>
- <code title="put /browsers/{id}/fs/set_file_permissions">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">setFilePermissions</a>(id, { ...params }) -> void</code>
- <code title="put /browsers/{id}/fs/write_file">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">writeFile</a>(id, contents, { ...params }) -> void</code>

### Watch

Types:

- <code><a href="./src/resources/browsers/fs/watch.ts">WatchEventsResponse</a></code>
- <code><a href="./src/resources/browsers/fs/watch.ts">WatchStartResponse</a></code>

Methods:

- <code title="get /browsers/{id}/fs/watch/{watch_id}/events">client.browsers.fs.watch.<a href="./src/resources/browsers/fs/watch.ts">events</a>(watchID, { ...params }) -> WatchEventsResponse</code>
- <code title="post /browsers/{id}/fs/watch">client.browsers.fs.watch.<a href="./src/resources/browsers/fs/watch.ts">start</a>(id, { ...params }) -> WatchStartResponse</code>
- <code title="delete /browsers/{id}/fs/watch/{watch_id}">client.browsers.fs.watch.<a href="./src/resources/browsers/fs/watch.ts">stop</a>(watchID, { ...params }) -> void</code>
