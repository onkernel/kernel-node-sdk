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
