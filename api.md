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
- <code title="get /deployments">client.deployments.<a href="./src/resources/deployments.ts">list</a>({ ...params }) -> DeploymentListResponsesOffsetPagination</code>
- <code title="get /deployments/{id}/events">client.deployments.<a href="./src/resources/deployments.ts">follow</a>(id, { ...params }) -> DeploymentFollowResponse</code>

# Apps

Types:

- <code><a href="./src/resources/apps.ts">AppListResponse</a></code>

Methods:

- <code title="get /apps">client.apps.<a href="./src/resources/apps.ts">list</a>({ ...params }) -> AppListResponsesOffsetPagination</code>

# Invocations

Types:

- <code><a href="./src/resources/invocations.ts">InvocationStateEvent</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationCreateResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationRetrieveResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationUpdateResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationListResponse</a></code>
- <code><a href="./src/resources/invocations.ts">InvocationFollowResponse</a></code>

Methods:

- <code title="post /invocations">client.invocations.<a href="./src/resources/invocations.ts">create</a>({ ...params }) -> InvocationCreateResponse</code>
- <code title="get /invocations/{id}">client.invocations.<a href="./src/resources/invocations.ts">retrieve</a>(id) -> InvocationRetrieveResponse</code>
- <code title="patch /invocations/{id}">client.invocations.<a href="./src/resources/invocations.ts">update</a>(id, { ...params }) -> InvocationUpdateResponse</code>
- <code title="get /invocations">client.invocations.<a href="./src/resources/invocations.ts">list</a>({ ...params }) -> InvocationListResponsesOffsetPagination</code>
- <code title="delete /invocations/{id}/browsers">client.invocations.<a href="./src/resources/invocations.ts">deleteBrowsers</a>(id) -> void</code>
- <code title="get /invocations/{id}/events">client.invocations.<a href="./src/resources/invocations.ts">follow</a>(id, { ...params }) -> InvocationFollowResponse</code>

# Browsers

Types:

- <code><a href="./src/resources/browsers/browsers.ts">BrowserPersistence</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">Profile</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">BrowserCreateResponse</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">BrowserRetrieveResponse</a></code>
- <code><a href="./src/resources/browsers/browsers.ts">BrowserListResponse</a></code>

Methods:

- <code title="post /browsers">client.browsers.<a href="./src/resources/browsers/browsers.ts">create</a>({ ...params }) -> BrowserCreateResponse</code>
- <code title="get /browsers/{id}">client.browsers.<a href="./src/resources/browsers/browsers.ts">retrieve</a>(id) -> BrowserRetrieveResponse</code>
- <code title="get /browsers">client.browsers.<a href="./src/resources/browsers/browsers.ts">list</a>() -> BrowserListResponse</code>
- <code title="delete /browsers">client.browsers.<a href="./src/resources/browsers/browsers.ts">delete</a>({ ...params }) -> void</code>
- <code title="delete /browsers/{id}">client.browsers.<a href="./src/resources/browsers/browsers.ts">deleteByID</a>(id) -> void</code>
- <code title="post /browsers/{id}/extensions">client.browsers.<a href="./src/resources/browsers/browsers.ts">loadExtensions</a>(id, { ...params }) -> void</code>

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
- <code title="get /browsers/{id}/fs/download_dir_zip">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">downloadDirZip</a>(id, { ...params }) -> Response</code>
- <code title="get /browsers/{id}/fs/file_info">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">fileInfo</a>(id, { ...params }) -> FFileInfoResponse</code>
- <code title="get /browsers/{id}/fs/list_files">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">listFiles</a>(id, { ...params }) -> FListFilesResponse</code>
- <code title="put /browsers/{id}/fs/move">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">move</a>(id, { ...params }) -> void</code>
- <code title="get /browsers/{id}/fs/read_file">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">readFile</a>(id, { ...params }) -> Response</code>
- <code title="put /browsers/{id}/fs/set_file_permissions">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">setFilePermissions</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/fs/upload">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">upload</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/fs/upload_zip">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">uploadZip</a>(id, { ...params }) -> void</code>
- <code title="put /browsers/{id}/fs/write_file">client.browsers.fs.<a href="./src/resources/browsers/fs/fs.ts">writeFile</a>(id, contents, { ...params }) -> void</code>

### Watch

Types:

- <code><a href="./src/resources/browsers/fs/watch.ts">WatchEventsResponse</a></code>
- <code><a href="./src/resources/browsers/fs/watch.ts">WatchStartResponse</a></code>

Methods:

- <code title="get /browsers/{id}/fs/watch/{watch_id}/events">client.browsers.fs.watch.<a href="./src/resources/browsers/fs/watch.ts">events</a>(watchID, { ...params }) -> WatchEventsResponse</code>
- <code title="post /browsers/{id}/fs/watch">client.browsers.fs.watch.<a href="./src/resources/browsers/fs/watch.ts">start</a>(id, { ...params }) -> WatchStartResponse</code>
- <code title="delete /browsers/{id}/fs/watch/{watch_id}">client.browsers.fs.watch.<a href="./src/resources/browsers/fs/watch.ts">stop</a>(watchID, { ...params }) -> void</code>

## Process

Types:

- <code><a href="./src/resources/browsers/process.ts">ProcessExecResponse</a></code>
- <code><a href="./src/resources/browsers/process.ts">ProcessKillResponse</a></code>
- <code><a href="./src/resources/browsers/process.ts">ProcessSpawnResponse</a></code>
- <code><a href="./src/resources/browsers/process.ts">ProcessStatusResponse</a></code>
- <code><a href="./src/resources/browsers/process.ts">ProcessStdinResponse</a></code>
- <code><a href="./src/resources/browsers/process.ts">ProcessStdoutStreamResponse</a></code>

Methods:

- <code title="post /browsers/{id}/process/exec">client.browsers.process.<a href="./src/resources/browsers/process.ts">exec</a>(id, { ...params }) -> ProcessExecResponse</code>
- <code title="post /browsers/{id}/process/{process_id}/kill">client.browsers.process.<a href="./src/resources/browsers/process.ts">kill</a>(processID, { ...params }) -> ProcessKillResponse</code>
- <code title="post /browsers/{id}/process/spawn">client.browsers.process.<a href="./src/resources/browsers/process.ts">spawn</a>(id, { ...params }) -> ProcessSpawnResponse</code>
- <code title="get /browsers/{id}/process/{process_id}/status">client.browsers.process.<a href="./src/resources/browsers/process.ts">status</a>(processID, { ...params }) -> ProcessStatusResponse</code>
- <code title="post /browsers/{id}/process/{process_id}/stdin">client.browsers.process.<a href="./src/resources/browsers/process.ts">stdin</a>(processID, { ...params }) -> ProcessStdinResponse</code>
- <code title="get /browsers/{id}/process/{process_id}/stdout/stream">client.browsers.process.<a href="./src/resources/browsers/process.ts">stdoutStream</a>(processID, { ...params }) -> ProcessStdoutStreamResponse</code>

## Logs

Methods:

- <code title="get /browsers/{id}/logs/stream">client.browsers.logs.<a href="./src/resources/browsers/logs.ts">stream</a>(id, { ...params }) -> LogEvent</code>

## Computer

Types:

- <code><a href="./src/resources/browsers/computer.ts">ComputerSetCursorVisibilityResponse</a></code>

Methods:

- <code title="post /browsers/{id}/computer/screenshot">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">captureScreenshot</a>(id, { ...params }) -> Response</code>
- <code title="post /browsers/{id}/computer/click_mouse">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">clickMouse</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/computer/drag_mouse">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">dragMouse</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/computer/move_mouse">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">moveMouse</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/computer/press_key">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">pressKey</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/computer/scroll">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">scroll</a>(id, { ...params }) -> void</code>
- <code title="post /browsers/{id}/computer/cursor">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">setCursorVisibility</a>(id, { ...params }) -> ComputerSetCursorVisibilityResponse</code>
- <code title="post /browsers/{id}/computer/type">client.browsers.computer.<a href="./src/resources/browsers/computer.ts">typeText</a>(id, { ...params }) -> void</code>

## Playwright

Types:

- <code><a href="./src/resources/browsers/playwright.ts">PlaywrightExecuteResponse</a></code>

Methods:

- <code title="post /browsers/{id}/playwright/execute">client.browsers.playwright.<a href="./src/resources/browsers/playwright.ts">execute</a>(id, { ...params }) -> PlaywrightExecuteResponse</code>

# Profiles

Types:

- <code><a href="./src/resources/profiles.ts">ProfileListResponse</a></code>

Methods:

- <code title="post /profiles">client.profiles.<a href="./src/resources/profiles.ts">create</a>({ ...params }) -> Profile</code>
- <code title="get /profiles/{id_or_name}">client.profiles.<a href="./src/resources/profiles.ts">retrieve</a>(idOrName) -> Profile</code>
- <code title="get /profiles">client.profiles.<a href="./src/resources/profiles.ts">list</a>() -> ProfileListResponse</code>
- <code title="delete /profiles/{id_or_name}">client.profiles.<a href="./src/resources/profiles.ts">delete</a>(idOrName) -> void</code>
- <code title="get /profiles/{id_or_name}/download">client.profiles.<a href="./src/resources/profiles.ts">download</a>(idOrName) -> Response</code>

# Proxies

Types:

- <code><a href="./src/resources/proxies.ts">ProxyCreateResponse</a></code>
- <code><a href="./src/resources/proxies.ts">ProxyRetrieveResponse</a></code>
- <code><a href="./src/resources/proxies.ts">ProxyListResponse</a></code>

Methods:

- <code title="post /proxies">client.proxies.<a href="./src/resources/proxies.ts">create</a>({ ...params }) -> ProxyCreateResponse</code>
- <code title="get /proxies/{id}">client.proxies.<a href="./src/resources/proxies.ts">retrieve</a>(id) -> ProxyRetrieveResponse</code>
- <code title="get /proxies">client.proxies.<a href="./src/resources/proxies.ts">list</a>() -> ProxyListResponse</code>
- <code title="delete /proxies/{id}">client.proxies.<a href="./src/resources/proxies.ts">delete</a>(id) -> void</code>

# Extensions

Types:

- <code><a href="./src/resources/extensions.ts">ExtensionListResponse</a></code>
- <code><a href="./src/resources/extensions.ts">ExtensionUploadResponse</a></code>

Methods:

- <code title="get /extensions">client.extensions.<a href="./src/resources/extensions.ts">list</a>() -> ExtensionListResponse</code>
- <code title="delete /extensions/{id_or_name}">client.extensions.<a href="./src/resources/extensions.ts">delete</a>(idOrName) -> void</code>
- <code title="get /extensions/{id_or_name}">client.extensions.<a href="./src/resources/extensions.ts">download</a>(idOrName) -> Response</code>
- <code title="get /extensions/from_chrome_store">client.extensions.<a href="./src/resources/extensions.ts">downloadFromChromeStore</a>({ ...params }) -> Response</code>
- <code title="post /extensions">client.extensions.<a href="./src/resources/extensions.ts">upload</a>({ ...params }) -> ExtensionUploadResponse</code>
