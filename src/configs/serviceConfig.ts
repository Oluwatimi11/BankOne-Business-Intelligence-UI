"use client";
import axios, { AxiosResponse } from "axios";

import { GetThunkAPI } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/configs/storeConfig";
import { RootState } from "@/stores";
import { appConfig } from "@/configs/appConfig";
import BaseToast from "@/components/ui/toast/BaseToast";
import { BaseUtil } from "@/utilities/baseUtil";
import { BaseErrorResponse, BaseResponse } from "@/utilities/types";
import { StringUtil } from "@/utilities/stringUtil";
import { ModalEnum } from "@/utilities/enums/modalEnum";
import { ModalUtil } from "qore-components";

let isSessionExpiredToastVisible = false; // Global flag to track session expiry toast
let isRequestTimedOutToastVisible = false; // Global flag to track session expiry toast
let isNetworkErrToastVisible = false; // Global flag to track session expiry toast

const ApiClient = (thunk: GetThunkAPI<ThunkApiConfig>) => {
    const allState = thunk.getState() as RootState
    // const token = (thunk.getState() as RootState).auth.token
    //axiosInstance
    const stage = allState?.base?.appStage || appConfig.stage;
    const axiosInstance = axios.create({
        baseURL: appConfig[`baseUrl${stage}`],
        // withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        timeout: 29000
    });

    //interceptors request. triggers just before request reaches the server.
    axiosInstance.interceptors.request.use(function (config) {
        // config.headers.Authorization = `${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    //interceptors response // triggers just before response from server gets to sender
    axiosInstance.interceptors.response.use((response: AxiosResponse<BaseResponse>) => {
        console.log(response.data)
        if (!BaseUtil.isResponseSuccessful(response.data)) {

            console.log("error in response: ", response.data)
            // Display error toast with custom options

            if (response.data?.message?.includes('JWT')) {
                if (!isSessionExpiredToastVisible) {
                    isSessionExpiredToastVisible = true; // Set flag to prevent duplicate toasts

                    BaseToast({
                        message: "Session expired, Kindly login",
                        type: "error",
                        options: {
                            onClose: () => {
                                isSessionExpiredToastVisible = false; // Reset flag when toast closes
                            },
                        },
                    });

                    // thunk.dispatch(auth.action.logout());
                }
            } else {
                BaseToast({
                    message: response.data?.message,
                    type: 'error',
                });
            }
        }
        return response
    },
        (error) => {
            console.log(error)
            if (error?.code == "ERR_NETWORK") {
                if (!isNetworkErrToastVisible) {
                    isNetworkErrToastVisible = true; // Set flag to prevent duplicate toasts

                    BaseToast({
                        message: "Network Error, please check your network connection",
                        type: 'error',
                        options: {
                            onClose: () => {
                                isNetworkErrToastVisible = false; // Reset flag when toast closes
                            },
                        },
                    });
                }

                return {
                    status: 503,
                    statusText: 'Service unavailable',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "NetworkError",
                        responseMessage: "Network Error, please check your connection"
                    }
                }
            }
            if (error?.code == "ECONNABORTED") {
                if (!isRequestTimedOutToastVisible) {
                    isRequestTimedOutToastVisible = true; // Set flag to prevent duplicate toasts

                    BaseToast({
                        message: "Request Timed out, try again later",
                        type: 'error',
                        options: {
                            onClose: () => {
                                isRequestTimedOutToastVisible = false; // Reset flag when toast closes
                            },
                        },
                    });
                }
                return {
                    status: 503,
                    statusText: 'Service unavailable',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "RequestAbortedError",
                        responseMessage: "Request Timed out, try again later"
                    }
                }
            }


            if (error?.status == 400) {
                const responseError = error.response.data as BaseErrorResponse;
                ModalUtil.getInstance().open(ModalEnum.FormErrorModal, {
                    errors: responseError?.errors
                })

            } else {
                BaseToast({
                    message: error?.message || "Something went wrong",
                    type: 'error',
                });
            }
            return {
                status: error?.status,
                statusText: StringUtil.convertToSentenceCase(error?.code),
                headers: {},
                config: {},
                request: {},
                data: {
                    responseCode: error?.code,
                    responseMessage: error?.message
                }
            }
            // return Promise.reject(error)
        })
    return axiosInstance
}

export const BaseService = {
    appClient: ApiClient,
}
