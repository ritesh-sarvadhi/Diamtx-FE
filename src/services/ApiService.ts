"use client";

import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { buildApiUrl, API_ENDPOINTS } from "@/config/api";
import BaseService from "./BaseService";

const ApiService = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ) {
    // param.data.data = encrypt(param.data);
    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      BaseService(param)
        .then((response: AxiosResponse<Response>) => {
          resolve(response);
        })
        .catch((errors: AxiosError) => {
          reject(errors);
        });
    });
  },

  // Common login function using fetch
  async login<Response = unknown, Request = { name: string; password: string }>(
    data: Request
  ): Promise<Response> {
    const response = await fetch(buildApiUrl(API_ENDPOINTS.LOGIN), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: (data as any).name,
        password: (data as any).password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  },
};

export default ApiService;
