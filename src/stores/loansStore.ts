import { createAsyncThunk, createSlice, PayloadAction, isPending, isRejected } from "@reduxjs/toolkit";
import { LoansService } from "@/services/loansService";
import { ReadLoansByValueRequest } from "@/models/requests/loans/readLoansByValueRequest";
import { ReadLoansCbnCategoryResponse } from "@/models/responses/loans/readLoansCbnCategoryResponse";
import { ReadLoansNplTrendResponse } from "@/models/responses/loans/readLoansNplTrendResponse";
import { ReadLoansOutstandingResponse } from "@/models/responses/loans/readLoansOutstandingResponse";
import { ReadLoansOverviewResponse } from "@/models/responses/loans/readLoansOverviewResponse";
import { ReadLoansProductDistributionResponse } from "@/models/responses/loans/readLoansProductDistributionResponse";
import { ReadLoansRefinancedResponse } from "@/models/responses/loans/readLoansRefinancedResponse";
import { ReadLoansRestructuredResponse } from "@/models/responses/loans/readLoansRestructuredResponse";
import { ReadPerformingLoanTrendResponse } from "@/models/responses/loans/readPerformingLoanTrendResponse";
import { itemColors } from "@/provider/config/constant";
import helpers from "@/utilities/helpers";

export type LoansState = {
    loading: boolean;
    error: string | null;
    period: string;
    readLoansCbnCategoryResponse: ReadLoansCbnCategoryResponse;
    readLoansNplTrendResponse: ReadLoansNplTrendResponse;
    readLoansOutstandingResponse: ReadLoansOutstandingResponse;
    readLoansOverviewResponse: ReadLoansOverviewResponse;
    readLoansProductDistributionResponse: ReadLoansProductDistributionResponse;
    readLoansRefinancedResponse: ReadLoansRefinancedResponse;
    readLoansRestructuredResponse: ReadLoansRestructuredResponse;
    readPerformingLoanTrendResponse: ReadPerformingLoanTrendResponse;
};

const preprocessLoanCategories = (list: any[] = []) => {
    const withColors = list.map((item, index) => ({
        ...item,
        Color: itemColors[index % itemColors.length],
    }));

    const chartInfo = helpers.getChartInfo(withColors, [
        "LoanCategory",
        "PercentageDistribution",
        "Color",
    ]);
    chartInfo.data = withColors;

    return chartInfo;
};


const initialState: LoansState = {
    loading: false,
    error: null,
    period: "30",
    readLoansCbnCategoryResponse: {} as ReadLoansCbnCategoryResponse,
    readLoansNplTrendResponse: {} as ReadLoansNplTrendResponse,
    readLoansOutstandingResponse: {} as ReadLoansOutstandingResponse,
    readLoansOverviewResponse: {} as ReadLoansOverviewResponse,
    readLoansProductDistributionResponse: {} as ReadLoansProductDistributionResponse,
    readLoansRefinancedResponse: {} as ReadLoansRefinancedResponse,
    readLoansRestructuredResponse: {} as ReadLoansRestructuredResponse,
    readPerformingLoanTrendResponse: {} as ReadPerformingLoanTrendResponse,
};

// ✅ Bulk fetch thunk (parallel calls)
const readLoans = createAsyncThunk(
    "loans/readLoans",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const [
                cbnCategory,
                nplTrend,
                outstanding,
                overview,
                productDistribution,
                refinanced,
                restructured,
                performingTrend,
            ] = await Promise.all([
                LoansService.readLoansCbnCategory(data, thunkAPI),
                LoansService.readLoansNplTrend(data, thunkAPI),
                LoansService.readLoansOutstanding(data, thunkAPI),
                LoansService.readLoansOverview(data, thunkAPI),
                LoansService.readLoansProductDistribution(data, thunkAPI),
                LoansService.readLoansRefinanced(data, thunkAPI),
                LoansService.readLoansRestructured(data, thunkAPI),
                LoansService.readPerformingLoanTrend(data, thunkAPI),
            ]);

            const performingLoanTrend = helpers.getChartInfo(performingTrend.data.all_periods, ['PerformingLoanPercentage', 'Duration'])
            performingLoanTrend.selectedPeriod = performingTrend.data.selected_period

            return {
                readLoansCbnCategoryResponse: preprocessLoanCategories(cbnCategory.data),
                readLoansNplTrendResponse: nplTrend.data,
                readLoansOutstandingResponse: outstanding.data,
                readLoansOverviewResponse: overview.data,
                readLoansProductDistributionResponse: productDistribution.data,
                readLoansRefinancedResponse: refinanced.data,
                readLoansRestructuredResponse: restructured.data,
                readPerformingLoanTrendResponse: {
                    ...performingTrend.data,
                    SelectedPeriod: performingLoanTrend?.data?.NewAccounts || [],
                },
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch loans");
        }
    }
);

// ✅ Individual thunks (kept in case you want them separately)
const readLoansCbnCategory = createAsyncThunk("loans/readLoansCbnCategory", async (data: ReadLoansByValueRequest, thunkAPI) => {
    try {
        return (await LoansService.readLoansCbnCategory(data, thunkAPI)).data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});
const readLoansNplTrend = createAsyncThunk("loans/readLoansNplTrend", async (data: ReadLoansByValueRequest, thunkAPI) => {
    try {
        return (await LoansService.readLoansNplTrend(data, thunkAPI)).data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});
const readLoansOutstanding = createAsyncThunk(
    "auth/action/readLoansOutstanding",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const response: ReadLoansOutstandingResponse = (await LoansService.readLoansOutstanding(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);
const readLoansOverview = createAsyncThunk(
    "auth/action/readLoansOverview",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const response: ReadLoansOverviewResponse = (await LoansService.readLoansOverview(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);
const readLoansProductDistribution = createAsyncThunk(
    "auth/action/readLoansProductDistribution",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const response: ReadLoansProductDistributionResponse = (await LoansService.readLoansProductDistribution(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);
const readLoansRefinanced = createAsyncThunk(
    "auth/action/readLoansRefinanced",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const response: ReadLoansRefinancedResponse = (await LoansService.readLoansRefinanced(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);
const readLoansRestructured = createAsyncThunk(
    "auth/action/readLoansRestructured",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const response: ReadLoansRestructuredResponse = (await LoansService.readLoansRestructured(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);
const readPerformingLoanTrend = createAsyncThunk(
    "auth/action/readPerformingLoanTrend",
    async (data: ReadLoansByValueRequest, thunkAPI) => {
        try {
            const response: ReadPerformingLoanTrendResponse = (await LoansService.readPerformingLoanTrend(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);



const loansSlice = createSlice({
    name: "loansStore",
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
            // Bulk fetch success
            .addCase(readLoans.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                Object.assign(state, action.payload);
            })
            // Match pending for all thunks
            .addMatcher(isPending(readLoans, readLoansCbnCategory, readLoansNplTrend, readLoansOutstanding, readLoansOverview, readLoansProductDistribution, readLoansRefinanced, readLoansRestructured, readPerformingLoanTrend), (state) => {
                state.loading = true;
                state.error = null;
            })
            // Match rejected for all thunks
            .addMatcher(isRejected(readLoans, readLoansCbnCategory, readLoansNplTrend, readLoansOutstanding, readLoansOverview, readLoansProductDistribution, readLoansRefinanced, readLoansRestructured, readPerformingLoanTrend), (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const loansStore = {
    action: {
        ...loansSlice.actions,
        readLoans,
        readLoansCbnCategory,
        readLoansNplTrend,
        readLoansOutstanding,
        readLoansOverview,
        readLoansProductDistribution,
        readLoansRefinanced,
        readLoansRestructured,
        readPerformingLoanTrend
    },
    reducer: loansSlice.reducer,
};
