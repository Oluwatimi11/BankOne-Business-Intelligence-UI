export type ReadLoansOverviewResponse = {
  isSuccessful: boolean,
  data: {
    InstitutionCode: string,
    Duration: string,
    DisbursedLoansCount: number,
    ActiveLoans: number,
    ClosedLoans: number,
    DisbursedLoansAmount: number,
    Paid: number,
    Unpaid: number,
    PercentageChangeDisbursedCount: number,
    PercentageChangeDisbursedAmount: number,
    PercentageChangePaid: number,
    PercentageChangeUnpaid: number
  },
  message: string,
  code: number
}