
export type ReadCustomersByValueRequest = {
    institutionCode: string;
    period: string
}

export const readCustomersByValueRequestInit: ReadCustomersByValueRequest = {
    institutionCode: "",
    period: ""
}
