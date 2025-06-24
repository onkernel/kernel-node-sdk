// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface ErrorDetail {
  /**
   * Lower-level error code providing more specific detail
   */
  code?: string;

  /**
   * Further detail about the error
   */
  message?: string;
}

/**
 * An error event from the application.
 */
export interface ErrorEvent {
  error: ErrorModel;

  /**
   * Event type identifier (always "error").
   */
  event: 'error';

  /**
   * Time the error occurred.
   */
  timestamp: string;
}

export interface ErrorModel {
  /**
   * Application-specific error code (machine-readable)
   */
  code: string;

  /**
   * Human-readable error description for debugging
   */
  message: string;

  /**
   * Additional error details (for multiple errors)
   */
  details?: Array<ErrorDetail>;

  inner_error?: ErrorDetail;
}

/**
 * Heartbeat event sent periodically to keep SSE connection alive.
 */
export interface HeartbeatEvent {
  /**
   * Event type identifier (always "sse_heartbeat").
   */
  event: 'sse_heartbeat';

  /**
   * Time the heartbeat was sent.
   */
  timestamp: string;
}

/**
 * A log entry from the application.
 */
export interface LogEvent {
  /**
   * Event type identifier (always "log").
   */
  event: 'log';

  /**
   * Log message text.
   */
  message: string;

  /**
   * Time the log entry was produced.
   */
  timestamp: string;
}
