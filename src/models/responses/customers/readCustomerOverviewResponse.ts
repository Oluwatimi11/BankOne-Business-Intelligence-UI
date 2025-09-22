export type ReadCustomerOverviewResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        TotalCustomers: number,
        ActiveCustomers: number,
        PercentageChange: number,
        Duration: ""
    },
    message: string,
    code: number
}


