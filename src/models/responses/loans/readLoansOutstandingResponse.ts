export type ReadLoansOutstandingResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        Duration: string,
        TotalOutstandingAmount: number,
        DefaultAmount: number,
        DefaultCount: number,
        OutstandingPercentageChange: number
    },
    message: string,
    code: number
}