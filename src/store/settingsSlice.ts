import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import {
  apiFetchMasters,
  apiFetchSubMasters,
  apiUpdateMasterStatus,
  MasterRecord,
  UpdateMasterPayload,
} from "@/services/ProjectService";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface SettingsState {
  masters: MasterRecord[];
  mastersStatus: RequestStatus;
  mastersError: string | null;
  selectedMasterId: string | null;
  subMastersByMasterId: Record<string, MasterRecord[]>;
  subMastersStatus: Record<string, RequestStatus>;
  subMastersError: Record<string, string | null>;
}

const initialState: SettingsState = {
  masters: [],
  mastersStatus: "idle",
  mastersError: null,
  selectedMasterId: null,
  subMastersByMasterId: {},
  subMastersStatus: {},
  subMastersError: {},
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message) || fallback;
  }
  return fallback;
};

export const fetchMasters = createAsyncThunk<
  MasterRecord[],
  void,
  { rejectValue: string }
>("settings/fetchMasters", async (_, { rejectWithValue }) => {
  try {
    const response = await apiFetchMasters();
    return response.data.data || [];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Unable to load masters"));
  }
});

export const fetchSubMasters = createAsyncThunk<
  { masterId: string; subMasters: MasterRecord[] },
  string,
  { rejectValue: { masterId: string; message: string } }
>("settings/fetchSubMasters", async (masterId, { rejectWithValue }) => {
  try {
    const response = await apiFetchSubMasters(masterId);
    return {
      masterId,
      subMasters: response.data.data || [],
    };
  } catch (error) {
    return rejectWithValue({
      masterId,
      message: getErrorMessage(error, "Unable to load sub masters"),
    });
  }
});

export const updateMasterStatus = createAsyncThunk<
  MasterRecord,
  { masterId: string; payload: UpdateMasterPayload },
  { rejectValue: string }
>("settings/updateMasterStatus", async ({ masterId, payload }, { rejectWithValue }) => {
  try {
    const response = await apiUpdateMasterStatus(masterId, payload);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to update status"));
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    selectMaster(state, action: PayloadAction<string | null>) {
      state.selectedMasterId = action.payload;
    },
    clearMastersError(state) {
      state.mastersError = null;
      state.mastersStatus = "idle";
    },
    clearSubMastersError(state, action: PayloadAction<string>) {
      state.subMastersError[action.payload] = null;
      state.subMastersStatus[action.payload] = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMasters.pending, (state) => {
        state.mastersStatus = "loading";
        state.mastersError = null;
      })
      .addCase(fetchMasters.fulfilled, (state, action) => {
        state.mastersStatus = "succeeded";
        state.masters = action.payload;

        if (!state.selectedMasterId || !state.masters.some((m) => m.id === state.selectedMasterId)) {
          state.selectedMasterId = state.masters.length ? state.masters[0].id : null;
        }
      })
      .addCase(fetchMasters.rejected, (state, action) => {
        state.mastersStatus = "failed";
        state.mastersError = action.payload || "Unable to load masters";
      })
      .addCase(fetchSubMasters.pending, (state, action) => {
        const masterId = action.meta.arg;
        state.subMastersStatus[masterId] = "loading";
        state.subMastersError[masterId] = null;
      })
      .addCase(fetchSubMasters.fulfilled, (state, action) => {
        const { masterId, subMasters } = action.payload;
        state.subMastersStatus[masterId] = "succeeded";
        state.subMastersByMasterId[masterId] = subMasters;
      })
      .addCase(fetchSubMasters.rejected, (state, action) => {
        if (action.payload) {
          const { masterId, message } = action.payload;
          state.subMastersStatus[masterId] = "failed";
          state.subMastersError[masterId] = message;
        }
      })
      .addCase(updateMasterStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        const updateCollection = (collection?: MasterRecord[]) => {
          if (!collection) return;
          const index = collection.findIndex((item) => item.id === updated.id);
          if (index !== -1) {
            collection[index] = { ...collection[index], ...updated };
          }
        };

        updateCollection(state.masters);

        if (updated.parentId) {
          updateCollection(state.subMastersByMasterId[updated.parentId]);
        } else {
          Object.values(state.subMastersByMasterId).forEach(updateCollection);
        }
      });
  },
});

export const { selectMaster, clearMastersError, clearSubMastersError } = settingsSlice.actions;

export const selectSettingsState = (state: RootState) => state.settings;

export default settingsSlice.reducer;
