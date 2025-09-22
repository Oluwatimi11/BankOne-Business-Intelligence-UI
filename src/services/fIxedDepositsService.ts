
import { BaseService } from "@/configs/serviceConfig";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { ReadFixedDepositByValueRequest } from "@/models/requests/fixedDeposit/readFixedDepositByValueRequest";

export class FixedDepositsService {
    private static controller = "fixed-deposits";
    static readFixedDepositByActiveTrend = (data: ReadFixedDepositByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/active-trend`, { params: data })
    }
    static readFixedDepositByBalance = (data: ReadFixedDepositByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/balance`, { params: data })
    }
    static readFixedDepositByExpense = (data: ReadFixedDepositByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/expense`, { params: data })
    }
    static readFixedDepositOverview = (data: ReadFixedDepositByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/details`, { params: data })
    }
}