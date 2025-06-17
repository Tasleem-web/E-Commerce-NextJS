

export const MESSAGE = 'message';
export const RESULT = 'result';
export const ERROR = 'error';
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const INFO = 'info';
export const STATUS = 'status';


export const ENUMS = {
  1: MESSAGE,
  2: RESULT,
  3: ERROR,
  4: SUCCESS,
  5: WARNING,
  6: INFO,
  7: STATUS
};

export const Statuses = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning',
  INFO: 'Info',
  MESSAGE: 'Message',
  RESULT: 'Result',
  STATUS: 'Status'
};

export const StatusCode = {
  '200': 'OK',
  '201': 'Created',
  '202': 'Accepted',
  '204': 'No Content',
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '500': 'Internal Server Error',
  '503': 'Service Unavailable'
};

export const ErrorCode = {
  '400': 'Bad Request',
  '401': 'Unauthorized',
  '403': 'Forbidden',
  '404': 'Not Found',
  '500': 'Internal Server Error',
  '503': 'Service Unavailable'
};

export const HttpStatus = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  ServiceUnavailable: 503
};

export const HttpStatusText = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD'
};

export const ContentType = {
  JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  MULTIPART_FORM_DATA: 'multipart/form-data',
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html'
};

export const CacheControl = {
  NO_CACHE: 'no-cache',
  NO_STORE: 'no-store',
  MUST_REVALIDATE: 'must-revalidate',
  PUBLIC: 'public',
  PRIVATE: 'private',
  MAX_AGE: (seconds) => `max-age=${seconds}`,
  S_MAXAGE: (seconds) => `s-maxage=${seconds}`
};

export const CORSHeaders = {
  ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
  ALLOW_METHODS: 'Access-Control-Allow-Methods',
  ALLOW_HEADERS: 'Access-Control-Allow-Headers',
  EXPOSE_HEADERS: 'Access-Control-Expose-Headers',
  MAX_AGE: 'Access-Control-Max-Age',
  ALLOW_CREDENTIALS: 'Access-Control-Allow-Credentials'
};

export const SecurityHeaders = {
  CONTENT_SECURITY_POLICY: 'Content-Security-Policy',
  STRICT_TRANSPORT_SECURITY: 'Strict-Transport-Security',
  X_CONTENT_TYPE_OPTIONS: 'X-Content-Type-Options',
  X_FRAME_OPTIONS: 'X-Frame-Options',
  X_XSS_PROTECTION: 'X-XSS-Protection',
  REFERRER_POLICY: 'Referrer-Policy',
  FEATURE_POLICY: 'Feature-Policy'
};

export const SecurityPolicies = {
  DEFAULT_SRC: "default-src 'self'",
  SCRIPT_SRC: "script-src 'self' 'unsafe-inline'",
  STYLE_SRC: "style-src 'self' 'unsafe-inline'",
  IMG_SRC: "img-src 'self' data:",
  CONNECT_SRC: "connect-src 'self'",
  FRAME_ANCESTORS: "frame-ancestors 'none'",
  FORM_ACTION: "form-action 'self'"
};

export const RateLimitHeaders = {
  X_RATE_LIMIT_LIMIT: 'X-RateLimit-Limit',
  X_RATE_LIMIT_REMAINING: 'X-RateLimit-Remaining',
  X_RATE_LIMIT_RESET: 'X-RateLimit-Reset'
};

export const PaginationHeaders = {
  X_TOTAL_COUNT: 'X-Total-Count',
  X_TOTAL_PAGES: 'X-Total-Pages',
  X_CURRENT_PAGE: 'X-Current-Page',
  X_PER_PAGE: 'X-Per-Page'
};

export const CustomHeaders = {
  X_REQUEST_ID: 'X-Request-ID',
  X_CORRELATION_ID: 'X-Correlation-ID',
  X_CLIENT_ID: 'X-Client-ID',
  X_API_VERSION: 'X-API-Version',
  X_APP_VERSION: 'X-App-Version'
};