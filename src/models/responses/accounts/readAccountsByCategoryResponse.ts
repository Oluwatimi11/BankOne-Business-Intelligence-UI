export type ReadAccountsByCategoryResponse = {
    isSuccessful: boolean,
    data: {
        items: {
            InstitutionCode: string,
            Category: string,
            TotalAccounts: number,
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
