import { ReactElement } from "react"
import { RouteData } from "./../models"
import access from "./localAccess"
import LendingLimit from '@/assets/images/lending-limit.svg'
import AssetRatio from '@/assets/images/asset-ratio.svg'
import CostOfDeposit from '@/assets/images/cost-of-deposit.svg'
import CostOfRisk from '@/assets/images/cost-of-risk.svg'
import DepositRatio from '@/assets/images/deposit-ratio.svg'
import FixedDeposit from '@/assets/images/fixed-deposit.svg'
import InterestMargin from '@/assets/images/interest-margin.svg'
import LiquidityRatio from '@/assets/images/liquidity-ratio.svg'
import ReturnOnAsset from '@/assets/images/return-on-asset.svg'

const routeData = (path: string, name: string, component: ReactElement<any, any>): RouteData => {
    return {
        routeProps: {
            path,
            element: component
        },
        name
    }
}

const toTitleCase = (text: string) => {
    const splittedText = text.split(' ')
    const formattedText = []

    for (let item of splittedText) {
        item = item.toLowerCase()
        formattedText.push(item[0].toUpperCase() + item.substring(1, item.length))
    }

    return formattedText.join(' ')
}

const splitCamelCase = (text: string, isTitleCase?: boolean) => {
    let result = text.replace(/([a-z])([A-Z])/g, '$1 $2')
    result = isTitleCase ? result[0].toUpperCase() + result.substring(1) : result
    return result
}

// const getPageTitle = () => {
//     const route = window.location.href.split('/').pop()!
//     const pageTitle = route ? route.split('-').join(' ').split('_').join(' ') : 'Dashboard'
//     return toTitleCase(pageTitle)
// }

const getPageTitle = (pathname: string) => {
    const route = pathname.split('/').pop()!;
    const pageTitle = route ? route.replace(/[-_]/g, ' ') : 'Dashboard';
    return toTitleCase(pageTitle);
};

export const erroMessage = (text: any) => {
    const isOnline = access.getInternetStatus()
    return !isOnline ? 'No Internet Connection' : `Message: ${text || 'An error occured'}`
}

export const requestMessage = (resp: any, text = '') => {
    return resp.message || text || 'Something went wrong'
}

export const catchErrMsg = (err: any) => {
    let message = err?.response?.data?.message

    if (err.response?.status === 500) message = 'Something went wrong (Server)'
    if (err.response?.status === 401) {
        if (access.getLogoutHandler()) access.getLogoutHandler()()
    }

    return message
}

export const finIndicatorsData = [
    {
        title: 'Lending Limit',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: LendingLimit
    },
    {
        title: 'Placement & Fixed deposit with other banks',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: FixedDeposit
    },
    {
        title: 'Investments in Fixed assets',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: FixedDeposit
    },
    {
        title: 'Capital Adequacy Ratio (CAR)',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: AssetRatio
    },
    {
        title: 'Interest margin to gross income',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: InterestMargin
    },
    {
        title: 'Non-Interest expenses to gross income',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: AssetRatio
    },
    {
        title: 'Average cost of deposit',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: CostOfDeposit
    },
    {
        title: 'Cost of Risk',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: CostOfRisk
    },
    {
        title: 'Net Interest Margin',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: InterestMargin
    },
    {
        title: 'Loan to Deposit ratio',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: DepositRatio
    },
    {
        title: 'Return on Assets',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: ReturnOnAsset
    },
    {
        title: 'Liquidity Ratio',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: LiquidityRatio
    },
    {
        title: 'Risk Asset Ratio',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque',
        icon: AssetRatio
    }
]

export const loglite = (data: any, description?: string) => {
    if (description) console.log(`====== ${description} =======`)
    console.log({ data })
}

export const isSuccessCall = (status: number) => {
    if (status === 200 || status === 201) return true
    else return false
}

export const moneyFormat = (val: number | string, twoDecimalPlace?: boolean) => {
    const formatter = new Intl.NumberFormat('en-NG', {
        currency: 'NGN',
        minimumFractionDigits: twoDecimalPlace ? 2 : 0,
        maximumFractionDigits: 2
    })
    return formatter.format(Number(val))
}

const customerByProductColorMap: any = {
    SavingsAndCurrent: '#0D968F',
    FixedDeposit: '#1968FF',
    Loan: '#67DBE9',
    CommitmentSavings: '#A900F9',
    Mortgage: '#FF9E2C',
    others: '#67DBE9'
}

export default {
    routeData,
    toTitleCase,
    getPageTitle,
    requestMessage,
    catchErrMsg,
    erroMessage,
    splitCamelCase,
    finIndicatorsData,
    customerByProductColorMap
}