export type ReadProfitLossOverviewResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        TotalIncome: number,
        TotalIncomeChange: number,
        LoanInterestIncome: number,
        LoanInterestIncomeChange: number,
        DepositFeeIncome: number,
        DepositFeeIncomeChange: number,
        LoanFeeIncome: number,
        LoanFeeIncomeChange: number,
        TotalExpense: number,
        TotalExpenseChange: number,
        InterestExpense: number,
        InterestExpenseChange: number,
        OperatingExpense: number,
        OperatingExpenseChange: number,
        OverheadExpense: number,
        OverheadExpenseChange: number,
        Duration: string,
        GrossProfit: number,
        GrossProfitChange: number,
        NetProfit: number,
        NetProfitChange: number
    },
    message: string,
    code: number
}