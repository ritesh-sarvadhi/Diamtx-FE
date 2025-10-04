// set your  enc-dec here

import { API_ENDPOINTS } from "@/config/api";
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

export interface MasterRecord {
  rowNo: number;
  id: string;
  name: string;
  code: string;
  slug?: string | null;
  description?: string | null;
  likeKeyword?: string | null;
  image?: string | null;
  boxTypeId?: string | null;
  isDefault: boolean;
  isActive: boolean;
  sequence?: number | null;
  groupName?: string | null;
  parentId?: string | null;
  groupId?: string | null;
  days?: number | null;
  percentage?: number | null;
  labProcessId?: string | null;
  isWebDisplay?: boolean;
  parentCode?: string | null;
  mainGroupSequence?: number | null;
  mainGroup?: string | null;
  display_sequence?: number | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface MasterListResponse {
  success: boolean;
  message: string;
  data: MasterRecord[];
}

export interface MasterResponse {
  success: boolean;
  message: string;
  data: MasterRecord;
}

export function apiFetchMasters() {
  return ApiService.fetchData<MasterListResponse>({
    url: API_ENDPOINTS.MASTER_LIST,
    method: "get",
  });
}

export function apiFetchSubMasters(masterId: string) {
  return ApiService.fetchData<MasterListResponse>({
    url: `${API_ENDPOINTS.MASTER_LIST}/${masterId}`,
    method: "get",
  });
}

export interface UpdateMasterPayload {
  isActive?: boolean;
  isWebDisplay?: boolean;
  isDefault?: boolean;
}

export function apiUpdateMasterStatus(masterId: string, payload: UpdateMasterPayload) {
  return ApiService.fetchData<MasterResponse, UpdateMasterPayload>({
    url: `${API_ENDPOINTS.MASTER_LIST}/${masterId}`,
    method: "put",
    data: payload,
  });
}
