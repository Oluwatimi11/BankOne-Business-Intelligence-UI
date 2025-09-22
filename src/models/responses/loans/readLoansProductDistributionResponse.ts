export type ReadLoansProductDistributionResponse = {
  isSuccessful: boolean,
  data: {
    items: {
      InstitutionCode: string,
      ProductID: string,
      ProductName: string[],
      Count: number[],
      PercentageDistribution: number,
      Duration: string,
      PercentageChange: number
    }
  },
  message: string,
  code: number
}