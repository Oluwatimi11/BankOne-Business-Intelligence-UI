

export const RouteConstant = {
    auth: {
        login: {
            name: "",
            path: "/auth/login",
        },
        register: {
            name: "",
            path: "/auth/register",
        },
        getStarted: {
            path: '/auth/get-started',
            name: 'Get Started Screen',
            moduleName: 'authentication'
        },
    },
    dashboard: {
        getStarted: {
            name: "",
            path: "/",
        },


        homePage: {
            path: '/dashboard/home',
            name: 'Home',
            moduleName: 'Home'
        },
        allAccounts: {
            path: '/dashboard/accounts',
            name: 'Accounts',
            moduleName: 'Accounts'
        },
        allCustomers: {
            path: '/dashboard/customers',
            name: 'Customers',
            moduleName: 'Customers'
        },
        allFixedDeposit: {
            path: '/dashboard/fixed_deposit',
            name: 'Fixed Deposits',
            moduleName: 'Fixed Deposits'
        },
        allLiquidity: {
            path: '/dashboard/liquidity',
            name: 'Liquidity',
            moduleName: 'Liquidity'
        },
        allLoans: {
            path: '/dashboard/loans',
            name: 'Loans',
            moduleName: 'Loans'
        },
        allProfitLoss: {
            path: '/dashboard/profit_loss',
            name: 'Profit Loss',
            moduleName: 'Profit Loss'
        },
        allFinancialIndicators: {
            path: '/dashboard/financial_indicators',
            name: 'Financial Indicators',
            moduleName: 'Financial Indicators'
        }
    }
}
