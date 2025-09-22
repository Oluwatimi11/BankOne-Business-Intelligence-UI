export type ReadCustomersByProductResponse = {
  isSuccessful: boolean,
  data: {
    items: {
      InstitutionCode: string,
      Product: string,
      TotalCustomers: number,
      ProductPercentage: number,
      PercentageChange: number,
      Duration: string
    }[],
    pagination: {
      totalCount: number,
      pageNo: number,
      pageSize: number,
      totalPages: number
    },
  },
  message: string,
  code: number
}