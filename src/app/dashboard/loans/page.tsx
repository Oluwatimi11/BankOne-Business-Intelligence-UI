"use client";
import './style.scss'
import { AppLabel, AppSpan, AppText, CustomContainer, FlexColumn, FlexRow, GridContainer, ScreenContainer } from '@/style'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { DoughnutChart, Dropdown, LineChart, LoanStatistics } from '../../../components'
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/configs/storeConfig'
import { RootState } from '@/stores'
import { loansStore } from '@/stores/loansStore'
import { readLoansByValueRequestInit } from '@/models/requests/loans/readLoansByValueRequest'

export default function Loans() {
    const dispatch: AppDispatch = useDispatch();

    const {
        period,
        readLoansOutstandingResponse: outstandingLoan,
        readLoansOverviewResponse: loanOverview,
        readLoansProductDistributionResponse: loanProductDistribution,
        readLoansRefinancedResponse: refinancedLoan,
        readLoansRestructuredResponse: restructuredLoan,
        readPerformingLoanTrendResponse: loanByPerformanceRatioTrend,
        readLoansCbnCategoryResponse: loanCategories,
    } = useSelector((state: RootState) => state.loans);

    const handleFetchData = async (duration: string) => {
        await dispatch(
            loansStore.action.readLoans({
                ...readLoansByValueRequestInit,
                period: duration,
            })
        ).unwrap();
    };

    const handleChangePeriod = (value: string) => {
        dispatch(loansStore.action.setPeriod(value));
        handleFetchData(value);
    };

    return (
        <>
            <ScreenContainer $padding={'2.5'}>
                <CustomContainer>
                    <CustomContainer $width={'38'} $bottomMargin={'2'} className='customer-screen-note'>
                        <AppSpan $textSize={'1.5'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo nullam vel tristique est diam nibh.
                        </AppSpan>
                    </CustomContainer>
                    <FlexRow $gap={'2'} $wrap={'wrap'} $justifyContent={'flex-end'}>
                        <AppText $textSize={'1.5'} $color={'#000000'}>Viewing {period} days Data Trend</AppText>
                        <Dropdown
                            trigger={
                                <GridContainer
                                    $width={'13.5'} $height={'3.3'} $borderColor={'#A0A4A8'}
                                    $radius={'0.5'} $bgColor={'#ffffff'}
                                    $leftPadding={'1'} $rightPadding={'1'}
                                >
                                    <FlexRow>
                                        <AppText $rightMargin={'1'} $cursor={'pointer'}>Last {period} Days</AppText>
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
                            leftMargin={20}
                            rightMargin={20}
                        />
                    </FlexRow>
                    <LoanStatistics
                        loanOverview={loanOverview}
                        performanceRatioTrend={loanByPerformanceRatioTrend}
                        outstandingLoan={outstandingLoan}
                    />
                    <FlexRow
                        $justifyContent={'space-between'} $gap={'2'} $topMargin={'2'} $alignItems={'stretch'}
                        className='loan-chart-container'
                    >
                        <CustomContainer
                            $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                            className='loan-chart-1'
                        >
                            <AppLabel $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                                Total Number of Loans by Product
                            </AppLabel>
                            <CustomContainer $rightPadding={'3'} $height={'19'}>
                                <LineChart
                                    borderColor="#0D968F"
                                    data={loanProductDistribution?.data?.items?.Count || []}
                                    label={loanProductDistribution?.data?.items?.ProductName || []}
                                    initialColor='rgba(78, 165, 54, 0)'
                                    finalColor='rgba(78, 165, 54, 0.52)'
                                />
                            </CustomContainer>
                        </CustomContainer>

                        <CustomContainer
                            $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                            className='loan-chart-1'
                        >
                            <AppLabel $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                                CBN Loan Category breakdown
                            </AppLabel>
                            <FlexRow
                                $gap={'1.5'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                                className='number-of-account-by-product'
                            >
                                <CustomContainer $width={'14.7'} $height={'14.7'}>
                                    <DoughnutChart
                                        data={loanCategories?.data?.items?.PercentageDistribution || []}
                                        labels={loanCategories?.data?.items?.LoanCategories || []}
                                        bgColors={loanCategories?.data?.items?.Color || []}
                                        borderColor={loanCategories?.data?.items?.Color || []}
                                        showLegend={false}
                                        cutout={40}
                                    />
                                </CustomContainer>
                                <FlexRow
                                    className='total-balance-chart-legend'
                                    $gap={'2'} $alignItems={'flex-start'}
                                    $wrap={'wrap'}
                                >
                                    {
                                        loanCategories?.data?.items?.LoanCategory?.map((item, index: number) => {
                                            return (
                                                <FlexRow
                                                    $width={'auto'} $sizeUnit={''}
                                                    $alignItems={'flex-start'}
                                                    key={index}
                                                >
                                                    <CustomContainer
                                                        $width={'0.8'} $height={'0.8'} $bgColor={item.Color}
                                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                                    />
                                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>{item.LoanCategory} Loans</AppLabel>
                                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                                            {item.LoanCount}
                                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> ({item.PercentageDistribution?.toFixed(1) || 0}%) </AppSpan>
                                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                                {item.PercentageChange! >= 0 ?
                                                                    <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                    : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                }
                                                                <AppSpan
                                                                    $textSize={'1.2'} $fontWeight={'600'}
                                                                    $color={item.PercentageChange! >= 0 ? '#0D968F' : '#F90000'}
                                                                >
                                                                    {item.PercentageChange! >= 0 ? '+' : ''}{item.PercentageChange?.toFixed(1) || 0}%
                                                                </AppSpan>
                                                            </AppSpan>
                                                        </AppText>
                                                    </CustomContainer>
                                                </FlexRow>
                                            )
                                        })
                                    }
                                </FlexRow>
                            </FlexRow>
                        </CustomContainer>

                        <FlexColumn
                            $minHeight={'25.2'}
                            $justifyContent={'space-between'}
                            className='loan-chart-2'
                        >
                            <CustomContainer
                                $padding={'1.5'} $radius={'0.8'} $minHeight={'45.2'} $mnHUnit={'%'}
                                $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                                className='account-stats-6-child'
                            >
                                <AppLabel $textSize={'1.5'} $fontWeight={'600'} $color={'#111111'} $rightMargin={'1'}>Restructed Loans</AppLabel>
                                <FlexRow>
                                    <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>{refinancedLoan?.data?.RefinancedLoans || 0}</AppSpan>
                                    <AppSpan
                                        $textSize={'1.5'} $fontWeight={'700'}
                                        $color={(refinancedLoan?.data?.RefinancedLoansPercentChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {(refinancedLoan?.data?.RefinancedLoansPercentChange ?? 0) >= 0 ? '+' : ''}{refinancedLoan?.data?.RefinancedLoansPercentChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer
                                $radius={'0.8'} $minHeight={'50.8'} $mnHUnit={'%'} $padding={'1.5'}
                                $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                                className='account-stats-6-child'
                            >
                                <AppLabel $textSize={'1.5'} $fontWeight={'600'} $color={'#111111'} $rightMargin={'1'}>Refinance Loans</AppLabel>
                                <FlexRow $topMargin={'-1'}>
                                    <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>{restructuredLoan?.data?.RestructuredLoans || 0}</AppSpan>
                                    <AppSpan
                                        $textSize={'1.5'} $fontWeight={'700'}
                                        $color={(restructuredLoan?.data?.RestructuredLoansPercentChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {((restructuredLoan?.data?.RestructuredLoansPercentChange ?? 0) >= 0 ? '+' : '')}
                                        {(restructuredLoan?.data?.RestructuredLoansPercentChange ?? 0).toFixed(1)}%
                                    </AppSpan>
                                </FlexRow>
                            </CustomContainer>
                        </FlexColumn>
                    </FlexRow>
                </CustomContainer>
            </ScreenContainer>
        </>
    )
}