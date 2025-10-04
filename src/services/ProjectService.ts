// set your  enc-dec here

import { encrypt } from "@/utils/enc-dec";
import ApiService from "./ApiService";

export async function apiAdminLogin<T, U extends Record<string, unknown>>(
  data: U
) {
  return ApiService.fetchData<T>({
    url: `/auth/login`,
    method: "post",
    data: encrypt(data) as any,
  });
}
