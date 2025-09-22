"use client";
import Image from "next/image"
import { CustomContainer, FlexRow, AbsoluteContainer, AppLabel, AppText, AppSpan } from "@/style"
import CustomerSpiral from '@/assets/images/customer-card-spiral.svg'
import CustomerIcon from '@/assets/images/customer-icon-2.svg'
import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import { explain } from "@/utilities/view"
import { DoughnutChart, LineChart } from "../Charts"
import { moneyFormat } from "@/utilities/utility"
import { CustomersByCategory as Category } from "@/models"

export const CustomerStatistics: React.FC<any> = ({ customerOverview, customersByCategory, customersByActiveTrend, customersByGender }) => {

    return (
        <CustomContainer className='horizontal-scroll-container' $topMargin={'2.5'}>
            <CustomContainer style={{ display: 'inline-block', overflow: 'auto' }}>
                <FlexRow $gap={'2'} style={{ minWidth: 'fit-content' }}>
                    <CustomContainer
                        $width={'32.4'} $minHeight={'18.2'} $radius={'0.8'} $bgColor={'#0D968F'}
                        $topPadding={'2'} $bottomPadding={'1'} $padding={'1.5'}
                        className='statistics-card'
                    >
                        <AbsoluteContainer $top={'0'} $right={'0'}>
                            <Image src={CustomerSpiral} alt="Customer Spiral Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <CustomContainer>
                            <FlexRow>
                                <Image src={CustomerIcon} alt="Customer Icon" width={24} height={24} />

                                <AppLabel $textSize={'1.6'} $color={'#ffffff'} $leftMargin={'1'} $topMargin={'0.7'}>Customers</AppLabel>
                            </FlexRow>
                            <FlexRow $wrap={'wrap'} $topMargin={'0.5'}>
                                <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>{moneyFormat(customerOverview?.TotalCustomers || 0)}</AppText>
                                <AppText >
                                    {customerOverview?.PercentageChange >= 0 ?
                                        <AppSpan $color={'#ffffff'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                        : <AppSpan $color={'#ffffff'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                    }
                                    <AppSpan $textSize={'1.6'} $fontWeight={'700'} $color={'#ffffff'}>{(customerOverview?.PercentageChange || 0)?.toFixed(1)}%</AppSpan>
                                </AppText>
                            </FlexRow>
                        </CustomContainer>
                        <FlexRow $wrap={'wrap'} $gap={'3'} $topMargin={'1.8'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <AppText $color={'#ffffff'}>Active Customers</AppText>
                                <AppText $fontWeight={'700'} $color={'#ffffff'}>{moneyFormat(customerOverview?.ActiveCustomers || 0)}</AppText>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <AppText $color={'#ffffff'}>Inactive Customers</AppText>
                                <AppText $fontWeight={'700'} $color={'#ffffff'}>{moneyFormat(customerOverview?.InactiveCustomers || 0)}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32.4'} $minHeight={'18.2'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $padding={'1.5'} $borderColor={'#C4C4C4'} $bottomPadding={'1'}
                        className='statistics-card'
                    >
                        <FlexRow>
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'} $color={'#111111'} $rightMargin={'1'}>Customer by Category</AppLabel>
                            {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                        </FlexRow>
                        <FlexRow $height={'1.3'} $alignItems={'flex-start'} $radius={'0.2'} $topMargin={'0.5'} $overflow={'hidden'}>
                            {
                                customersByCategory?.data?.items?.map((item: Category, index: number) => {
                                    const bgColor = item.Category === 'Individual' ? '#0D968F' : item.Category === 'Organization' ? '#FF9E2C' : '#A900F9'

                                    return (
                                        <CustomContainer
                                            $width={String(item?.CategoryPercentage)}
                                            $sizeUnit={'%'} $height={'1.5'}
                                            $bgColor={bgColor} key={index}
                                        />
                                    )
                                })
                            }
                        </FlexRow>
                        <CustomContainer>
                            {
                                customersByCategory?.data?.items?.map((item: Category, index: number) => {
                                    const bgColor = item.Category === 'Individual' ? '#0D968F' : item.Category === 'Organization' ? '#FF9E2C' : '#A900F9'

                                    return (
                                        <FlexRow
                                            $justifyContent={'space-between'}
                                            $topMargin={'0.7'}
                                            key={index}
                                        >
                                            <FlexRow $width={'auto'} $sizeUnit={''}>
                                                <CustomContainer
                                                    $height={'0.8'} $width={'0.8'} $bgColor={bgColor}
                                                    $topMargin={'-0.5'} $rightMargin={'1'} $radius={'0.2'}
                                                />
                                                <AppLabel $textSize={'1.2'}>{item.Category} account</AppLabel>
                                            </FlexRow>
                                            <FlexRow $width={'auto'} $sizeUnit={''}>
                                                <AppText $textSize={'1.2'} $fontWeight={'600'} $rightMargin={'2'}>{moneyFormat(item.TotalCustomers || 0)}</AppText>
                                                <AppSpan
                                                    $textSize={'1.2'} $fontWeight={'600'}
                                                    $color={item.PercentageChange! >= 0 ? '#0D968F' : '#F90000'}
                                                >
                                                    {item.PercentageChange! >= 0 ? '+' : ''}{item.PercentageChange?.toFixed(1) || 0}%
                                                </AppSpan>
                                            </FlexRow>
                                        </FlexRow>
                                    )
                                })
                            }
                        </CustomContainer>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32.4'} $minHeight={'18.2'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $padding={'1.5'} $borderColor={'#C4C4C4'} $bottomPadding={'1'}
                        className='statistics-card'
                    >
                        <FlexRow>
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'} $rightMargin={'1'}>Customer Gender Mix</AppLabel>
                            {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                        </FlexRow>

                        <CustomContainer $height={'12'}>
                            <DoughnutChart
                                data={customersByGender?.Count || []} // [30, 70] 
                                labels={customersByGender?.Gender || ['Male', 'Femaile']}
                                bgColors={['#66CB9F', '#F2994A']}
                                borderColor={['#66CB9F', '#F2994A']}
                                position='right'
                                alignLabels="center"
                            />
                        </CustomContainer>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32.4'} $minHeight={'18.2'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $topPadding={'1.5'} $borderColor={'#C4C4C4'}
                        className='statistics-card'
                    >
                        <FlexRow $leftPadding={'1.5'}>
                            <AppLabel $textSize={'1.6'} $fontWeight={'600'} $color={'#111111'} $rightMargin={'1'}>Active Customer Trend</AppLabel>
                            {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                        </FlexRow>
                        <FlexRow $leftPadding={'1.5'}>
                            <AppSpan $textSize={'2.5'} $fontWeight={'700'}>{customersByActiveTrend?.selectedPeriod?.PercentageActive?.toFixed(1) || 0}%</AppSpan>
                            <AppSpan
                                $textSize={'1.6'} $fontWeight={'700'} $leftMargin={'1'}
                                $color={customersByActiveTrend?.selectedPeriod?.PercentageChange >= 0 ? '#0D968F' : '#F90000'}
                            >
                                {customersByActiveTrend?.selectedPeriod?.PercentageChange >= 0 ? '+' : ''}{customersByActiveTrend?.selectedPeriod?.PercentageChange?.toFixed(1) || 0}%
                            </AppSpan>
                        </FlexRow>
                        <CustomContainer $rightPadding={'3'} $height={'9.5'}>
                            <LineChart
                                borderColor='#0D968F'
                                data={customersByActiveTrend?.ActiveCustomers || []} // [23, 35, 50, 38, 35, 37, 70, 62, 45, 52, 60, 75]  
                                label={customersByActiveTrend?.Duration}
                                initialColor='rgba(78, 165, 54, 0)'
                                finalColor='rgba(78, 165, 54, 0.52)'
                            />
                        </CustomContainer>
                    </CustomContainer>
                </FlexRow>
            </CustomContainer>
        </CustomContainer>
    )
}