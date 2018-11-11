type HonokaRequestType =
  | ''
  | 'audio'
  | 'font'
  | 'image'
  | 'script'
  | 'style'
  | 'track'
  | 'video';
type HonokaRequestDestination =
  | ''
  | 'document'
  | 'embed'
  | 'font'
  | 'image'
  | 'manifest'
  | 'media'
  | 'object'
  | 'report'
  | 'script'
  | 'serviceworker'
  | 'sharedworker'
  | 'style'
  | 'worker'
  | 'xslt';
type HonokaRequestMode = 'navigate' | 'same-origin' | 'no-cors' | 'cors';
type HonokaRequestCredentials = 'omit' | 'same-origin' | 'include';
type HonokaRequestCache =
  | 'default'
  | 'no-store'
  | 'reload'
  | 'no-cache'
  | 'force-cache'
  | 'only-if-cached';
type HonokaRequestRedirect = 'follow' | 'error' | 'manual';

type HonokaReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'same-origin'
  | 'origin'
  | 'strict-origin'
  | 'origin-when-cross-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

type HonokaDataType =
  | ''
  | 'auto'
  | 'arraybuffer'
  | 'blob'
  | 'json'
  | 'text'
  | 'buffer';

export interface HonokaRequestOptions {
  method?: string;
  headers?: HonokaHeaders;
  data?: any;
  dataType?: HonokaDataType;
  body?: any;
  referrer?: string;
  referrerPolicy?: HonokaReferrerPolicy;
  mode?: HonokaRequestMode;
  credentials?: HonokaRequestCredentials;
  cache?: HonokaRequestCache;
  redirect?: HonokaRequestRedirect;
  integrity?: string;
  signal?: AbortSignal | null;
  window?: null;
  follow?: number;
  baseURL?: string;
  timeout?: number;
  expectedStatus?(status: number): boolean;
  compress?: boolean;
  size?: number;
  agent?: any;
}

export interface HonokaHeaders {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  entries(): IterableIterator<[string, string]>;
  forEach(
    callback: (value: string, index: number, headers: HonokaHeaders) => void,
    thisArg?: any
  ): void;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[string, string]>;
}

export type HonokaResponseData = any;

export interface HonokaResponseBody {
  readonly bodyUsed: boolean;
  arrayBuffer(): Promise<any>;
  blob(): Promise<any>;
  formData(): Promise<any>;
  json(): Promise<any>;
  json<T>(): Promise<T>;
  text(): Promise<string>;
}

export interface HonokaResponse {
  readonly type: HonokaRequestType;
  readonly url: string;
  readonly redirected: boolean;
  readonly status: number;
  readonly ok: boolean;
  readonly statusText: string;
  readonly headers: HonokaHeaders;
  readonly body: any;
  readonly trailer: Promise<HonokaHeaders>;
  clone(): HonokaResponse;
}

export interface HonokaPromise extends Promise<HonokaResponseData> {}

export interface HonokaInterceptorOptions {
  request?(options: HonokaRequestOptions): HonokaRequestOptions;
  response?(
    data: HonokaResponseData,
    response: HonokaResponse
  ): [HonokaResponseData, HonokaResponse];
}

export interface HonokaInterceptors {
  register(interceptors: HonokaInterceptorOptions): () => void;
  clear(): void;
  get(): Array<any>;
}

export interface HonokaStatic {
  (url: string, options?: HonokaRequestOptions): HonokaPromise;
  defaults: HonokaRequestOptions;
  interceptors: HonokaInterceptors;
  get(url: string, options?: HonokaRequestOptions): HonokaPromise;
  delete(url: string, options?: HonokaRequestOptions): HonokaPromise;
  head(url: string, options?: HonokaRequestOptions): HonokaPromise;
  options(url: string, options?: HonokaRequestOptions): HonokaPromise;
  post(url: string, options?: HonokaRequestOptions): HonokaPromise;
  put(url: string, options?: HonokaRequestOptions): HonokaPromise;
  patch(url: string, options?: HonokaRequestOptions): HonokaPromise;
  response: HonokaResponse;
  version: string;
}

declare const honoka: HonokaStatic;

export default honoka;
