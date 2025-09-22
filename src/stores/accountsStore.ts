import { createAsyncThunk, createSlice, PayloadAction, isPending, isRejected } from "@reduxjs/toolkit";
import { AccountsService } from "@/services/accountsService";
import { ReadAccountsByValueRequest } from "@/models/requests/accounts/readAccountsByValueRequest";
import { ReadNewAccountResponse } from "@/models/responses/accounts/readNewAccountResponse";
import { ReadAccountsByProductResponse } from "@/models/responses/accounts/readAccountsByProductResponse";
import { ReadNewAccountActiveTrendResponse } from "@/models/responses/accounts/readNewAccountActiveTrendResponse";
import { ReadAccountsByCategoryResponse } from "@/models/responses/accounts/readAccountsByCategoryResponse";
import { ReadAccountOverviewResponse } from "@/models/responses/accounts/readAccountOverviewResponse";
import { ReadAccountBalanceByProductResponse } from "@/models/responses/accounts/readAccountBalanceByProductResponse";
import { itemColors } from "@/provider/config/constant";
import helpers from "@/utilities/helpers";

export type AccountsState = {
    loading: boolean;
    error: string | null;
    period: string;
    readNewAccountResponse: ReadNewAccountResponse;
    readAccountsByProductResponse: ReadAccountsByProductResponse;
    readNewAccountActiveTrendResponse: ReadNewAccountActiveTrendResponse;
    readAccountsByCategoryResponse: ReadAccountsByCategoryResponse;
    readAccountOverviewResponse: ReadAccountOverviewResponse;
    readAccountBalanceByProductResponse: ReadAccountBalanceByProductResponse;
};

const initialState: AccountsState = {
    loading: false,
    error: null,
    period: "90",
    readNewAccountResponse: {} as ReadNewAccountResponse,
    readAccountsByProductResponse: {} as ReadAccountsByProductResponse,
    readNewAccountActiveTrendResponse: {} as ReadNewAccountActiveTrendResponse,
    readAccountsByCategoryResponse: {} as ReadAccountsByCategoryResponse,
    readAccountOverviewResponse: {} as ReadAccountOverviewResponse,
    readAccountBalanceByProductResponse: {} as ReadAccountBalanceByProductResponse,
};

// ✅ Single thunk to fetch everything (parallel API calls)
const readAccounts = createAsyncThunk(
    "accounts/readAccounts",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const [
                newAccounts,
                balanceByProducts,
                activeTrend,
                byCategory,
                byProduct,
                overview,
            ] = await Promise.all([
                AccountsService.readNewAccounts(data, thunkAPI),
                AccountsService.readAccountsBalanceByProducts(data, thunkAPI),
                AccountsService.readAccountsByActiveTrend(data, thunkAPI),
                AccountsService.readAccountsByCategory(data, thunkAPI),
                AccountsService.readAccountsByProduct(data, thunkAPI),
                AccountsService.readAccountOverview(data, thunkAPI),
            ]);

            const breakdownWithColors = balanceByProducts.data.breakdown?.map(
                (item: any, index: number) => ({
                    ...item,
                    Color: itemColors[index],
                })
            );
            const balanceChartData = helpers.getChartInfo(breakdownWithColors, [
                "TotalBalance",
                "Products",
                "Color",
            ]);

            const itemsWithColors = byProduct.data.items?.map(
                (item: any, index: number) => ({
                    ...item,
                    Color: itemColors[index],
                })
            );
            const productChartData = helpers.getChartInfo(itemsWithColors, [
                "TotalAccounts",
                "Product",
                "Color",
            ]);

            const newAccountsChartData = helpers.getChartInfo(
                newAccounts.data.all_periods,
                ["NewAccounts", "Duration"]
            );            

            return {
                readNewAccountResponse: {
                    ...newAccounts.data,
                    NewAccounts: newAccountsChartData?.data?.NewAccounts || [],
                    Duration: newAccountsChartData?.data?.Duration || [],
                },
                readAccountBalanceByProductResponse: {
                    ...balanceByProducts.data,
                    breakdown: breakdownWithColors,
                    totalBalance: balanceChartData?.data?.TotalBalance || [],
                    products: balanceChartData?.data?.Products || [],
                    color: balanceChartData?.data?.Color || [],
                },
                readNewAccountActiveTrendResponse: activeTrend.data,
                readAccountsByCategoryResponse: byCategory.data,
                readAccountsByProductResponse: {
                    ...byProduct.data,
                    items: itemsWithColors,
                    TotalAccounts: productChartData?.data?.TotalAccounts || [],
                    Product: productChartData?.data?.Product || [],
                    Color: productChartData?.data?.Color || [],
                },
                readAccountOverviewResponse: overview.data,
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch accounts");
        }
    }
);

//Individaul API calls in case needed
const readNewAccounts = createAsyncThunk(
    "auth/action/readNewAccounts",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const response: ReadNewAccountResponse = (await AccountsService.readNewAccounts(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readAccountsBalanceByProducts = createAsyncThunk(
    "auth/action/readAccountsBalanceByProducts",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const response: ReadAccountBalanceByProductResponse = (await AccountsService.readAccountsBalanceByProducts(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readAccountsByActiveTrend = createAsyncThunk(
    "auth/action/readAccountsByActiveTrend",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const response: ReadNewAccountActiveTrendResponse = (await AccountsService.readAccountsByActiveTrend(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readAccountsByCategory = createAsyncThunk(
    "auth/action/readAccountsByCategory",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const response: ReadAccountsByCategoryResponse = (await AccountsService.readAccountsByCategory(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readAccountsByProduct = createAsyncThunk(
    "auth/action/readAccountsByProduct",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const response: ReadAccountsByProductResponse = (await AccountsService.readAccountsByProduct(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const readAccountOverview = createAsyncThunk(
    "auth/action/readAccountOverview",
    async (data: ReadAccountsByValueRequest, thunkAPI) => {
        try {
            const response: ReadAccountOverviewResponse = (await AccountsService.readAccountOverview(data, thunkAPI)).data;
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message);
        }
    }
);

const accountsSlice = createSlice({
    name: "accountsStore",
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
            // Bulk fetch case
            .addCase(readAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                Object.assign(state, action.payload);
            })

            // Match any pending thunk
            .addMatcher(isPending(readAccounts, readNewAccounts, readAccountsBalanceByProducts, readAccountsByActiveTrend, readAccountsByCategory, readAccountsByProduct, readAccountOverview), (state) => {
                state.loading = true;
                state.error = null;
            })

            // Match any rejected thunk
            .addMatcher(isRejected(readAccounts, readNewAccounts, readAccountsBalanceByProducts, readAccountsByActiveTrend, readAccountsByCategory, readAccountsByProduct, readAccountOverview), (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const accountsStore = {
    action: {
        ...accountsSlice.actions,
        readAccounts,
        readNewAccounts,
        readAccountsBalanceByProducts,
        readAccountsByActiveTrend,
        readAccountsByCategory,
        readAccountsByProduct,
        readAccountOverview
    },
    reducer: accountsSlice.reducer,
};