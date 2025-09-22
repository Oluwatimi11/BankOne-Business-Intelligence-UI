export type ReadFixedDepositOverviewResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        Duration: string,
        TotalFixedDeposits: number,
        PercentageChange: number,
        MatureAccounts: number,
        ImmatureAccounts: number
    },
    message: string,
    code: number
}