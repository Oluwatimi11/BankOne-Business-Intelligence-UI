
import { BaseService } from "@/configs/serviceConfig";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { ReadCustomersByValueRequest } from "@/models/requests/customers/readCustomersByValueRequest";

export class CustomersService {
    private static controller = "customers";
    static readCustomerByActiveStatus = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/activity`, { params: data })
    }
    static readCustomerByActiveTrend = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/active-trend`, { params: data })
    }
    static readCustomerByNewTrend = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/new-trend`, { params: data })
    }
    static readCustomersByAgeRange = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/by-age-range`, { params: data })
    }
    static readCustomersByCategory = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/by-category`, { params: data })
    }
    static readCustomersByProduct = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/by-product`, { params: data })
    }
    static readCustomerByGenderMix = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/gender-mix`, { params: data })
    }
    static readCustomerOverview = (data: ReadCustomersByValueRequest, others: GetThunkAPI<ThunkApiConfig>) => {
        return BaseService.appClient(others).get(`/${this.controller}/overview`, { params: data })
    }
}