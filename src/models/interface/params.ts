import { ReactElement } from "react";

export interface RouteData {
    routeProps: RouteProps;
    name: string;
}

export interface RouteProps {
    path: string;
    element: ReactElement<any, any>
}

export interface Action<T> {
    type: string,
    payload: T
}

export interface KeyValuePayload {
    key: string,
    value: any
}

export interface AuthModel {
    username: string,
    password: string,
}

export interface ValidatorResponse {
    isValidated: boolean,
    message: string
}

export interface CustomersByActiveTrend {
    InstitutionCode: string,
    TotalCustomers: number,
    PercentageActive: number,
    PreviousPercentageActive: number,
    PercentageChange: number,
    ActiveCustomers?: Array<number>,
    Duration?: Array<string>
}

export interface CustomersByActiveStatus {
    InstitutionCode: string,
    ActiveCustomers: number,
    InactiveCustomers: number,
    DormantCustomers: number,
    TotalCustomers: number,
    PercentageChangeActive: number,
    PercentageChangeInactive: number
}

export type SingleCustomersByAgeRange = {
    InstitutionCode: string,
    count: number,
    Percentage: number,
    AgeRange: string
}

export interface CustomersByAgeRange {
    InstitutionCode: string,
    count: number,
    Percentage: number,
    Count?: Array<number>,
    AgeRange?: Array<string>
}

export interface CustomersByCategory {
    InstitutionCode: string,
    Category: string,
    TotalCustomers: number,
    CategoryPercentage: number,
    PercentageChange: number,
    Duration: string
}

export interface CustomersByProduct {
    InstitutionCode: string,
    Product: string,
    TotalCustomers: number,
    ProductPercentage: number,
    PercentageChange: number,
    Duration: string
}

export interface CustomersByGender {
    InstitutionCode: string,
    Gender: Array<string>,
    Count: Array<number>,
    Percentage: number
}

export interface CustomersByNewTrend {
    InstitutionCode: string,
    PercentageChange: number,
    NewCustomers?: Array<number>,
    Duration?: Array<string>,
    selectedPeriod?: any
}
export interface CustomerOverview {
    InstitutionCode: string,
    TotalCustomers: number,
    InactiveCustomers: number,
    ActiveCustomers: number
}

export type DropdownOption = {
    label?: string,
    value: string
}

export type SingleAccountBalanceByProduct = {
    InstitutionCode: number,
    Products: string,
    TotalBalance: number,
    PercentageTotal: number,
    AverageBalance: number,
    Color: string
}

export interface AccountBalanceByProduct {
    data: {
        breakdown: Array<SingleAccountBalanceByProduct>
        total: {
            InstitutionCode: string,
            TotalBalance: number
        }
    },
    TotalBalance?: Array<number>,
    Products?: Array<string>
    Color?: Array<string>
}

export interface AccountsByCategory {
    InstitutionCode: string,
    Category: string,
    TotalAccounts: number,
    CategoryPercentage: number,
    PercentageChange: number,
    Duration: string
}

export type SingleAccountByProduct = {
    InstitutionCode: number,
    Product: string,
    TotalAccounts: number,
    ProductPercentage: number,
    PercentageChange: number,
    Duration: string,
    Color: string
}

export interface AccountsByProduct {
    data: Array<SingleAccountByProduct>,
    Product: Array<string>,
    TotalAccounts: Array<number>,
    Color?: Array<string>
}

export interface AccountOverview {
    InstitutionCode: string,
    TotalAccounts: number,
    InactiveAccounts: number,
    ActiveAccounts: number
}

export interface AccountsByActiveTrend {
    selectedPeriod: {
        InstitutionCode: string,
        Duration: string,
        TotalAccounts: number,
        ActiveAccounts: number,
        InactiveAccounts: number,
        PercentageActive: number,
        PreviousPercentageActive: number,
        PercentageChange: number
    },
    ActiveAccounts?: Array<number>,
    Duration?: Array<string>
}

export interface NewAccounts {
    selectedPeriod: {
        InstitutionName: string,
        InstitutionCode: number,
        Duration: string,
        NewAccounts: number,
        Percentage_Change: number
    },
    NewAccounts?: Array<number>,
    Duration?: Array<string>
}

export interface FixedDepositsByActiveTrend {
    selectedPeriod: {
        InstitutionCode: string,
        Duration: string,
        TotalAccounts: number,
        ActiveAccounts: number,
        PercentageActive: number,
        PercentageChange: number
    },
    ActiveAccounts?: Array<number>,
    Duration?: Array<string>
}

export interface FixedDepositOverview {
    InstitutionCode: string,
    Duration: string,
    TotalFixedDeposits: number,
    PercentageChange: number,
    MatureAccounts: number,
    ImmatureAccounts: number
}

export interface FixedDepositBalance {
    InstitutionCode: string,
    Duration: string,
    TotalBalance: number,
    TotalBalancePercentageChange: number,
    AverageBalance: number,
    AverageBalancePercentageChange: number
}

export interface FixedDepositExpense {
    InstitutionCode: string,
    Duration: string,
    TotalExpense: number,
    AvgExpense: number,
    TotalExpensePercentageChange: number,
    AverageExpensePercentageChange: number
}

export interface LoanByperformanceRatioTrend {
    selectedPeriod: {
        "InstitutionCode": number,
        "Duration": string,
        "NPLPercentage": number,
        "PercentageChange": number
    },
    NPLPercentage?: Array<number>,
    Duration?: Array<string>
}

export interface LoanOverview {
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
}

export interface LoanPerformance {
    InstitutionCode: string,
    TotalNoOfLoans: number,
    TotalAmountDisbursed: number,
    OutstandingLoans: number,
    PassAndWatch: number,
    PercentagePassAndWatch: number,
    Substandard: number,
    PercentageSubstandard: number,
    Doubtful: number,
    PercentageDoubtful: number,
    Lost: number,
    PercentageLost: number,
    Performing: number,
    PercentagePerforming: number
}

export interface SingleLoanProductDistribution {
    InstitutionCode: string,
    ProductID: number,
    ProductName: string,
    Count: number,
    PercentageDistribution: number,
    Duration: string,
    PercentageChange: number
}

export interface LoanProductDistribution {
    InstitutionCode: string,
    ProductID: number,
    ProductName: Array<string>,
    Count: Array<number>,
    PercentageDistribution: number,
    Duration: string,
    PercentageChange: number
}

export interface RefinancedLoan {
    InstitutionCode: string,
    Duration: string,
    RefinancedLoans: number,
    RefinancedLoansPercentChange: number
}

export interface RestructuredLoan {
    InstitutionCode: string,
    RestructuredLoans: number,
    RestructuredLoansPercentChange: number
}

export interface OutstandingLoan {
    InstitutionCode: string,
    Duration: string,
    TotalOutstandingAmount: number,
    DefaultAmount: number,
    DefaultCount: number,
    OutstandingPercentageChange: number
}

export interface LoanCategory {
    InstitutionCode: string,
    LoanCategory: string,
    Duration: string,
    LoanCount: number,
    PercentageDistribution: number,
    PercentageChange: number,
    Color: string
}

export interface LoanCategories {
    LoanCategory: Array<string>,
    PercentageDistribution: Array<number>,
    Color: Array<string>,
    data: Array<LoanCategory>
}

export interface SingleLiquidityByPerChannel {
    InstitutionCode: string,
    Amount: number,
    Volume: number,
    Channel: string,
    Direction: string,
    Duration: string,
    Color: string,
    PrevAmount: number,
    PrevVolume: number,
    AmountPercentChange: number,
    VolumePercentChange: number
}

export interface LiquidityByPerChannel {
    Channel: Array<string>,
    Amount: Array<number>,
    Color: Array<string>,
    data: Array<SingleLiquidityByPerChannel>
}

export interface LiquidityOverview {
    InstitutionCode: string,
    Duration: string,
    TotalInflow: number,
    InflowPercentageChange: number,
    TotalOutflow: number,
    OutflowPercentageChange: number,
    NetFlow: number,
    NetPercentageChange: number,
    InflowOutflowRatio: string,
    TotalCash: number,
    CashPercentageChange: number
}

export interface ProfitAndLossOverview {
    InstitutionCode: string,
    Duration: string,
    TotalIncome: number,
    TotalIncomeChange: number,
    LoanInterestIncome: number,
    LoanInterestIncomeChange: number,
    DepositFeeIncome: number,
    DepositFeeIncomeChange: number,
    LoanFeeIncome: number,
    LoanFeeIncomeChange: number,
    TotalExpense: number,
    TotalExpenseChange: number,
    InterestExpense: number,
    InterestExpenseChange: number,
    OperatingExpense: number,
    OperatingExpenseChange: number,
    OverheadExpense: number,
    OverheadExpenseChange: number,
    GrossProfit: number,
    GrossProfitChange: number,
    NetProfit: number,
    NetProfitChange: number
}

export interface ProfitAndLossTrend {
    selectedPeriod: {
        InstitutionCode: string,
        Duration: string,
        GrossProfit: string,
        NetProfit: string,
        TotalExpense: string,
        GrossProfitChange: string,
        NetProfitChange: string,
        TotalExpenseChange: string
    },
    GrossProfit?: Array<number>,
    NetProfit?: Array<number>,
    TotalExpense?: Array<number>,
    Duration?: Array<string>
}

export interface SingleTransactionChannel {
    InstitutionCode: string,
    Volume: number,
    Percentage: number,
    Channel: string,
    Duration: string
}

export interface TransactionsByChannel {
    channels: Array<SingleTransactionChannel>,
    total_volume: number
}

export interface DepositBase {
    InstitutionCode: string,
    TotalDepositBase: number,
    Duration: string,
    PercentageChange: number
}

export interface PerformingLoanTrend {
    selectedPeriod: {
        InstitutionCode: string,
        Duration: string,
        PerformingLoanPercentage: number,
        PercentageChange: number
    },
    PerformingLoanPercentage: Array<number>,
    Duration: Array<string>
}

export type StoreConfig = {
    store: any;
    readFn: (args: { period: string }) => any;
    period: string;
};