
export type ReadAccountsByValueRequest = {
    institutionCode: string;
    period: string
}

export const readAccountsByValueRequestInit: ReadAccountsByValueRequest = {
    institutionCode: "",
    period: ""
}
