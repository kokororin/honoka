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

export interface HonokaRequestOptions {
  method?: string;
  headers?: HonokaHeaders;
  data?: any;
  body?: any;
  referrer?: string;
  referrerPolicy?: HonokaReferrerPolicy;
  mode?: HonokaRequestMode;
  credentials?: HonokaRequestCredentials;
  cache?: HonokaRequestCache;
  redirect?: HonokaRequestRedirect;
  integrity?: string;
  window?: null;
}

export interface HonokaHeaders {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  entries(): IterableIterator<[string, string]>;
  forEach(
    callback: (value: string, index: number, headers: Headers) => void,
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

export interface HonokaDefaults {
  baseURL?: string;
  timeout?: number;
}

export interface HonokaStatic {
  defaults: HonokaDefaults;
  get(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  delete(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  head(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  options(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  post(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  put(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  patch(url: string, options?: HonokaRequestOptions): Promise<HonokaPromise>;
  response: HonokaResponse;
}

declare const honoka: HonokaStatic;

export default honoka;
