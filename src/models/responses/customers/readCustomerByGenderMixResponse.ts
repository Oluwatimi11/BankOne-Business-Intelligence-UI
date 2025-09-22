export type ReadCustomerByGenderMixResponse = {
  isSuccessful: boolean,
  data: {
    items: {
      InstitutionCode: string,
      Gender: string,
      Count: number,
      Percentage: number,
    }[]
  },
  message: string,
  code: number
}
