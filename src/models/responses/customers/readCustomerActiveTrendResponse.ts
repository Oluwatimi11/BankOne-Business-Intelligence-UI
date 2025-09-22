export type ReadCustomerActiveTrendResponse = {
  isSuccessful: boolean;
  data: {
    selected_period: Record<string, number>;
    all_periods: Record<string, number>[];
  };
  message: string;
  code: number;
};
