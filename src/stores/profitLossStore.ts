import { createAsyncThunk, createSlice, PayloadAction, isPending, isRejected } from "@reduxjs/toolkit";
import { ProfitLossService } from "@/services/profitLossService";
import { ReadProfitLossByValueRequest } from "@/models/requests/profitLoss/readProfitLossByValueRequest";
import { ReadProfitLossByTrendResponse } from "@/models/responses/profitLoss/readProfitLossByTrendResponse";
import { ReadProfitLossOverviewResponse } from "@/models/responses/profitLoss/readProfitLossOverviewResponse";
import helpers from "@/utilities/helpers";

export type ProfitLossState = {
    loading: boolean;
    error: string | null;
    period: string;
    navPosition: number;
    readProfitLossByTrendResponse: ReadProfitLossByTrendResponse;
    readProfitLossOverviewResponse: ReadProfitLossOverviewResponse;
    formattedProfitLossTrend: any;
};

const initialState: ProfitLossState = {
    loading: false,
    error: null,
    period: "30",
    navPosition: 0,
    readProfitLossByTrendResponse: {} as ReadProfitLossByTrendResponse,
    readProfitLossOverviewResponse: {} as ReadProfitLossOverviewResponse,
    formattedProfitLossTrend: null,
};

const formatProfitLossTrend = (response: ReadProfitLossByTrendResponse | undefined) => {
    if (!response) return null;
    const formatted = helpers.getChartInfo(response.data.all_periods, [
        "GrossProfit",
        "NetProfit",
        "TotalExpense",
        "Duration",
    ]);
    formatted.selectedPeriod = response.data.selected_period;
    return formatted;
};


// ✅ Bulk fetch (parallel API calls)
const readProfitLoss = createAsyncThunk(
    "profitLoss/readProfitLoss",
    async (data: ReadProfitLossByValueRequest, thunkAPI) => {
        try {
            const [trend, overview] = await Promise.all([
                ProfitLossService.readProfitLossByTrend(data, thunkAPI),
                ProfitLossService.readProfitLossOverview(data, thunkAPI),
            ]);

            return {
                readProfitLossByTrendResponse: trend.data,
                readProfitLossOverviewResponse: overview.data,
                formattedProfitLossTrend: formatProfitLossTrend(trend.data)
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch profit/loss data");
        }
    }
);

// Individual API calls
const readProfitLossByTrend = createAsyncThunk(
    "profitLoss/readProfitLossByTrend",
    async (data: ReadProfitLossByValueRequest, thunkAPI) => {
        try {
            const response: ReadProfitLossByTrendResponse = (
                await ProfitLossService.readProfitLossByTrend(data, thunkAPI)
            ).data;

            return {
                raw: response,
                formatted: formatProfitLossTrend(response),
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);


const readProfitLossOverview = createAsyncThunk(
    "profitLoss/readProfitLossOverview",
    async (data: ReadProfitLossByValueRequest, thunkAPI) => {
        try {
            const response: ReadProfitLossOverviewResponse = (await ProfitLossService.readProfitLossOverview(data, thunkAPI)).data;
            return response;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const profitLossSlice = createSlice({
    name: "profitLossStore",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setPeriod: (state, action: PayloadAction<string>) => {
            state.period = action.payload;
        },
        setNavPosition: (state, action: PayloadAction<number>) => {
            state.navPosition = action.payload;
        },
        reset: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            // Bulk fetch success
            .addCase(readProfitLoss.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                Object.assign(state, action.payload);
                state.formattedProfitLossTrend = action.payload.formattedProfitLossTrend;
            })

            // Individual API successes
            .addCase(readProfitLossByTrend.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.readProfitLossByTrendResponse = action.payload.raw;
                state.formattedProfitLossTrend = action.payload.formatted;
            })

            .addCase(readProfitLossOverview.fulfilled, (state, action: PayloadAction<ReadProfitLossOverviewResponse>) => {
                state.loading = false;
                state.error = null;
                state.readProfitLossOverviewResponse = action.payload;
            })

            // Pending states
            .addMatcher(
                isPending(readProfitLoss, readProfitLossByTrend, readProfitLossOverview),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // Rejected states
            .addMatcher(
                isRejected(readProfitLoss, readProfitLossByTrend, readProfitLossOverview),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Something went wrong";
                }
            );
    },
});

export const profitLossStore = {
    action: {
        ...profitLossSlice.actions,
        readProfitLoss,
        readProfitLossByTrend,
        readProfitLossOverview,
    },
    reducer: profitLossSlice.reducer,
};
