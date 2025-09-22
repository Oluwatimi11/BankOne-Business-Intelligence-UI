import { createAsyncThunk, createSlice, PayloadAction, isPending, isRejected } from "@reduxjs/toolkit";
import { CustomersService } from "@/services/customersService";
import { ReadCustomersByValueRequest } from "@/models/requests/customers/readCustomersByValueRequest";
import { ReadCustomerActiveStatusResponse } from "@/models/responses/customers/readCustomerActiveStatusResponse";
import { ReadCustomersByProductResponse } from "@/models/responses/customers/readCustomersByProductResponse";
import { ReadCustomerActiveTrendResponse } from "@/models/responses/customers/readCustomerActiveTrendResponse";
import { ReadCustomersByCategoryResponse } from "@/models/responses/customers/readCustomersByCategoryResponse";
import { ReadCustomerOverviewResponse } from "@/models/responses/customers/readCustomerOverviewResponse";
import { ReadCustomerByGenderMixResponse } from "@/models/responses/customers/readCustomerByGenderMixResponse";
import { ReadCustomerNewTrendResponse } from "@/models/responses/customers/readCustomerNewTrendResponse";
import { ReadCustomersByAgeRangeResponse } from "@/models/responses/customers/readCustomersByAgeRangeResponse";

export type CustomersState = {
    loading: boolean;
    error: string | null;
    period: string;
    readCustomerByGenderMixResponse: ReadCustomerByGenderMixResponse;
    readCustomersByProductResponse: ReadCustomersByProductResponse;
    readCustomerActiveTrendResponse: ReadCustomerActiveTrendResponse;
    readCustomersByCategoryResponse: ReadCustomersByCategoryResponse;
    readCustomerOverviewResponse: ReadCustomerOverviewResponse;
    readCustomerActiveStatusResponse: ReadCustomerActiveStatusResponse;
    readCustomerNewTrendResponse: ReadCustomerNewTrendResponse;
    readCustomersByAgeRangeResponse: ReadCustomersByAgeRangeResponse;
};

const initialState: CustomersState = {
    loading: false,
    error: null,
    period: "90",
    readCustomerByGenderMixResponse: {} as ReadCustomerByGenderMixResponse,
    readCustomersByProductResponse: {} as ReadCustomersByProductResponse,
    readCustomerActiveTrendResponse: {} as ReadCustomerActiveTrendResponse,
    readCustomersByCategoryResponse: {} as ReadCustomersByCategoryResponse,
    readCustomerOverviewResponse: {} as ReadCustomerOverviewResponse,
    readCustomerActiveStatusResponse: {} as ReadCustomerActiveStatusResponse,
    readCustomerNewTrendResponse: {} as ReadCustomerNewTrendResponse,
    readCustomersByAgeRangeResponse: {} as ReadCustomersByAgeRangeResponse,
};

// ✅ Bulk fetch (parallel API calls)
const readCustomers = createAsyncThunk(
    "customers/readCustomers",
    async (data: ReadCustomersByValueRequest, thunkAPI) => {
        try {
            const [
                byActiveStatus,
                activeTrend,
                newTrend,
                byAgeRange,
                byCategory,
                byProduct,
                byGenderMix,
                overview,
            ] = await Promise.all([
                CustomersService.readCustomerByActiveStatus(data, thunkAPI),
                CustomersService.readCustomerByActiveTrend(data, thunkAPI),
                CustomersService.readCustomerByNewTrend(data, thunkAPI),
                CustomersService.readCustomersByAgeRange(data, thunkAPI),
                CustomersService.readCustomersByCategory(data, thunkAPI),
                CustomersService.readCustomersByProduct(data, thunkAPI),
                CustomersService.readCustomerByGenderMix(data, thunkAPI),
                CustomersService.readCustomerOverview(data, thunkAPI),
            ]);

            return {
                readCustomerActiveStatusResponse: byActiveStatus.data,
                readCustomerActiveTrendResponse: activeTrend.data,
                readCustomerNewTrendResponse: newTrend.data,
                readCustomersByAgeRangeResponse: byAgeRange.data,
                readCustomersByCategoryResponse: byCategory.data,
                readCustomersByProductResponse: byProduct.data,
                readCustomerByGenderMixResponse: byGenderMix.data,
                readCustomerOverviewResponse: overview.data,
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch customers");
        }
    }
);

// ✅ Individual API calls (optional use)
const readCustomerByActiveStatus = createAsyncThunk("customers/readCustomerByActiveStatus", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomerActiveStatusResponse = (await CustomersService.readCustomerByActiveStatus(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomerByActiveTrend = createAsyncThunk("customers/readCustomerByActiveTrend", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomerActiveTrendResponse = (await CustomersService.readCustomerByActiveTrend(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomerByNewTrend = createAsyncThunk("customers/readCustomerByNewTrend", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomerNewTrendResponse = (await CustomersService.readCustomerByNewTrend(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomersByAgeRange = createAsyncThunk("customers/readCustomersByAgeRange", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomersByAgeRangeResponse = (await CustomersService.readCustomersByAgeRange(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomersByCategory = createAsyncThunk("customers/readCustomersByCategory", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomersByCategoryResponse = (await CustomersService.readCustomersByCategory(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomersByProduct = createAsyncThunk("customers/readCustomersByProduct", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomersByProductResponse = (await CustomersService.readCustomersByProduct(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomerByGenderMix = createAsyncThunk("customers/readCustomerByGenderMix", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomerByGenderMixResponse = (await CustomersService.readCustomerByGenderMix(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const readCustomerOverview = createAsyncThunk("customers/readCustomerOverview", async (data: ReadCustomersByValueRequest, thunkAPI) => {
    try {
        const response: ReadCustomerOverviewResponse = (await CustomersService.readCustomerOverview(data, thunkAPI)).data;
        return response;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e?.message);
    }
});

const customersSlice = createSlice({
    name: "customersStore",
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
            .addCase(readCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                Object.assign(state, action.payload);
            })
            // Any pending
            .addMatcher(isPending(
                readCustomers,
                readCustomerByActiveStatus,
                readCustomerByActiveTrend,
                readCustomerByNewTrend,
                readCustomersByAgeRange,
                readCustomersByCategory,
                readCustomersByProduct,
                readCustomerByGenderMix,
                readCustomerOverview
            ), (state) => {
                state.loading = true;
                state.error = null;
            })
            // Any rejected
            .addMatcher(isRejected(
                readCustomers,
                readCustomerByActiveStatus,
                readCustomerByActiveTrend,
                readCustomerByNewTrend,
                readCustomersByAgeRange,
                readCustomersByCategory,
                readCustomersByProduct,
                readCustomerByGenderMix,
                readCustomerOverview
            ), (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const customersStore = {
    action: {
        ...customersSlice.actions,
        readCustomers,
        readCustomerByActiveStatus,
        readCustomerByActiveTrend,
        readCustomerByNewTrend,
        readCustomersByAgeRange,
        readCustomersByCategory,
        readCustomersByProduct,
        readCustomerByGenderMix,
        readCustomerOverview,
    },
    reducer: customersSlice.reducer,
};
