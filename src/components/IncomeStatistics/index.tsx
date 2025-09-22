'use client';
import { useEffect } from "react"
import { explain } from "@/utilities/view"
import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow, GridContainer } from "@/style"
import ReactTooltip from 'react-tooltip'
import { DoughnutChart } from "@/components"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"
import { moneyFormat } from "@/utilities/utility"

export const IncomeStatistics: React.FC<any> = ({overview}) => {

    useEffect(() => {
        ReactTooltip.rebuild();
    }, [])

    return (
        <CustomContainer $topMargin={'3'}>
            <CustomContainer className='horizontal-scroll-container'>
                <CustomContainer style={{display: 'inline-block', overflow: 'auto'}}>
                    <FlexRow $gap={'2'} style={{minWidth: 'fit-content'}}>
                        <GridContainer 
                            $minHeight={'17.9'} $width={'28.6'} $radius={'0.8'} 
                            $bgColor={'#0D968F'} $padding={'2'} $borderColor={'#C4C4C4'}
                            className='active-deposit-card'
                        > 
                            <CustomContainer $topMargin={"-1"}>
                                <AppText $textSize={'1.6'} $fontWeight={'600'} $color={'#ffffff'} $rightMargin={'2'}>Total Income</AppText>
                                <AppLabel $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'} $topMargin={"1.5"}>N{moneyFormat(overview?.TotalIncome || 0)}</AppLabel>
                            </CustomContainer>
                        </GridContainer>
                        <GridContainer 
                            $minHeight={'17.9'} $width={'102.4'} $radius={'1'} $bgColor={'#ffffff'}
                            $padding={'2'} $borderColor={'#C4C4C4'}
                            className='total-deposit-card'
                        >
                            <FlexRow >
                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $bottomMargin={"1.5"}>
                                        <CustomContainer 
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <AppText $textSize={'1.6'} $rightMargin={'1.5'}>Income from Loan interest</AppText>
                                        {explain(`The data shows detailed analytics on all customers with the bank.`, true, '0.3')}
                                    </FlexRow>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $bottomMargin={"1"}>N{moneyFormat(overview?.LoanInterestIncome || 0)}</AppText>
                                </CustomContainer>

                                <CustomContainer 
                                    $width={'0'} $height={'11.4'} $leftMargin={'6'} $rightMargin={'4'}
                                    style={{border: '0.5px solid #BDBDBD'}} 
                                />

                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $bottomMargin={"1.5"}>
                                        <CustomContainer 
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <AppText $textSize={'1.6'} $rightMargin={'1.5'}>Income from Deposit fees</AppText>
                                        {explain(`The data shows detailed analytics on all customers with the bank.`, true, '0.3')}
                                    </FlexRow>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $bottomMargin={"1"}>N{moneyFormat(overview?.DepositFeeIncome || 0)}</AppText>
                                </CustomContainer>

                                <CustomContainer 
                                    $width={'0'} $height={'11.4'} $leftMargin={'6'} $rightMargin={'4'}
                                    style={{border: '0.5px solid #BDBDBD'}} 
                                />

                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'} $bottomMargin={"1.5"}>
                                        <CustomContainer 
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <AppText $textSize={'1.6'} $rightMargin={'1.5'}>Income from Loan fees</AppText>
                                        {explain(`The data shows detailed analytics on all customers with the bank.`, true, '0.3')}
                                    </FlexRow>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $bottomMargin={"1"}>N{moneyFormat(overview?.LoanFeeIncome || 0)}</AppText>
                                </CustomContainer>
                            </FlexRow>
                        </GridContainer>
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
                        Income by Loan Products
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}} >
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}}>
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}} >
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                        Income by CASA Products
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}}>
                                                <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}} >
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{marginTop: '-0.5rem'}} /></AppSpan>
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
                                            <AppSpan style={{whiteSpace: 'nowrap'}} >
                                                <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{marginTop: '-0.5rem'}} /></AppSpan>
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
        </CustomContainer>
    )
}