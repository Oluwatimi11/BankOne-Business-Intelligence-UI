export type ReadPerformingLoanTrendResponse = {
  isSuccessful: boolean,
  data: {
    selected_period: {
      InstitutionCode: string,
      Duration: string,
      PerformingLoanPercentage: number,
      PercentageChange: number
    },
    all_periods: {
      InstitutionCode: string,
      Duration: string,
      PerformingLoanPercentage: number,
      PercentageChange: number
    }[];
    PerformingLoanPercentage: number[],
    Duration: string[]
  };
  message: string,
  code: number
}