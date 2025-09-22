export type ReadLoansCbnCategoryResponse = {
    isSuccessful: boolean,
    data: {
        items: {
            InstitutionCode: string,
            LoanCategories: string[],
            Duration: string,
            LoanCount: number,
            TotalAmount: number,
            PercentageDistribution: number[],
            PercentageChange: number,
            Color: string[],
            LoanCategory: {
                InstitutionCode: string,
                LoanCategory: string,
                Duration: string,
                LoanCount: number,
                PercentageDistribution: number,
                PercentageChange: number,
                Color: string
            }[]
        }
    },
    message: string,
    code: number
}