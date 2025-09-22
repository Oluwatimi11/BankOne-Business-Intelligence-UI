import { createAsyncThunk, createSlice, PayloadAction, isPending, isRejected } from "@reduxjs/toolkit";
import { LiquidityService } from "@/services/liquidityService";
import { ReadLiquidityByValueRequest } from "@/models/requests/liquidity/readLiquidityByValueRequest";
import { ReadLiquidityByCashBalanceResponse } from "@/models/responses/liquidity/readLiquidityByCashBalanceResponse";
import { ReadLiquidityByChannelResponse } from "@/models/responses/liquidity/readLiquidityByChannelResponse";
import { ReadLiquidityByDepositBaseResponse } from "@/models/responses/liquidity/readLiquidityByDepositBaseResponse";
import { ReadLiquidityByInflowOutflowPerformanceResponse } from "@/models/responses/liquidity/readLiquidityByInflowOutflowPerformanceResponse";
import { ReadLiquidityOverviewResponse } from "@/models/responses/liquidity/readLiquidityOverviewResponse";
import { ReadByVolumeByChannelResponse } from "@/models/responses/liquidity/readLiquidityByVolumeByChannelResponse";
import helpers from "@/utilities/helpers";
import { itemColors } from "@/provider/config/constant";

type ChartData = {
    Channel: string[];
    Amount: number[];
    Color: string[];
    data: any[];
};

export type LiquidityState = {
    loading: boolean;
    error: string | null;
    period: string;
    readLiquidityByCashBalanceResponse: ReadLiquidityByCashBalanceResponse;
    readLiquidityByChannelResponse: ReadLiquidityByChannelResponse;
    readLiquidityByDepositBaseResponse: ReadLiquidityByDepositBaseResponse;
    readLiquidityByInflowOutflowPerformanceResponse: ReadLiquidityByInflowOutflowPerformanceResponse;
    readLiquidityOverviewResponse: ReadLiquidityOverviewResponse;
    readByVolumeByChannelResponse: ReadByVolumeByChannelResponse;
    liquidityByChannel: {
        inflow: ChartData;
        outflow: ChartData;
    };
};

// 🔹 Helper: preprocess list into chart-ready format
const preprocessLiquidityByChannel = (list: any[] = []): ChartData => {
    if (!list) return { Channel: [], Amount: [], Color: [], data: [] };

    const withColors = list.map((item, index) => ({
        ...item,
        Color: itemColors[index % itemColors.length],
    }));

    const chartInfo = helpers.getChartInfo(withColors, ["Channel", "Amount", "Color"]);
    chartInfo.data = withColors;

    return chartInfo as ChartData;
};

// 🔹 Helper: build inflow/outflow
const buildLiquidityByChannel = (response: any | undefined) => {
    const inflow = preprocessLiquidityByChannel(response?.inflow || []);
    const outflow = preprocessLiquidityByChannel(response?.outflow || []);
    return { inflow, outflow };
};

// 🔹 Initial state
const initialState: LiquidityState = {
    loading: false,
    error: null,
    period: "90",
    readLiquidityByCashBalanceResponse: {} as ReadLiquidityByCashBalanceResponse,
    readLiquidityByChannelResponse: {} as ReadLiquidityByChannelResponse,
    readLiquidityByDepositBaseResponse: {} as ReadLiquidityByDepositBaseResponse,
    readLiquidityByInflowOutflowPerformanceResponse: {} as ReadLiquidityByInflowOutflowPerformanceResponse,
    readLiquidityOverviewResponse: {} as ReadLiquidityOverviewResponse,
    readByVolumeByChannelResponse: {} as ReadByVolumeByChannelResponse,
    liquidityByChannel: {
        inflow: { Channel: [], Amount: [], Color: [], data: [] },
        outflow: { Channel: [], Amount: [], Color: [], data: [] },
    },
};

// ✅ Bulk fetch (parallel calls)
const readLiquidity = createAsyncThunk(
    "liquidity/readLiquidity",
    async (data: ReadLiquidityByValueRequest, thunkAPI) => {
        try {
            const [
                cashBalance,
                byChannel,
                depositBase,
                inflowOutflowPerformance,
                overview,
                byVolumeByChannel,
            ] = await Promise.all([
                LiquidityService.readLiquidityByCashBalance(data, thunkAPI),
                LiquidityService.readLiquidityByChannel(data, thunkAPI),
                LiquidityService.readLiquidityByDepositBase(data, thunkAPI),
                LiquidityService.readLiquidityByInflowOutflowPerformance(data, thunkAPI),
                LiquidityService.readLiquidityOverview(data, thunkAPI),
                LiquidityService.readLiquidityByVolumeByChannel(data, thunkAPI),
            ]);

            return {
                readLiquidityByCashBalanceResponse: cashBalance.data,
                readLiquidityByChannelResponse: byChannel.data,
                readLiquidityByDepositBaseResponse: depositBase.data,
                readLiquidityByInflowOutflowPerformanceResponse: inflowOutflowPerformance.data,
                readLiquidityOverviewResponse: overview.data,
                readByVolumeByChannelResponse: byVolumeByChannel.data,
                liquidityByChannel: buildLiquidityByChannel(byChannel.data),
            };
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e?.message || "Failed to fetch liquidity data");
        }
    }
);

const liquiditySlice = createSlice({
    name: "liquidityStore",
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
            .addCase(readLiquidity.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                Object.assign(state, action.payload);
            })
            // Pending
            .addMatcher(isPending(readLiquidity), (state) => {
                state.loading = true;
                state.error = null;
            })
            // Rejected
            .addMatcher(isRejected(readLiquidity), (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const liquidityStore = {
    action: {
        ...liquiditySlice.actions,
        readLiquidity,
    },
    reducer: liquiditySlice.reducer,
};
