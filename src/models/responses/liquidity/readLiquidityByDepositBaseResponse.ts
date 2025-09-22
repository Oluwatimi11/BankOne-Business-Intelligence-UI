export type ReadLiquidityByDepositBaseResponse = {
  isSuccessful: boolean,
  data: {
    InstitutionCode: string,
    TotalDepositBase: number,
    Duration: string,
    PercentageChange: number
  },
  message: string,
  code: number
}