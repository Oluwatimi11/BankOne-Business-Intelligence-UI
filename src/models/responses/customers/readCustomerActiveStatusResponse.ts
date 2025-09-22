export type ReadCustomerActiveStatusResponse = {
  isSuccessful: boolean;
  data: {
    InstitutionCode: string;
    Duration: string;
    ActiveCustomers: string;
    InactiveCustomers: string;
    PercentageChangeActive: number;
    PercentageChangeInactive: number;
  };
  message: string;
  code: number;
};