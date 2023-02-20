import axios, { AxiosRequestConfig, Method } from 'axios';
import { Injectable } from '@nestjs/common';

const REQUEST_TIMEOUT_MS = 3 * 1000; // 3 seconds

interface ConfigInterface {
  params?: string | string[][];
  data?: string | FormData | any;
  headers?: {
    Authorization?: string;
    'Content-Type'?: string;
  };
}

interface ApiInterface {
  makeRequest(
    path: string,
    config: ConfigInterface,
    method: Method,
  ): Promise<any>;
}

@Injectable()
export class Api implements ApiInterface {
  baseUrlStr: string;

  constructor(baseUrl: string) {
    this.baseUrlStr = baseUrl;
  }

  async getBaseUrl(): Promise<string> {
    return this.baseUrlStr;
  }

  async makeRequest(
    path: string,
    config: ConfigInterface,
    method: Method,
  ): Promise<any> {
    const url = `${await this.getBaseUrl()}/${path}`;
    try {
      const response = await axios({
        url,
        method,
        timeout: REQUEST_TIMEOUT_MS,
        ...config,
      } as AxiosRequestConfig);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export type ApiEndPoint = {
  path: string;
  method: Method;
};
