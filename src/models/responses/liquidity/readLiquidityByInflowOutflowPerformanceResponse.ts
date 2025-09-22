export type ReadLiquidityByInflowOutflowPerformanceResponse = {
  isSuccessful: boolean;
  data: {
    singleLiquidityByPerChannel: {
      InstitutionCode: string,
      Duration: string,
      TotalInflow: number,
      InflowPercentageChange: number,
      TotalOutflow: number,
      OutflowPercentageChange: number,
      NetFlow: number,
      NetPercentageChange: number,
      InflowOutflowRatio: string
      Amount: number,
      Volume: number,
      Channel: string,
      Direction: string,
      Color: string,
      PrevAmount: number,
      PrevVolume: number,
      AmountPercentChange: number,
      VolumePercentChange: number
    }[]
    Channel: string[],
    Amount: number[],
    Color: string[],
  };
  message: string;
  code: number;
};
