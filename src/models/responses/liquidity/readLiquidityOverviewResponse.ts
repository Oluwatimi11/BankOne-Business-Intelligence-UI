export type ReadLiquidityOverviewResponse = {
    isSuccessful: boolean,
    data: {
        InstitutionCode: string,
        Duration: string,
        TotalInflow: number,
        InflowPercentageChange: number,
        TotalOutflow: number,
        OutflowPercentageChange: number,
        NetFlow: number,
        NetPercentageChange: number,
        LiquidityRatio: number,
        TotalCash: number,
        CashPercentageChange: number
    },
    message: string,
    code: number
}


