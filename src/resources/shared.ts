// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface Error {
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
  error: Error;

  /**
   * Event type identifier (always "error").
   */
  event: 'error';

  /**
   * Time the error occurred.
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
