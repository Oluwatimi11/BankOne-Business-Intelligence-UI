import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow } from "@/style"
import { LineChart } from "@/components"
import { moneyFormat } from "@/utilities/utility"

export const LoanStatistics: React.FC<any> = ({ loanOverview, performanceRatioTrend, outstandingLoan }) => {
    return (
        <CustomContainer className='horizontal-scroll-container' $topMargin={'3'}>
            <CustomContainer style={{ display: 'inline-block', overflow: 'auto' }}>
                <FlexRow $gap={'2'} style={{ minWidth: 'fit-content' }} $alignItems={'stretch'}>
                    <CustomContainer
                        $width={'32.4'} $minHeight={'19.8'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $topPadding={'2'} $bottomPadding={'1'} $padding={'1.5'} $leftPadding={'2'}
                        $borderColor={'#C4C4C4'} style={{ borderLeft: '6px solid #111111' }}
                        className='loan-stats-card'
                    >
                        <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Total No. Of disbursed Loans</AppLabel>
                        <AppText $topMargin={'0.7'}>
                            <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>{moneyFormat(loanOverview?.DisbursedLoansCount || 0)}</AppSpan>
                            <AppSpan
                                $textSize={'1.6'} $fontWeight={'700'}
                                $color={loanOverview?.PercentageChangeDisbursedCount >= 0 ? '#0D968F' : '#F90000'}
                            >
                                {loanOverview?.PercentageChangeDisbursedCount >= 0 ? '+' : ''}{loanOverview?.PercentageChangeDisbursedCount?.toFixed(1) || 0}%
                            </AppSpan>
                        </AppText>

                        <FlexRow $topMargin={'2.5'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'6'}>
                                <AppLabel >Active Loans</AppLabel>
                                <AppText $fontWeight={'700'}>{moneyFormat(loanOverview?.ActiveLoans || 0)}</AppText>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <AppLabel>Closed Loans</AppLabel>
                                <AppText $fontWeight={'700'}>{moneyFormat(loanOverview?.ClosedLoans || 0)}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32.4'} $minHeight={'19.8'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $topPadding={'2'} $bottomPadding={'1'} $padding={'1.5'} $leftPadding={'2'}
                        $borderColor={'#C4C4C4'} style={{ borderLeft: '6px solid #FF9E2C' }}
                        className='loan-stats-card'
                    >
                        <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Total Amount Of disbursed Loans</AppLabel>
                        <AppText $topMargin={'0.7'}>
                            <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>N{moneyFormat(loanOverview?.DisbursedLoansAmount || 0)}</AppSpan>
                            <AppSpan
                                $textSize={'1.6'} $fontWeight={'700'}
                                $color={loanOverview?.PercentageChangeDisbursedAmount >= 0 ? '#0D968F' : '#F90000'}
                            >
                                {loanOverview?.PercentageChangeDisbursedAmount >= 0 ? '+' : ''}{loanOverview?.PercentageChangeDisbursedAmount?.toFixed(1) || 0}%
                            </AppSpan>
                        </AppText>

                        <FlexRow $topMargin={'2.5'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'6'}>
                                <AppLabel >Paid</AppLabel>
                                <AppText $fontWeight={'700'}>{moneyFormat(loanOverview?.Paid || 0)}</AppText>
                                <AppSpan
                                    $color={loanOverview?.PercentageChangePaid >= 0 ? '#0D968F' : '#F90000'}
                                    $fontWeight={'700'}
                                >
                                    {loanOverview?.PercentageChangePaid >= 0 ? '+' : ''}{loanOverview?.PercentageChangePaid?.toFixed(1) || 0}%
                                </AppSpan>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <AppLabel>Unpaid</AppLabel>
                                <AppText $fontWeight={'700'}>{moneyFormat(loanOverview?.Unpaid)}</AppText>
                                <AppSpan
                                    $color={loanOverview?.PercentageChangeUnpaid >= 0 ? '#0D968F' : '#F90000'}
                                    $fontWeight={'700'}
                                >
                                    {loanOverview?.PercentageChangeUnpaid >= 0 ? '+' : ''}{loanOverview?.PercentageChangeUnpaid?.toFixed(1) || 0}%
                                </AppSpan>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32.4'} $minHeight={'19.8'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $topPadding={'2'} $bottomPadding={'1'} $padding={'1.5'} $leftPadding={'2'}
                        $borderColor={'#C4C4C4'} style={{ borderLeft: '6px solid #A900F9' }}
                        className='loan-stats-card'
                    >
                        <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Total Oustanding Loans (Risk Assets)</AppLabel>
                        <AppText $topMargin={'0.7'}>
                            <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>N{moneyFormat(outstandingLoan?.TotalOutstandingAmount || 0)}</AppSpan>
                            <AppSpan
                                $textSize={'1.6'} $fontWeight={'700'}
                                $color={outstandingLoan?.OutstandingPercentageChange >= 0 ? '#0D968F' : '#F90000'}
                            >
                                {outstandingLoan?.OutstandingPercentageChange >= 0 ? '+' : ''}{outstandingLoan?.OutstandingPercentageChange?.toFixed(1) || 0}%
                            </AppSpan>
                        </AppText>

                        <FlexRow
                            $topMargin={'2.5'} $gap={'2'}
                            $justifyContent={'space-between'}
                        >
                            <CustomContainer
                                $width={'auto'} $sizeUnit={''}
                                className="fixed-flex-shape"
                            >
                                <AppLabel >Defaulting Amount</AppLabel>
                                <AppText $fontWeight={'700'}>N{moneyFormat(outstandingLoan?.DefaultAmount || 0)}</AppText>
                            </CustomContainer>
                            <CustomContainer
                                $width={'auto'} $sizeUnit={''}
                                className="fixed-flex-shape"
                            >
                                <AppLabel>Defaulting Loans</AppLabel>
                                <AppText $fontWeight={'700'}>{outstandingLoan?.DefaultCount}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32.4'} $minHeight={'19.8'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $topPadding={'2'}
                        $borderColor={'#C4C4C4'}
                        className='loan-stats-card'
                    >
                        <CustomContainer $leftPadding={'2'}>
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Non-Performing Loan ratio Trend</AppLabel>
                            <AppText $topMargin={'0.7'}>
                                <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>{performanceRatioTrend?.selectedPeriod?.NPLPercentage?.toFixed(1) || 0}%</AppSpan>
                                <AppSpan
                                    $textSize={'1.6'} $fontWeight={'700'}
                                    $color={performanceRatioTrend?.selectedPeriod?.PercentageChange >= 0 ? '#0D968F' : '#F90000'}
                                >
                                    {performanceRatioTrend?.selectedPeriod?.PercentageChange >= 0 ? '+' : ''}{performanceRatioTrend?.selectedPeriod?.PercentageChange?.toFixed(1) || 0}%
                                </AppSpan>
                            </AppText>
                        </CustomContainer>

                        <CustomContainer $rightPadding={'3'} $height={'10.5'}>
                            <LineChart
                                borderColor="#0D968F" //#F90000
                                data={performanceRatioTrend?.NPLPercentage || []} // [23, 35, 50, 38, 35, 37, 70, 62, 45, 52, 60, 75]  
                                label={performanceRatioTrend?.Duration || []}
                                initialColor='rgba(78, 165, 54, 0)' // rgba(249, 0, 0, 0.05) 
                                finalColor='rgba(78, 165, 54, 0.52)' // rgba(249, 0, 0, 0.6)
                            />
                        </CustomContainer>
                    </CustomContainer>
                </FlexRow>
            </CustomContainer>
        </CustomContainer>
    )
}