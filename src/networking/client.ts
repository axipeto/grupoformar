import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { HttpClient, HttpResponse, RequestConfig } from './types/client.d';
import axios from 'axios';

export class AxiosHttpClient implements HttpClient {
  public instance: AxiosInstance;

  constructor(baseURL: string, options?: AxiosRequestConfig) {
    this.instance = axios.create({ baseURL, timeout: 10000, ...options });
    this.setupInterceptors();
  }

  public setupInterceptors() {
    this.instance.interceptors.response.use(
      response => response,
      error => this.handleError(error),
    );
  }

  private handleSuccess<T>(response: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  handleError(error: AxiosError) {
    if (!error.response) {
      console.error('Network Error', error);
      return Promise.reject(new Error('Network Error.'));
    }
    return Promise.reject(error);
  }

  async get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.get<T>(url, config);
    return this.handleSuccess(response);
  }

  async post<T, D = unknown>(url: string, data?: D, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.post<T>(url, data, config);
    return this.handleSuccess(response);
  }

  async put<T, D = unknown>(url: string, data?: D, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.put<T>(url, data, config);
    return this.handleSuccess(response);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    const response = await this.instance.delete<T>(url, config);
    return this.handleSuccess(response);
  }
}

export function createApiClient(baseURL: string, options?: AxiosRequestConfig): HttpClient {
  return new AxiosHttpClient(baseURL, options);
}
