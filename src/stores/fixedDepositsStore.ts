import { createAsyncThunk, createSlice, PayloadAction, isPending, isRejected } from "@reduxjs/toolkit";
import { FixedDepositsService } from "@/services/fIxedDepositsService";
import { ReadFixedDepositByValueRequest } from "@/models/requests/fixedDeposit/readFixedDepositByValueRequest";
import { ReadFixedDepositByBalanceResponse } from "@/models/responses/fixedDeposit/readFixedDepositByBalanceResponse";
import { ReadFixedDepositByActiveTrendResponse } from "@/models/responses/fixedDeposit/readFixedDepositByActiveTrendResponse";
import { ReadFixedDepositByExpenseResponse } from "@/models/responses/fixedDeposit/readFixedDepositByExpenseResponse";
import { ReadFixedDepositOverviewResponse } from "@/models/responses/fixedDeposit/readFixedDepositOverviewResponse";

export type FixedDepositsState = {
    loading: boolean;
    error: string | null;
    period: string;
    readFixedDepositsByBalanceResponse: ReadFixedDepositByBalanceResponse;
    readFixedDepositByActiveTrendResponse: ReadFixedDepositByActiveTrendResponse;
    readFixedDepositsByExpenseResponse: ReadFixedDepositByExpenseResponse;
    readFixedDepositOverviewResponse: ReadFixedDepositOverviewResponse;
};

const initialState: FixedDepositsState = {
    loading: false,
    error: null,
    period: "30",
    readFixedDepositsByBalanceResponse: {} as ReadFixedDepositByBalanceResponse,
    readFixedDepositByActiveTrendResponse: {} as ReadFixedDepositByActiveTrendResponse,
    readFixedDepositsByExpenseResponse: {} as ReadFixedDepositByExpenseResponse,
    readFixedDepositOverviewResponse: {} as ReadFixedDepositOverviewResponse,
};

// ✅ Single thunk to fetch all fixed deposits data in parallel
const readFixedDeposits = createAsyncThunk(
    "fixedDeposits/readFixedDeposits",
    async (data: ReadFixedDepositByValueRequest, thunkAPI) => {
        try {
            const [
                balance,
                activeTrend,
                expense,
                overview,
            ] = await Promise.all([
                FixedDepositsService.readFixedDepositByBalance(data, thunkAPI),
                FixedDepositsService.readFixedDepositByActiveTrend(data, thunkAPI),
                FixedDepositsService.readFixedDepositByExpense(data, thunkAPI),
                FixedDepositsService.readFixedDepositOverview(data, thunkAPI),
            ]);

            return {
                readFixedDepositsByBalanceResponse: balance.data,
                readFixedDepositByActiveTrendResponse: activeTrend.data,
                readFixedDepositsByExpenseResponse: expense.data,
                readFixedDepositOverviewResponse: overview.data,
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch fixed deposits");
        }
    }
);

// 🔹 Individual thunks (optional if you need them separately)
const readFixedDepositByBalance = createAsyncThunk(
    "fixedDeposits/readFixedDepositByBalance",
    async (data: ReadFixedDepositByValueRequest, thunkAPI) => {
        try {
            return (await FixedDepositsService.readFixedDepositByBalance(data, thunkAPI)).data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readFixedDepositByActiveTrend = createAsyncThunk(
    "fixedDeposits/readFixedDepositByActiveTrend",
    async (data: ReadFixedDepositByValueRequest, thunkAPI) => {
        try {
            return (await FixedDepositsService.readFixedDepositByActiveTrend(data, thunkAPI)).data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readFixedDepositByExpense = createAsyncThunk(
    "fixedDeposits/readFixedDepositByExpense",
    async (data: ReadFixedDepositByValueRequest, thunkAPI) => {
        try {
            return (await FixedDepositsService.readFixedDepositByExpense(data, thunkAPI)).data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readFixedDepositOverview = createAsyncThunk(
    "fixedDeposits/readFixedDepositOverview",
    async (data: ReadFixedDepositByValueRequest, thunkAPI) => {
        try {
            return (await FixedDepositsService.readFixedDepositOverview(data, thunkAPI)).data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const fixedDepositsSlice = createSlice({
    name: "fixedDepositsStore",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setPeriod: (state, action: PayloadAction<string>) => {
            state.period = action.payload;
        },
        reset: () => ({ ...initialState }),
    },
    extraReducers: (builder) => {
        builder
            // Bulk fetch
            .addCase(readFixedDeposits.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                Object.assign(state, action.payload);
            })

            // Match any pending thunk
            .addMatcher(
                isPending(
                    readFixedDeposits,
                    readFixedDepositByBalance,
                    readFixedDepositByActiveTrend,
                    readFixedDepositByExpense,
                    readFixedDepositOverview
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // Match any rejected thunk
            .addMatcher(
                isRejected(
                    readFixedDeposits,
                    readFixedDepositByBalance,
                    readFixedDepositByActiveTrend,
                    readFixedDepositByExpense,
                    readFixedDepositOverview
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || "Something went wrong";
                }
            );
    },
});

export const fixedDepositsStore = {
    action: {
        ...fixedDepositsSlice.actions,
        readFixedDeposits,
        readFixedDepositByBalance,
        readFixedDepositByActiveTrend,
        readFixedDepositByExpense,
        readFixedDepositOverview,
    },
    reducer: fixedDepositsSlice.reducer,
};
