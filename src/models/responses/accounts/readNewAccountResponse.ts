export type ReadNewAccountResponse = {
  isSuccessful: boolean;
  data: {
    selected_period: {
        InstitutionName: string,
        InstitutionCode: number,
        Duration: string,
        NewAccounts: number,
        Percentage_change: number
    },
    NewAccounts?: number[],
    Duration?: string[],
    all_periods: Record<string, number>[];
  };
  message: string;
  code: number;
};