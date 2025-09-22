"use client";
import './style.scss'
import { useEffect, useState } from 'react'
import { moneyFormat } from '@/utilities/utility'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/stores'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {
    AppLabel, AppSpan, AppText,
    CustomContainer, FlexRow, GridContainer, ScreenContainer
} from '@/style'
import { Dropdown, LineChart, StatisticsCard, TransactionStatistics } from '@/components'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { itemColors } from '@/provider/config/constant'
import { accountsStore } from "@/stores/accountsStore";
import { customersStore } from "@/stores/customersStore";
import { profitLossStore } from "@/stores/profitLossStore";
import { fixedDepositsStore } from "@/stores/fixedDepositsStore";
import { liquidityStore } from "@/stores/liquidityStore";
import { loansStore } from "@/stores/loansStore";
import { AppDispatch } from '@/configs/storeConfig'
import { StoreConfig } from '@/models'

export default function Home() {
    const dispatch = useDispatch<AppDispatch>()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const { period: accountsPeriod, readAccountOverviewResponse: accountOverview, readNewAccountResponse: newAccounts } =
        useSelector((state: RootState) => state.accounts)

    const { period: customersPeriod, readCustomerOverviewResponse: customerOverview } =
        useSelector((state: RootState) => state.customers)

    const { period: profitLossPeriod, readProfitLossOverviewResponse: profitAndLossOverview } =
        useSelector((state: RootState) => state.profitLoss)

    const {
        period: liquidityPeriod,
        readLiquidityOverviewResponse: liquidityOverview,
        readLiquidityByChannelResponse: liquidityByChannel,
        readByVolumeByChannelResponse: transactionsByChannel,
        readLiquidityByDepositBaseResponse: depositBase
    } = useSelector((state: RootState) => state.liquidity)

    const { period: loansPeriod, readLoansOverviewResponse: loanOverview, readPerformingLoanTrendResponse: performingLoanTrend } =
        useSelector((state: RootState) => state.loans)

    const { period: fixedDepositsPeriod, readFixedDepositOverviewResponse: fixedDepositOverview, readFixedDepositsByBalanceResponse: fixedDepositBalance } =
        useSelector((state: RootState) => state.fixedDeposits)


    const storesConfig: StoreConfig[] = [
        { store: accountsStore, period: accountsPeriod, readFn: (args: { period: string }) => accountsStore.action.readAccounts({ period: args.period, institutionCode: "0" }) },
        { store: customersStore, period: customersPeriod, readFn: (args: { period: string }) => customersStore.action.readCustomers({ period: args.period, institutionCode: "0" }) },
        { store: profitLossStore, period: profitLossPeriod, readFn: (args: { period: string }) => profitLossStore.action.readProfitLoss({ period: args.period, institutionCode: "0" }) },
        { store: fixedDepositsStore, period: fixedDepositsPeriod, readFn: (args: { period: string }) => fixedDepositsStore.action.readFixedDeposits({ period: args.period, institutionCode: "0" }) },
        { store: liquidityStore, period: liquidityPeriod, readFn: (args: { period: string }) => liquidityStore.action.readLiquidity({ period: args.period, institutionCode: "0" }) },
        { store: loansStore, period: loansPeriod, readFn: (args: { period: string }) => loansStore.action.readLoans({ period: args.period, institutionCode: "0" }) },
    ]

    useEffect(() => {
        storesConfig.forEach(({ readFn, period }) => {
            dispatch(readFn({ period }))
        })
    }, storesConfig.map(cfg => cfg.period))

    const handleChangePeriod = (period: string) => {
        storesConfig.forEach(({ store, readFn }) => {
            dispatch(store.action.setPeriod(period))
            dispatch(readFn({ period }))
        })
    }


    return (
        <>
            <ScreenContainer $padding={'2.5'}>
                <CustomContainer>
                    <FlexRow $justifyContent={'space-between'} $gap={'3'} $alignItems={'flex-end'} $wrap={'wrap'}>
                        <CustomContainer
                            $width={'auto'} $sizeUnit={''}
                            style={{ visibility: 'hidden' }}
                        >
                            <AppLabel $textSize={'1.5'} $color={'#5D5D5D'}>Net Worth</AppLabel>
                            <FlexRow $width={'auto'} $sizeUnit={''} className='networth-container'>

                                {isPasswordVisible ?
                                    <FlexRow $wrap={'wrap'} $rightMargin={'2'}>
                                        <AppText $textSize={'3.5'} $fontWeight={'700'} $rightMargin={'1.5'}>N74,000,000,000</AppText>
                                        <AppText >
                                            <AppSpan $color={'#0D968F'} $textSize={'1.5'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                            <AppSpan $textSize={'2'} $fontWeight={'700'} $color={'#0D968F'}>7.2%</AppSpan>
                                        </AppText>
                                    </FlexRow>
                                    : <AppText $textSize={'3.9'} $fontWeight={'700'} $rightMargin={'2'} >***************</AppText>
                                }
                                <AppSpan
                                    $textSize={'2.5'} $topMargin={'-1.5'}
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                    {!isPasswordVisible ?
                                        <AiFillEye /> :
                                        <AiFillEyeInvisible style={{ marginTop: '1rem' }} />
                                    }
                                </AppSpan>
                            </FlexRow>
                        </CustomContainer>
                        <FlexRow $width={'auto'} $sizeUnit={''} $gap={'2'} $wrap={'wrap'}>
                            <AppText $textSize={'1.5'} $color={'#000000'}>Viewing {accountsPeriod} days Data Trend</AppText>
                            <Dropdown
                                trigger={
                                    <GridContainer
                                        $width={'13.5'} $height={'3.3'} $borderColor={'#A0A4A8'}
                                        $radius={'0.5'} $bgColor={'#ffffff'}
                                        $leftPadding={'1'} $rightPadding={'1'}
                                    >
                                        <FlexRow>
                                            <AppText $rightMargin={'1'} $cursor={'pointer'}>Last {accountsPeriod} Days</AppText>
                                            <AppSpan><HiOutlineChevronDown /></AppSpan>
                                        </FlexRow>
                                    </GridContainer>
                                }
                                options={[
                                    { value: '7', label: '7 days' },
                                    { value: '30', label: '30 days' },
                                    { value: '60', label: '60 days' },
                                    { value: '90', label: '90 days' }
                                ]}
                                onSelect={(value: string) => handleChangePeriod(value)}
                                $leftMargin={'20'}
                                $rightMargin={'20'}
                            />
                        </FlexRow>
                    </FlexRow>
                    <StatisticsCard
                        customerOverview={customerOverview}
                        loanOverview={loanOverview}
                        accountOverview={accountOverview}
                        fixedDepositOverview={fixedDepositOverview}
                        fixedDepositBalance={fixedDepositBalance}
                    />
                    <TransactionStatistics
                        inflow={liquidityByChannel?.data?.inflow}
                        outflow={liquidityByChannel?.data?.outflow}
                        liquidityOverview={liquidityOverview}
                    />
                    <FlexRow
                        $gap={'2'} $topMargin={'3'} $alignItems={'flex-start'}
                        className='dashboard-chart-stats-container'
                    >
                        <CustomContainer
                            $padding={'2'} $width={'45.5'} $minHeight={'31'} $radius={'1.2'}
                            $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                            $topPadding={'3'} $bottomMargin={'3'}
                            className='dashboard-chart-stats-1'
                        >
                            <AppLabel $textSize={'1.5'} $fontWeight={'700'}>Profit</AppLabel>
                            <CustomContainer $topMargin={'2'}>
                                <FlexRow>
                                    <CustomContainer
                                        $height={'0.8'} $width={'0.8'} $bgColor={'#60BB46'}
                                        $topMargin={'-0.5'} $rightMargin={'1'} $radius={'0.2'}
                                    />
                                    <AppLabel $textSize={'2'} $color={'#5D5D5D'}>Gross Profit</AppLabel>
                                </FlexRow>
                                <FlexRow $alignItems={'flex-end'} $leftMargin={'1.8'}>
                                    <AppText $textSize={'2'} $fontWeight={'700'} $rightMargin={'1.5'}>N{moneyFormat(profitAndLossOverview?.data?.GrossProfit || 0)}</AppText>
                                    <AppText >
                                        {(profitAndLossOverview?.data?.GrossProfitChange ?? 0) >= 0 ?
                                            <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                            : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                        }
                                        <AppSpan
                                            $textSize={'1.5'} $fontWeight={'700'}
                                            $color={(profitAndLossOverview?.data?.GrossProfitChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                        >
                                            {(profitAndLossOverview?.data?.GrossProfitChange ?? 0) >= 0 ? '+' : ''}{profitAndLossOverview?.data?.GrossProfitChange?.toFixed(1) || 0}%
                                        </AppSpan>
                                    </AppText>
                                </FlexRow>
                                <AppSpan $color={'#5D5D5D'} $leftMargin={'1.8'}>Compared to N50,100,000 Last Month</AppSpan>
                            </CustomContainer>
                            <CustomContainer $topMargin={'3'}>
                                <FlexRow>
                                    <CustomContainer
                                        $height={'0.8'} $width={'0.8'} $bgColor={'#FE9E2C'}
                                        $topMargin={'-0.5'} $rightMargin={'1'} $radius={'0.2'}
                                    />
                                    <AppLabel $textSize={'2'} $color={'#5D5D5D'}>Net Profit</AppLabel>
                                </FlexRow>
                                <FlexRow $alignItems={'flex-end'} $leftMargin={'1.8'}>
                                    <AppText $textSize={'2'} $fontWeight={'700'} $rightMargin={'1.5'}>N{moneyFormat(profitAndLossOverview?.data?.NetProfit || 0)}</AppText>
                                    <AppText >
                                        {(profitAndLossOverview?.data?.NetProfitChange ?? 0) >= 0 ?
                                            <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                            : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                        }
                                        <AppSpan
                                            $textSize={'1.5'} $fontWeight={'700'}
                                            $color={(profitAndLossOverview?.data?.NetProfitChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                        >
                                            {(profitAndLossOverview?.data?.NetProfitChange ?? 0) >= 0 ? '+' : ''}{profitAndLossOverview?.data?.NetProfitChange?.toFixed(1) || 0}%
                                        </AppSpan>
                                    </AppText>
                                </FlexRow>
                                <AppSpan $color={'#5D5D5D'} $leftMargin={'1.8'}>Compared to N50,100,000 Last Month</AppSpan>
                            </CustomContainer>
                        </CustomContainer>

                        <CustomContainer
                            $width={'35.3'} $minHeight={'31'} $radius={'1.2'} $bgColor={'#ffffff'}
                            $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'}
                            $topPadding={'3'} $bottomMargin={'3'} $padding={'2'}
                            className='dashboard-chart-stats-2'
                        >
                            <CustomContainer>
                                <AppLabel $textSize={'1.5'} $fontWeight={'500'}>Total Transactions</AppLabel>
                                <AppText $textSize={'2.5'} $fontWeight={'700'}>{moneyFormat(transactionsByChannel?.data?.total_volume || 0)}</AppText>
                            </CustomContainer>
                            <FlexRow $height={'1.5'} $alignItems={'flex-start'} $radius={'0.2'} $topMargin={'1'} $overflow={'hidden'}>
                                {
                                    transactionsByChannel?.data?.channels.map((item, index: number) => {
                                        return (
                                            <CustomContainer
                                                $width={`${item.Percentage}`}
                                                $sizeUnit={'%'}
                                                $height={'1.5'}
                                                key={index}
                                                $bgColor={itemColors[index]}
                                            />
                                        )
                                    })
                                }
                            </FlexRow>
                            <CustomContainer $topMargin={'1'}>
                                {
                                    transactionsByChannel?.data?.channels?.map((item, index: number) => {
                                        return (
                                            <FlexRow
                                                $justifyContent={'space-between'}
                                                $topMargin={'1'} key={index}
                                            >
                                                <FlexRow $width={'auto'} $sizeUnit={''}>
                                                    <CustomContainer
                                                        $height={'0.8'} $width={'0.8'} $bgColor={`${itemColors[index]}`}
                                                        $topMargin={'-0.5'} $rightMargin={'1'} $radius={'0.2'}
                                                    />
                                                    <AppLabel $color={'#5D5D5D'}>{item.Channel}</AppLabel>
                                                </FlexRow>
                                                <AppText>{item.Volume}</AppText>
                                            </FlexRow>
                                        )
                                    })
                                }
                            </CustomContainer>
                        </CustomContainer>

                        <CustomContainer
                            $width={'47.4'} className='dashboard-chart-stats-3'
                        >
                            <CustomContainer
                                $minHeight={'13.5'} $radius={'1.2'} $padding={'2'}
                                $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'}
                                $bgColor={'#ffffff'}
                            >
                                <AppLabel $textSize={'1.5'} $fontWeight={'500'}>Total Deposit Base</AppLabel>
                                <FlexRow $topMargin={'0.3'} $wrap={'wrap'}>
                                    <CustomContainer
                                        $height={'0.8'} $width={'0.8'} $bgColor={'#0D968F'}
                                        $rightMargin={'1'} $radius={'0.2'}
                                    />
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1.5'}>N{moneyFormat(depositBase?.data?.TotalDepositBase || 0)}</AppText>
                                    <AppText >
                                        {(depositBase?.data?.PercentageChange ?? 0) >= 0 ?
                                            <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                            : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                        }
                                        <AppSpan
                                            $textSize={'1.5'} $fontWeight={'700'}
                                            $color={(depositBase?.data?.PercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                        >
                                            {(depositBase?.data?.PercentageChange ?? 0) >= 0 ? '+' : ''}{(depositBase?.data?.PercentageChange || 0)?.toFixed(1)}%
                                        </AppSpan>
                                    </AppText>
                                </FlexRow>
                            </CustomContainer>
                            <FlexRow
                                $alignItems={'flex-start'} $justifyContent={'space-between'} $gap={'1.5'} $topMargin={'2'}
                                className='dashboard-chart-stats-3-child-flex'
                            >
                                <CustomContainer
                                    $height={'15.5'} $width={'49'} $sizeUnit={'%'} $radius={'1.2'}
                                    $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                                    className='dashboard-chart-stats-3-child'
                                >
                                    <CustomContainer $topMargin={'1.5'} $leftMargin={'2'} $rightPadding={'1'}>
                                        <AppLabel $textSize={'1.5'} $fontWeight={'500'}>Account growth Trend</AppLabel>
                                        <AppText $textSize={'2.5'} $fontWeight={'700'}>
                                            {moneyFormat(newAccounts?.data?.selected_period?.NewAccounts || 0)}
                                            <AppSpan
                                                $textSize={'1.5'} $fontWeight={'700'} $leftMargin={'1'}
                                                $color={(newAccounts?.data?.selected_period?.Percentage_change ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                            >
                                                {newAccounts?.data?.selected_period?.Percentage_change || 0}%
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                    <CustomContainer $height={'8'} className='deposit-chart'>
                                        <LineChart
                                            borderColor='#0D968F'
                                            data={newAccounts?.data?.NewAccounts || []}
                                            label={newAccounts?.data?.Duration || []}
                                            initialColor='rgba(78, 165, 54, 0)'
                                            finalColor='rgba(78, 165, 54, 0.52)'
                                        />
                                    </CustomContainer>
                                </CustomContainer>
                                <CustomContainer
                                    $height={'15.5'} $width={'49'} $sizeUnit={'%'} $radius={'1.2'}
                                    $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                                    className='dashboard-chart-stats-3-child'
                                >
                                    <CustomContainer $topMargin={'1.5'} $leftMargin={'2'} $rightPadding={'1'}>
                                        <AppLabel $textSize={'1.5'} $fontWeight={'500'}>Loan Portfolio Trend</AppLabel>
                                        <AppText $textSize={'2.5'} $fontWeight={'700'}>
                                            {performingLoanTrend?.data?.selected_period?.PerformingLoanPercentage || 0}%
                                            <AppSpan
                                                $textSize={'1.5'} $fontWeight={'700'} $leftMargin={'1'}
                                                $color={(performingLoanTrend?.data?.selected_period?.PercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                            >
                                                {(performingLoanTrend?.data?.selected_period?.PercentageChange ?? 0) >= 0 ? '+' : ''}{performingLoanTrend?.data?.selected_period?.PercentageChange?.toFixed(1) || 0}%
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                    <CustomContainer $height={'8'} className='deposit-chart'>
                                        <LineChart
                                            borderColor='#FF7A2F'
                                            data={performingLoanTrend?.data?.PerformingLoanPercentage || []}
                                            label={performingLoanTrend?.data?.Duration || []}
                                            initialColor='rgba(253, 124, 50, 0.02)'
                                            finalColor='rgba(253, 124, 50, 0.4)'
                                        />
                                    </CustomContainer>
                                </CustomContainer>
                            </FlexRow>
                        </CustomContainer>
                    </FlexRow>
                </CustomContainer>
            </ScreenContainer>
        </>
    );
}