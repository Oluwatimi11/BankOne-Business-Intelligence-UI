export type ReadFixedDepositByBalanceResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        Duration: string,
        Category: string,
        TotalBalance: number,
        TotalBalancePercentageChange: number,
        AverageBalance: number,
        AverageBalancePercentageChange: number
    },
    message: string,
    code: number
}