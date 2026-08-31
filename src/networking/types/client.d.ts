export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface HttpError<T = unknown> {
  message: string;
  status?: number;
  data?: T;
}

export interface HttpClient {
  get: <T>(url: string, config?: RequestConfig) => Promise<HttpResponse<T>>;
  post: <T, D = unknown>(url: string, data?: D, config?: RequestConfig) => Promise<HttpResponse<T>>;
  put: <T, D = unknown>(url: string, data?: D, config?: RequestConfig) => Promise<HttpResponse<T>>;
  delete: <T>(url: string, config?: RequestConfig) => Promise<HttpResponse<T>>;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
}
