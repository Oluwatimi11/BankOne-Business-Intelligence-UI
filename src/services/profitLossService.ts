
import { BaseService } from "@/configs/serviceConfig";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { ReadProfitLossByValueRequest } from "@/models/requests/profitLoss/readProfitLossByValueRequest";

export class ProfitLossService {
    private static controller = "profit-loss";
    static readProfitLossByTrend = (data: ReadProfitLossByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/trend`, { params: data })
    }
    static readProfitLossOverview = (data: ReadProfitLossByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/overview`, { params: data })
    }
}