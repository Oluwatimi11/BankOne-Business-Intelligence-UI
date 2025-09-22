
export type ReadFixedDepositByActiveTrendResponse = {
    isSuccessful: boolean;
    data: {
        selected_period: {
            InstitutionCode: string,
            Duration: string,
            TotalAccounts: number,
            ActiveAccounts: number,
            PercentageActive: number,
            PercentageChange: number
        }
        all_periods: Record<string, number>[];
        ActiveAccounts?: Array<number>,
        Duration?: Array<string>
    };
    message: string;
    code: number;
}
