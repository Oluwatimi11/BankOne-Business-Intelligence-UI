export type ReadAccountOverviewResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        TotalAccounts: number,
        InactiveAccounts: number,
        ActiveAccounts: number
    },
    message: string,
    code: number
}
