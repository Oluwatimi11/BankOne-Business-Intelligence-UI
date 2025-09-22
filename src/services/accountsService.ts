
import { BaseService } from "@/configs/serviceConfig";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { ReadAccountsByValueRequest } from "@/models/requests/accounts/readAccountsByValueRequest";

export class AccountsService {
    private static controller = "accounts";
    static readNewAccounts = (data: ReadAccountsByValueRequest, thunk: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(thunk).get(`/${this.controller}/new-accounts`)
    }
    static readAccountsBalanceByProducts = (data: ReadAccountsByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/account-balance-by-product`, { params: data })
    }
    static readAccountsByActiveTrend = (data: ReadAccountsByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/active-trend`, { params: data })
    }
    static readAccountsByCategory = (data: ReadAccountsByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/account-by-category`, { params: data })
    }
    static readAccountsByProduct = (data: ReadAccountsByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/account-by-product`, { params: data })
    }
    static readAccountOverview = (data: ReadAccountsByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/account-overview`, { params: data })
    }
}