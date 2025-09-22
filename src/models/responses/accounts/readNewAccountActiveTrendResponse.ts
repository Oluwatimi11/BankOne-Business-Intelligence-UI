export type ReadNewAccountActiveTrendResponse = {
  isSuccessful: boolean;
  data: {
    selected_period: {        
      InstitutionCode: string,
        Duration: string,
        TotalAccounts: number,
        ActiveAccounts: number,
        InactiveAccounts: number,
        PercentageActive: number,
        PreviousPercentageActive: number,
      PercentageChange: number
      };
      ActiveAccounts?: number[],
    Duration?: string[],
    all_periods: Record<string, number>[];
  };
  message: string;
  code: number;
};
