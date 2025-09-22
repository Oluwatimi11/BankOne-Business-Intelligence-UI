
export type ReadLoansByValueRequest = {
    institutionCode: string;
    period: string
}

export const readLoansByValueRequestInit: ReadLoansByValueRequest = {
    institutionCode: "",
    period: ""
}
