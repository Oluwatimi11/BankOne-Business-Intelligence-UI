
export type ReadProfitLossByValueRequest = {
    institutionCode: string;
    period: string
}

export const readProfitLossByValueRequestInit: ReadProfitLossByValueRequest = {
    institutionCode: "",
    period: ""
}
