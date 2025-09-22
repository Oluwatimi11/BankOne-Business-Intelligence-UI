
export type ReadAccountBalanceByProductResponse = {
    isSuccessful: boolean,
    data: {
        total: {
            InstitutionCode: string,
            TotalBalance: number
        };
        breakdown: {
            InstitutionCode: string;
            Products: string;
            TotalBalance: number;
            PercentageTotal: number;
            PercentageChangeTotalBalance: number;
            AverageBalance: number;
            PercentageChangeAverageBalance: number;
            Duration: string;
            Color: string;
        }[];
        totalBalance?: number[],
        products?: string[],
        color?: string[]
    },
    message: string,
    code: number
}
