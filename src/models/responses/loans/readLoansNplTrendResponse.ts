export type ReadLoansNplTrendResponse = {
  isSuccessful: boolean;
  data: {
    selected_period: {
      InstitutionCode: string,
      Duration: string,
      NplPercentage: number,
      PercentageChange: number
    },
    all_periods: {
      InstitutionCode: string,
      Duration: string,
      NplPercentage: number,
      PercentageChange: number
    }[];
  };
  message: string;
  code: number;
};