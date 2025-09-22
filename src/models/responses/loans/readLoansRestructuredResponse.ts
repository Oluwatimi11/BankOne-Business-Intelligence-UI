export type ReadLoansRestructuredResponse = {
  isSuccessful: boolean;
  data: {
    InstitutionCode: string,
    Duration: string,
    RestructuredLoans: number,
    RestructuredLoansPercentChange: number
  };
  message: string;
  code: number;
};
