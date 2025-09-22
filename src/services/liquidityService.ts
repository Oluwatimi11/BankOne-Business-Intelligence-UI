
import { BaseService } from "@/configs/serviceConfig";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { ReadLiquidityByValueRequest } from "@/models/requests/liquidity/readLiquidityByValueRequest";

export class LiquidityService {
    private static controller = "liquidity";
    static readLiquidityByInflowOutflowPerformance = (data: ReadLiquidityByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/inflow-outflow-performance`, { params: data })
    }
    static readLiquidityByCashBalance = (data: ReadLiquidityByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/cash-balance`, { params: data })
    }
    static readLiquidityByChannel = (data: ReadLiquidityByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/channel`, { params: data })
    }
    static readLiquidityByVolumeByChannel = (data: ReadLiquidityByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/volume-by-channel`, { params: data })
    }
    static readLiquidityByDepositBase = (data: ReadLiquidityByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/deposit-base`, { params: data })
    }
    static readLiquidityOverview = (data: ReadLiquidityByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/overview`, { params: data })
    }
}