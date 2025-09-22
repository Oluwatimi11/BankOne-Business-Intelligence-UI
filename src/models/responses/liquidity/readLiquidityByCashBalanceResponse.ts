export type ReadLiquidityByCashBalanceResponse = {
  isSuccessful: boolean;
  data: {
    InstitutionCode: string,
    Duration: string,
    TotalCash: number,
    PercentageChange: number
  };
  message: string;
  code: number;
};
