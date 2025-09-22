export type ReadAccountsByProductResponse = {
  isSuccessful: boolean,
  data: {
    items: {
      InstitutionCode: string,
      Product: string,
      TotalAccounts: number,
      ProductPercentage: number,
      PercentageChange: number,
      Duration: string,
      Color: string
    }[],
      Product?: string[],
      TotalAccounts?: number[],
      Color: string[]
  },
  message: string,
  code: number
}
