
import { BaseService } from "@/configs/serviceConfig";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { ReadLoansByValueRequest } from "@/models/requests/loans/readLoansByValueRequest";

export class LoansService {
    private static controller = "loans";
    static readLoansRefinanced = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/refinanced`, { params: data })
    }
    static readLoansRestructured = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/restructured`, { params: data })
    }
    static readLoansNplTrend = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/npl-trend`, { params: data })
    }
    static readPerformingLoanTrend = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/performing-loan-trend`, { params: data })
    }
    static readLoansOutstanding = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/outstanding`, { params: data })
    }
    static readLoansProductDistribution = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/product-distribution`, { params: data })
    }
    static readLoansCbnCategory = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/cbn-category`, { params: data })
    }
    static readLoansOverview = (data: ReadLoansByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/overview`, { params: data })
    }
}