export type ReadCustomersByAgeRangeResponse = {
  isSuccessful: boolean,
  data: {
    items: {
      InstitutionCode: string,
      count: number,
      Percentage: number,
      AgeRange: string[],
      Count: number[]
    }
  },
  message: string,
  code: number
}