export type ReadLoansRefinancedResponse = {
  isSuccessful: boolean;
  data: {
    InstitutionCode: string;
    Duration: string;
    RefinancedLoans: number,
    RefinancedLoansPercentChange: number
  };
  message: string;
  code: number;
};