import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow, GridContainer } from "@/style"
import { LineChart } from "@/components"
import { moneyFormat } from "@/utilities/utility"

export const Profitability: React.FC<any> = ({overview, trendInfo}) => {
    return (
        <CustomContainer $topMargin={'3'}>
            <FlexRow 
                $gap={'2'} $justifyContent={'space-between'}
                className="profitability-chart-container"
            >
                <CustomContainer
                    $width={'49'} $sizeUnit={'%'} $minHeight={'23.1'} $radius={'0.8'} 
                    $topPadding={'2'} $borderColor={'#C4C4C4'} $bgColor={'#ffffff'}
                    className='profitability-chart'
                >
                    <CustomContainer $leftPadding={'1.5'} $rightPadding={'1.5'}>
                        <AppLabel $textSize={'1.8'} $fontWeight={'600'}>Gross Profit Trend</AppLabel>
                        <AppText 
                            $textSize={'2.5'} $fontWeight={'700'} 
                            $color={(trendInfo?.selectedPeriod?.GrossProfitChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                            $topMargin={'1.5'}
                        >
                            {(trendInfo?.selectedPeriod?.GrossProfitChange ?? 0) >= 0 ? '+' : ''}{trendInfo?.selectedPeriod?.GrossProfitChange?.toFixed(1) || 0}%
                        </AppText>
                    </CustomContainer>

                    <CustomContainer $rightPadding={'4'} $height={'12.5'}>
                        <LineChart 
                            borderColor={trendInfo?.selectedPeriod?.GrossProfit >= 0 ? "#0D968F" : '#F90000'}
                            data={trendInfo?.GrossProfit || []}  
                            label={trendInfo?.Duration || []}
                            initialColor={trendInfo?.selectedPeriod?.GrossProfit >= 0 ? 'rgba(78, 165, 54, 0.07)' : 'rgba(249, 0, 0, 0.05)'}
                            finalColor={trendInfo?.selectedPeriod?.GrossProfit >= 0 ? 'rgba(78, 165, 54, 0.48)' : 'rgba(249, 0, 0, 0.6)'}
                        />
                    </CustomContainer>
                </CustomContainer>
                <CustomContainer
                    $width={'49'} $sizeUnit={'%'} $minHeight={'23.1'} $radius={'0.8'} 
                    $topPadding={'2'} $borderColor={'#C4C4C4'} $bgColor={'#ffffff'}
                    className='profitability-chart'
                >
                    <CustomContainer $leftPadding={'1.5'} $rightPadding={'1.5'}>
                        <AppLabel $textSize={'1.8'} $fontWeight={'600'}>Net Profit Trend</AppLabel>
                        <AppText 
                            $textSize={'2.5'} $fontWeight={'700'} 
                            $color={(trendInfo?.selectedPeriod?.NetProfitChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                            $topMargin={'1.5'}
                        >
                            {(trendInfo?.selectedPeriod?.NetProfitChange ?? 0) >= 0 ? '+' : ''}{trendInfo?.selectedPeriod?.NetProfitChange?.toFixed(1) || 0}%
                        </AppText>
                    </CustomContainer>

                    <CustomContainer $rightPadding={'4'} $height={'12.5'}>
                        <LineChart 
                            borderColor={trendInfo?.selectedPeriod?.NetProfit >= 0 ? "#0D968F" : '#F90000'}
                            data={trendInfo?.NetProfit || []}  
                            label={trendInfo?.Duration || []}
                            initialColor={trendInfo?.selectedPeriod?.NetProfit >= 0 ? 'rgba(78, 165, 54, 0.07)' : 'rgba(249, 0, 0, 0.05)'}
                            finalColor={trendInfo?.selectedPeriod?.NetProfit >= 0 ? 'rgba(78, 165, 54, 0.48)' : 'rgba(249, 0, 0, 0.6)'}
                        />
                    </CustomContainer>
                </CustomContainer>
            </FlexRow>

            <CustomContainer className='horizontal-scroll-container' $topMargin={'3'}>
                <CustomContainer style={{display: 'inline-block', overflow: 'auto'}}>
                    <FlexRow $gap={'2'} style={{minWidth: 'fit-content'}}>
                        <GridContainer 
                            $minHeight={'21.7'} $width={'28.6'} $radius={'0.8'} 
                            $bgColor={'#111111'} $padding={'2'}
                            className='active-deposit-card'
                        > 
                            <CustomContainer $topMargin={'-2.5'}>
                                <AppText>
                                    <AppSpan $textSize={'1.6'} $fontWeight={'600'} $color={'#ffffff'} $rightMargin={'2'}>Profitability</AppSpan>
                                    <AppSpan $textSize={'1.6'} $fontWeight={'600'} $color={'#0D968F'}>23.4%</AppSpan>
                                </AppText>
                                <AppLabel $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'} $topMargin={'1.5'}>N24,000,000,000</AppLabel>
                            </CustomContainer>
                        </GridContainer>
                        <GridContainer 
                            $minHeight={'21.7'} $width={'102.4'} $radius={'1'} $bgColor={'#ffffff'}
                            $padding={'2'} $borderColor={'#C4C4C4'}
                            className='total-deposit-card'
                        >
                            <FlexRow >
                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                        <CustomContainer 
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <CustomContainer $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1.6'} $bottomMargin={'1.5'}>Gross Profit (This Year)</AppText>
                                            <AppText $textSize={'2.5'} $fontWeight={'700'} $bottomMargin={'1'}>N{moneyFormat(overview?.GrossProfit || 0)}</AppText>
                                            <AppSpan 
                                                $textSize={'1.6'} $fontWeight={'700'} 
                                                $color={overview.GrossProfitChange! >= 0 ? '#0D968F' : '#F90000'}
                                            >
                                                {overview.GrossProfitChange! >= 0 ? '+' : ''}{overview?.GrossProfitChange?.toFixed(1) || 0}%
                                            </AppSpan>
                                        </CustomContainer>
                                    </FlexRow>
                                </CustomContainer>

                                <CustomContainer 
                                    $width={'0'} $height={'11.4'} $leftMargin={'6'} $rightMargin={'4'}
                                    style={{border: '0.5px solid #BDBDBD'}} 
                                />

                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                        <CustomContainer 
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#A900F9'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <CustomContainer $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1.6'} $bottomMargin={'1.5'}>Net Profit (This Year)</AppText>
                                            <AppText $textSize={'2.5'} $fontWeight={'700'} $bottomMargin={'1'}>N{moneyFormat(overview?.NetProfit || 0)}</AppText>
                                            <AppSpan 
                                                $textSize={'1.6'} $fontWeight={'700'} 
                                                $color={(overview?.NetProfitChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                            >
                                                {(overview?.NetProfitChange ?? 0) >= 0 ? '+' : ''}{overview?.NetProfitChange?.toFixed(1) || 0}%
                                            </AppSpan>
                                        </CustomContainer>
                                    </FlexRow>
                                </CustomContainer>

                                <CustomContainer 
                                    $width={'0'} $height={'11.4'} $leftMargin={'6'} $rightMargin={'4'}
                                    style={{border: '0.5px solid #BDBDBD'}} 
                                />

                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                        <CustomContainer 
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <CustomContainer $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1.6'} $bottomMargin={'1.5'}>Profitability Ratio</AppText>
                                            <AppText $textSize={'2.5'} $fontWeight={'700'} $bottomMargin={'1'}>23%</AppText>
                                            <AppSpan $textSize={'1.6'} $fontWeight={'700'} $color={'#0D968F'}>+2.1%</AppSpan>
                                        </CustomContainer>
                                    </FlexRow>
                                </CustomContainer>
                            </FlexRow>
                        </GridContainer>
                    </FlexRow>
                </CustomContainer>
            </CustomContainer>
        </CustomContainer>
    )
}