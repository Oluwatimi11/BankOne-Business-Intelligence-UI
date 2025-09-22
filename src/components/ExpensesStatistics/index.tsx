import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow } from "@/style"
import { DoughnutChart, LineChart } from "@/components"
import { moneyFormat } from "@/utilities/utility"

export const ExpensesStatistics: React.FC<any> = ({ overview, trendInfo }) => {
    return (
        <CustomContainer $topMargin={'3'}>
            <CustomContainer className='horizontal-scroll-container' $topMargin={'3'}>
                <CustomContainer style={{ display: 'inline-block', overflow: 'auto' }}>
                    <FlexRow $gap={'2'} style={{ minWidth: 'fit-content' }} $alignItems={'stretch'}>
                        <CustomContainer
                            $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#FF9E2C'}
                            $topPadding={'2'} $bottomPadding={'1'} $padding={'1.5'}
                            $borderColor={'#C4C4C4'} $leftPadding={'2'}
                            className='loan-stats-card'
                        >
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'} $color={'#ffffff'}>Total Expenses</AppLabel>
                            <FlexRow $wrap={'wrap'} $topMargin={'1'}>
                                <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>N{moneyFormat(overview?.TotalExpense || 0)}</AppText>
                                <AppText >
                                    <AppSpan $color={'#ffffff'} $textSize={'1.2'}>
                                        {overview?.TotalExpenseChange >= 0 ?
                                            <BsArrowUp style={{ marginTop: '-0.5rem' }} />
                                            :
                                            <BsArrowDown style={{ marginTop: '-0.5rem' }} />
                                        }
                                    </AppSpan>
                                    <AppSpan $textSize={'1.6'} $fontWeight={'700'} $color={'#ffffff'}>
                                        {overview?.TotalExpenseChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </AppText>
                            </FlexRow>
                        </CustomContainer>

                        <CustomContainer
                            $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#ffffff'}
                            $topPadding={'2'} $padding={'1.5'}
                            $borderColor={'#C4C4C4'}
                            className='loan-stats-card'
                        >
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Interest Expenses</AppLabel>
                            <FlexRow $wrap={'wrap'} $topMargin={'1'}>
                                <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>N{moneyFormat(overview?.InterestExpense || 0)}</AppText>
                                <AppText >
                                    <AppSpan $textSize={'1.2'} $color={'#0D968F'}>
                                        {overview?.InterestExpenseChange >= 0 ?
                                            <BsArrowUp style={{ marginTop: '-0.5rem' }} />
                                            :
                                            <BsArrowDown style={{ marginTop: '-0.5rem' }} />
                                        }
                                    </AppSpan>
                                    <AppSpan
                                        $textSize={'1.6'} $fontWeight={'700'}
                                        $color={overview?.InterestExpenseChange >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {overview?.InterestExpenseChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </AppText>
                            </FlexRow>
                        </CustomContainer>
                        <CustomContainer
                            $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#ffffff'}
                            $topPadding={'2'} $padding={'1.5'}
                            $borderColor={'#C4C4C4'}
                            className='loan-stats-card'
                        >
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Operating Expenses</AppLabel>
                            <FlexRow $wrap={'wrap'} $topMargin={'1'}>
                                <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>N{moneyFormat(overview?.OperatingExpense || 0)}</AppText>
                                <AppText >
                                    <AppSpan $textSize={'1.2'} $color={'#0D968F'}>
                                        {overview?.OperatingExpenseChange >= 0 ?
                                            <BsArrowUp style={{ marginTop: '-0.5rem' }} />
                                            :
                                            <BsArrowDown style={{ marginTop: '-0.5rem' }} />
                                        }
                                    </AppSpan>
                                    <AppSpan
                                        $textSize={'1.6'} $fontWeight={'700'}
                                        $color={overview?.OperatingExpenseChange >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {overview?.OperatingExpenseChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </AppText>
                            </FlexRow>
                        </CustomContainer>
                        <CustomContainer
                            $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#ffffff'}
                            $topPadding={'2'} $padding={'1.5'}
                            $borderColor={'#C4C4C4'}
                            className='loan-stats-card'
                        >
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'}>Overhead Expenses</AppLabel>
                            <FlexRow $wrap={'wrap'} $topMargin={'1'}>
                                <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>N{moneyFormat(overview?.OverheadExpense || 0)}</AppText>
                                <AppText >
                                    <AppSpan $textSize={'1.2'} $color={'#0D968F'}>
                                        {overview?.OverheadExpenseChange >= 0 ?
                                            <BsArrowUp style={{ marginTop: '-0.5rem' }} />
                                            :
                                            <BsArrowDown style={{ marginTop: '-0.5rem' }} />
                                        }
                                    </AppSpan>
                                    <AppSpan
                                        $textSize={'1.6'} $fontWeight={'700'}
                                        $color={overview?.OverheadExpenseChange >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {overview?.OverheadExpenseChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </AppText>
                            </FlexRow>
                        </CustomContainer>
                    </FlexRow>
                </CustomContainer>
            </CustomContainer>


            <FlexRow
                $justifyContent={'space-between'} $gap={'2'} $topMargin={'2.5'} $alignItems={'stretch'}
                className='loan-chart-container'
            >
                <CustomContainer
                    $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                    $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                    $width={'49'} $sizeUnit={'%'}
                    className='income-doughnut-cards'
                >
                    <AppLabel $textSize={'1.6'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                        Interest paid out by Product
                    </AppLabel>
                    <FlexRow
                        $gap={'1.5'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                        className='number-of-account-by-product'
                    >
                        <CustomContainer $width={'14.7'} $height={'14.7'}>
                            <DoughnutChart
                                data={[14000000, 24000000, 4000000, 14000000, 4000000]}
                                labels={['Demand Deposit', 'Voluntary Savings Deposits', 'Other Deposits', 'Mandatory Deposits', 'Special Deposits']}
                                bgColors={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                borderColor={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                showLegend={false}
                                cutout={40}
                            />
                        </CustomContainer>
                        <FlexRow className='total-balance-chart-legend' $gap={'2'} $alignItems={'flex-start'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Demand Deposit</AppLabel>
                                        <AppText $color={'#5D5D5D'} $textSize={'1.2'} $topMargin={'-0.3'}>(Current product)</AppText>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'0.7'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (20%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2.5'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Voluntary Savings Deposits</AppLabel>
                                        <AppText $color={'#5D5D5D'} $textSize={'1.2'} $topMargin={'-0.3'}>(Savings product)</AppText>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'0.7'}>
                                            24,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#1968FF'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''} >
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Mandatory Deposits</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Special Deposits</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#67DBE9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Other Deposits</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }} >
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                        </FlexRow>
                    </FlexRow>
                </CustomContainer>

                <CustomContainer
                    $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                    $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                    $width={'49'} $sizeUnit={'%'}
                    className='income-doughnut-cards'
                >
                    <AppLabel $textSize={'1.6'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                        Expenses by Fixed Deposit
                    </AppLabel>
                    <FlexRow
                        $gap={'1.5'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                        className='number-of-account-by-product'
                    >
                        <CustomContainer $width={'14.7'} $height={'14.7'}>
                            <DoughnutChart
                                data={[14000000, 24000000, 4000000, 14000000, 4000000]}
                                labels={['Demand Deposit', 'Voluntary Savings Deposits', 'Other Deposits', 'Mandatory Deposits', 'Special Deposits']}
                                bgColors={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                borderColor={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                showLegend={false}
                                cutout={40}
                            />
                        </CustomContainer>
                        <FlexRow className='total-balance-chart-legend' $gap={'2'} $alignItems={'flex-start'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Performing Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (20%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Pass & Watch Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            24,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#67DBE9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Sub Standard Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#1968FF'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''} >
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Dountful Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Loss Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                        </FlexRow>
                    </FlexRow>
                </CustomContainer>

                <CustomContainer
                    $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                    $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                    $width={'49'} $sizeUnit={'%'}
                    className='income-doughnut-cards'
                >
                    <AppLabel $textSize={'1.6'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                        Expenses by Fixed Deposit
                    </AppLabel>
                    <FlexRow
                        $gap={'1.5'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                        className='number-of-account-by-product'
                    >
                        <CustomContainer $width={'14.7'} $height={'14.7'}>
                            <DoughnutChart
                                data={[14000000, 24000000, 4000000, 14000000, 4000000]}
                                labels={['Demand Deposit', 'Voluntary Savings Deposits', 'Other Deposits', 'Mandatory Deposits', 'Special Deposits']}
                                bgColors={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                borderColor={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                showLegend={false}
                                cutout={40}
                            />
                        </CustomContainer>
                        <FlexRow className='total-balance-chart-legend' $gap={'2'} $alignItems={'flex-start'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Performing Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (20%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Pass & Watch Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            24,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#67DBE9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Sub Standard Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#1968FF'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''} >
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Dountful Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Loss Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                        </FlexRow>
                    </FlexRow>
                </CustomContainer>

                <CustomContainer
                    $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                    $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                    $width={'49'} $sizeUnit={'%'}
                    className='income-doughnut-cards'
                >
                    <AppLabel $textSize={'1.6'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                        Expenses by Fixed Deposit
                    </AppLabel>
                    <FlexRow
                        $gap={'1.5'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                        className='number-of-account-by-product'
                    >
                        <CustomContainer $width={'14.7'} $height={'14.7'}>
                            <DoughnutChart
                                data={[14000000, 24000000, 4000000, 14000000, 4000000]}
                                labels={['Demand Deposit', 'Voluntary Savings Deposits', 'Other Deposits', 'Mandatory Deposits', 'Special Deposits']}
                                bgColors={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                borderColor={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                showLegend={false}
                                cutout={40}
                            />
                        </CustomContainer>
                        <FlexRow className='total-balance-chart-legend' $gap={'2'} $alignItems={'flex-start'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Performing Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (20%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Pass & Watch Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            24,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#67DBE9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Sub Standard Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#1968FF'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''} >
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Dountful Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Loss Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                        </FlexRow>
                    </FlexRow>
                </CustomContainer>

                <CustomContainer
                    $padding={'1.5'} $minHeight={'25.2'} $radius={'0.8'}
                    $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                    $width={'49'} $sizeUnit={'%'}
                    className='income-doughnut-cards'
                >
                    <AppLabel $textSize={'1.6'} $fontWeight={'600'} $rightMargin={'1'} $topMargin={'0.5'}>
                        Expenses by Fixed Deposit
                    </AppLabel>
                    <FlexRow
                        $gap={'1.5'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                        className='number-of-account-by-product'
                    >
                        <CustomContainer $width={'14.7'} $height={'14.7'}>
                            <DoughnutChart
                                data={[14000000, 24000000, 4000000, 14000000, 4000000]}
                                labels={['Demand Deposit', 'Voluntary Savings Deposits', 'Other Deposits', 'Mandatory Deposits', 'Special Deposits']}
                                bgColors={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                borderColor={['#FF9E2C', '#0D968F', '#67DBE9', '#1968FF', '#A900F9']}
                                showLegend={false}
                                cutout={40}
                            />
                        </CustomContainer>
                        <FlexRow className='total-balance-chart-legend' $gap={'2'} $alignItems={'flex-start'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Performing Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (20%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Pass & Watch Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            24,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#67DBE9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Sub Standard Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#1968FF'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''} >
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Dountful Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            14,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (40%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#0D968F'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $topMargin={'2'}>
                                    <CustomContainer
                                        $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                    />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel $textSize={'1.2'} $color={'#000000'}>Loss Loans</AppLabel>
                                        <AppText $textSize={'1.2'} $fontWeight={'700'} $topMargin={'-0.5'}>
                                            4,000,000
                                            <AppSpan $color={'#5D5D5D'} $textSize={'1.2'} $fontWeight={'700'}> (10%) </AppSpan>
                                            <AppSpan style={{ whiteSpace: 'nowrap' }}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                <AppSpan $textSize={'1.2'} $fontWeight={'600'} $color={'#F90000'}>3.4%</AppSpan>
                                            </AppSpan>
                                        </AppText>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                        </FlexRow>
                    </FlexRow>
                </CustomContainer>
            </FlexRow>

            <CustomContainer
                $minHeight={'25.1'} $radius={'0.8'} $topMargin={'2.5'}
                $topPadding={'2'} $borderColor={'#C4C4C4'} $bgColor={'#ffffff'}
            >
                <CustomContainer $leftPadding={'1.5'} $rightPadding={'1.5'}>
                    <AppLabel $textSize={'1.8'} $fontWeight={'600'}>Expenses Trend</AppLabel>
                    <AppText
                        $textSize={'2.5'} $fontWeight={'700'}
                        $color={(trendInfo?.selectedPeriod?.TotalExpenseChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                        $topMargin={'1.5'}
                    >
                        {(trendInfo?.selectedPeriod?.TotalExpenseChange ?? 0) >= 0 ? '+' : ''}{trendInfo?.selectedPeriod?.TotalExpenseChange?.toFixed(1) || 0}%
                    </AppText>
                </CustomContainer>

                <CustomContainer $rightPadding={'4'} $height={'14.5'}>
                    <LineChart
                        borderColor={trendInfo?.selectedPeriod?.TotalExpense >= 0 ? '#0D968F' : '#F90000'}
                        data={trendInfo?.TotalExpense || []}
                        label={trendInfo?.Duration || []}
                        initialColor={trendInfo?.selectedPeriod?.TotalExpense >= 0 ? 'rgba(78, 165, 54, 0.07)' : 'rgba(249, 0, 0, 0.05)'}
                        finalColor={trendInfo?.selectedPeriod?.TotalExpense >= 0 ? 'rgba(78, 165, 54, 0.48)' : 'rgba(249, 0, 0, 0.6)'}
                    />
                </CustomContainer>
            </CustomContainer>
        </CustomContainer>
    )
}