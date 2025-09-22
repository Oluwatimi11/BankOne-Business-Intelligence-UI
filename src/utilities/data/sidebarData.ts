
import { SidebarItemProps } from "@/components/ui/menu/Sidebar";
import { RouteConstant } from "@/utilities/constants/routeConstant";
import InfoCircledIcon from "@/components/icon/InfoCircledIcon";
import RouterUtil from "@/utilities/routerUtil";
import { BaseSidebarModuleConfig } from "qore-components";
import HomeIcon from "@/components/icon/HomeIcon";
import { RiAppsLine, RiLuggageDepositLine, RiCoinLine } from "react-icons/ri";
import { BsPeople, BsFillBagCheckFill, BsAppIndicator } from "react-icons/bs";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";

export const sidebarItemsConfig: BaseSidebarModuleConfig[] = [
    {
        moduleName: "Dashboard",
        moduleIcon: HomeIcon,
        moduleItems: [
            {
                title: "Home",
                tabRoute: RouteConstant.dashboard.homePage.path,
                icon: RiAppsLine
            },
            {
                title: "Accounts",
                tabRoute: RouteConstant.dashboard.allAccounts.path,
                icon: BsPeople
            },
            {
                title: "Customers",
                tabRoute: RouteConstant.dashboard.allCustomers.path,
                icon: BsFillBagCheckFill
            },
            {
                title: "Loans",
                tabRoute: RouteConstant.dashboard.allLoans.path,
                icon: FaMoneyBillWaveAlt
            },
            {
                title: "Fixed Deosits",
                tabRoute: RouteConstant.dashboard.allFixedDeposit.path,
                icon: RiLuggageDepositLine
            },
            {
                title: "Liquidity",
                tabRoute: RouteConstant.dashboard.allLiquidity.path,
                icon: RiCoinLine
            },
            {
                title: 'Profit & Loss',
                tabRoute: RouteConstant.dashboard.allProfitLoss.path,
                icon: GiProfit
            },
            {
                title: 'Fin Indicators',
                tabRoute: RouteConstant.dashboard.allFinancialIndicators.path,
                icon: BsAppIndicator
            }
        ]
    },
]

export const sidebarBottomMenuConfig: SidebarItemProps[] = [{
    moduleItems: [
        {
            title: "Logout",
            icon: InfoCircledIcon,
            onClick: () => {
                RouterUtil.navigate(RouteConstant.auth.login.path)
            }
        },
    ]
}]
