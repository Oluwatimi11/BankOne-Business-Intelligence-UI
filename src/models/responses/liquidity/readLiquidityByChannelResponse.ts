export type ReadLiquidityByChannelResponse = {
  isSuccessful: boolean,
  data: {
    inflow: {
      InstitutionCode: string,
      Amount: number,
      Volume: number,
      Channel: string,
      Direction: string,
      Duration: string,
      PrevAmount: number,
      PrevVolume: number,
      AmountPercentChange: number,
      VolumePercentChange: number
    }[],
    outflow: {
      InstitutionCode: string,
      Amount: number,
      Volume: number,
      Channel: string,
      Direction: string,
      Duration: string,
      PrevAmount: number,
      PrevVolume: number,
      AmountPercentChange: number,
      VolumePercentChange: number
    }[]
  },
  message: string,
  code: number
}
