export type ReadCustomerNewTrendResponse = {
  isSuccessful: boolean;
  data: {
    selected_period: Record<string, number>;
    all_periods: Record<string, number>[];
    InstitutionCode: string,
    PercentageChange: number,
    NewCustomers?: number[],
    Duration?: string[],
  };
  message: string;
  code: number;
};



