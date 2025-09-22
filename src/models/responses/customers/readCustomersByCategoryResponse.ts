export type ReadCustomersByCategoryResponse = {
    isSuccessful: boolean,
    data: {
        items: {
            InstitutionCode: string,
            Category: string,
            TotalCustomers: number,
            CategoryPercentage: number,
            PercentageChange: number,
            Duration: string
        }[],
        pagination: {
            totalCount: number,
            pageNo: number,
            pageSize: number,
            totalPages: number
        },
    },
    message: string,
    code: number
}