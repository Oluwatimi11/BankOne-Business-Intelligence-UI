export type ReadFixedDepositByExpenseResponse = {
  isSuccessful: boolean,
  data: {
    InstitutionCode: string,
    Duration: string,
    TotalExpense: number,
    AvgExpense: number,
    TotalExpensePercentageChange: number,
    AverageExpensePercentageChange: number
  },
  message: string,
  code: number
}