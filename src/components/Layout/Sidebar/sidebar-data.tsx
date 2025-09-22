import { SideBarIcons } from './style'
import {RiAppsLine, RiCoinLine, RiLuggageDepositLine} from 'react-icons/ri'
import {BsPeople, BsFillBagCheckFill, BsAppIndicator} from 'react-icons/bs'
import {FaMoneyBillWaveAlt} from 'react-icons/fa'
import {GiProfit} from 'react-icons/gi'

export const sideBarData = [
    {
        title: 'Dashboard',
        path: '/dashboard/home',
        icon: <SideBarIcons><RiAppsLine/></SideBarIcons>
    },
    {
        title: 'Customers',
        path: '/dashboard/customers',
        icon: <SideBarIcons size='1.9'><BsPeople/></SideBarIcons>
    },
    {
        title: 'Accounts',
        path: '/dashboard/accounts',
        icon: <SideBarIcons size='1.8'><BsFillBagCheckFill/></SideBarIcons>
    },
    {
        title: 'Fixed Deposit',
        path: '/dashboard/fixed-deposit',
        icon: <SideBarIcons size='1.9'><RiLuggageDepositLine/></SideBarIcons>
    },
    {
        title: 'Loans',
        path: '/dashboard/loans',
        icon: <SideBarIcons size='1.9'><FaMoneyBillWaveAlt/></SideBarIcons>
    },
    {
        title: 'Liquidity',
        path: '/dashboard/liquidity',
        icon: <SideBarIcons size='1.8'><RiCoinLine/></SideBarIcons>
    }, 
    // {
    //     title: 'Profit & Loss',
    //     path: '/dashboard/profit_loss',
    //     icon: <SideBarIcons size='1.8'><GiProfit/></SideBarIcons>
    // },
    // {
    //     title: 'Fin Indicators',
    //     path: '/dashboard/fin-indicators',
    //     icon: <SideBarIcons size='1.8'><BsAppIndicator/></SideBarIcons>
    // }
]