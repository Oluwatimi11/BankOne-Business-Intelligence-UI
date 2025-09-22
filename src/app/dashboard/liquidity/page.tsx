"use client";
import './style.scss'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow, GridContainer, ScreenContainer } from '../../../style'
import { moneyFormat } from '../../../utilities/utility'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { DoughnutChart, Dropdown } from '../../../components'
import { liquidityStore } from '@/stores/liquidityStore'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/stores'
import { readLiquidityByValueRequestInit } from '@/models/requests/liquidity/readLiquidityByValueRequest'
import { AppDispatch } from '@/configs/storeConfig'


export default function Liquidity() {
    const dispatch: AppDispatch = useDispatch();

    const {
        period,
        readLiquidityOverviewResponse: liquidityOverview,
        liquidityByChannel,
    } = useSelector((state: RootState) => state.liquidity);

    const handleFetchData = async (duration: string) => {
        await dispatch(
            liquidityStore.action.readLiquidity({
                ...readLiquidityByValueRequestInit,
                period: duration,
            })
        ).unwrap();
    };

    const handleChangePeriod = (value: string) => {
        dispatch(liquidityStore.action.setPeriod(value));
        handleFetchData(value);
    };

    return (
        <>
            <ScreenContainer $padding={'2.5'}>
                <CustomContainer>
                    <CustomContainer $width={'38'} $bottomMargin={'3'} className='customer-screen-note'>
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
                    <FlexRow
                        $gap={'2'} $alignItems={'stretch'} $topMargin={'-3.5'}
                        className='liquidity-card-container'
                    >
                        <CustomContainer
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'} $radius={'0.8'}
                            $width={'32.4'} $minHeight={'15.6'} $padding={'2'} $topPadding={'1.5'}
                            className='liquidity-card'
                        >
                            <AppLabel $textSize={'1.5'} $color={'#5D5D5D'}>Liquidity Ratio</AppLabel>
                            <FlexRow $justifyContent={'space-between'}>
                                <FlexRow $width={'auto'} $sizeUnit={''}>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'0.5'}>{liquidityOverview?.data?.LiquidityRatio}</AppText>
                                    <AppSpan $color={'#0D968F'} $textSize={'2.5'} $topMargin={'-0.3'}><IoCheckmarkCircle /></AppSpan>
                                </FlexRow>
                                <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'1.5'}>
                                    <FlexRow $width={'auto'} $sizeUnit={''}>
                                        <CustomContainer
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                            $radius={'0.2'} $rightMargin={'0.7'}
                                        />
                                        <AppSpan $textSize={'1.2'} $color={'#5D5D5D'}>Good</AppSpan>
                                    </FlexRow>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $topMargin={'1'}>
                                        <CustomContainer
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                            $radius={'0.2'} $rightMargin={'0.7'}
                                        />
                                        <AppSpan $textSize={'1.2'} $color={'#5D5D5D'}>Warning</AppSpan>
                                    </FlexRow>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $topMargin={'1'}>
                                        <CustomContainer
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#F90000'}
                                            $radius={'0.2'} $rightMargin={'0.7'}
                                        />
                                        <AppSpan $textSize={'1.2'} $color={'#5D5D5D'}>Bad</AppSpan>
                                    </FlexRow>
                                </CustomContainer>
                            </FlexRow>
                        </CustomContainer>

                        <CustomContainer
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'} $radius={'0.8'}
                            $width={'32.4'} $height={'15.6'} $padding={'1.5'}
                            className='liquidity-card'
                        >
                            <AppLabel $textSize={'1.5'} $color={'#5D5D5D'}>Net Flow</AppLabel>
                            <AppText $topMargin={'0.7'}>
                                <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>N{moneyFormat(liquidityOverview?.data?.NetFlow || 0)}</AppSpan>
                                <AppSpan
                                    $textSize={'1.5'} $fontWeight={'700'}
                                    $color={(liquidityOverview?.data?.NetPercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    style={{ wordWrap: 'initial' }}
                                >
                                    {(liquidityOverview?.data?.NetPercentageChange ?? 0) >= 0 ? '+' : ''}{liquidityOverview?.data?.NetPercentageChange?.toFixed(1) || 0}%
                                </AppSpan>
                            </AppText>
                        </CustomContainer>
                    </FlexRow>

                    <FlexRow
                        $gap={'2'} $topMargin={'2.5'} $alignItems={'stretch'}
                        className='liquidity-container-2'
                    >
                        <CustomContainer
                            $width={'37.4'} $minHeight={'26.3'} $radius={'0.8'}
                            $bgColor={'#111111'} $padding={'2'}
                            className='liquidity-chart-blk-1'
                        >
                            <AppLabel $textSize={'1.5'} $fontWeight={'600'} $color={'#ffffff'}>Total Cash & Bank Balance</AppLabel>
                            <AppText $topMargin={'0.7'}>
                                <AppSpan $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>N{moneyFormat(liquidityOverview?.data?.TotalCash || 0)}</AppSpan>
                                <AppSpan
                                    $textSize={'1.5'} $fontWeight={'700'}
                                    $color={(liquidityOverview?.data?.CashPercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    style={{ wordWrap: 'initial' }}
                                >
                                    {(liquidityOverview?.data?.CashPercentageChange ?? 0) >= 0 ? '+' : ''}{liquidityOverview?.data?.CashPercentageChange?.toFixed(1) || 0}%
                                </AppSpan>
                            </AppText>

                            <FlexRow $topMargin={'7'} $gap={'2'} $justifyContent={'space-between'} $wrap={'wrap'}>
                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <AppLabel $textSize={'1.5'} $color={'#ffffff'} >Total Cash Inflow</AppLabel>
                                    <AppText $textSize={'1.5'} $color={'#ffffff'} $fontWeight={'700'} $topMargin={'-0.5'}>N{moneyFormat(liquidityOverview?.data?.TotalInflow || 0)}</AppText>
                                    <AppSpan
                                        $textSize={'1.5'} $fontWeight={'700'}
                                        $color={(liquidityOverview?.data?.InflowPercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {(liquidityOverview?.data?.InflowPercentageChange ?? 0) >= 0 ? '+' : ''}{liquidityOverview?.data?.InflowPercentageChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </CustomContainer>
                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <AppLabel $textSize={'1.5'} $color={'#ffffff'} >Total Cash Outflow</AppLabel>
                                    <AppText $textSize={'1.5'} $color={'#ffffff'} $fontWeight={'700'} $topMargin={'-0.5'}>N{moneyFormat(liquidityOverview?.data?.TotalOutflow || 0)}</AppText>
                                    <AppSpan
                                        $textSize={'1.5'} $fontWeight={'700'}
                                        $color={(liquidityOverview?.data?.OutflowPercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {(liquidityOverview?.data?.OutflowPercentageChange ?? 0) >= 0 ? '+' : ''}{liquidityOverview?.data?.OutflowPercentageChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </CustomContainer>
                            </FlexRow>
                        </CustomContainer>
                        <CustomContainer
                            $width={'46.3'} $minHeight={'26.3'} $radius={'0.8'}
                            $borderColor={'#C4C4C4'} $bgColor={'#ffffff'} $padding={'1.5'}
                            className='liquidity-chart-blk-2'
                        >
                            <AppLabel $textSize={'1.5'} $fontWeight={'600'}>
                                Inflow per channel
                            </AppLabel>
                            <FlexRow $topMargin={'1'} $wrap={'wrap'}>
                                <AppLabel $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'5'}>Total Inflow</AppLabel>
                                <AppText>
                                    <AppSpan $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'1'}>N{moneyFormat(liquidityOverview?.data?.TotalInflow || 0)}</AppSpan>
                                    <AppSpan
                                        $textSize={'1.5'} $fontWeight={'700'}
                                        $color={(liquidityOverview?.data?.InflowPercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {(liquidityOverview?.data?.InflowPercentageChange ?? 0) >= 0 ? '+' : ''}{liquidityOverview?.data?.InflowPercentageChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </AppText>
                            </FlexRow>
                            <FlexRow
                                $gap={'2'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                                className='liquidity-chart-container'
                            >
                                <CustomContainer $width={'12.2'} $height={'12.2'}>
                                    <DoughnutChart
                                        data={liquidityByChannel?.inflow?.Amount || []}
                                        labels={liquidityByChannel?.inflow?.Channel || []}
                                        bgColors={liquidityByChannel?.inflow?.Color || []}
                                        borderColor={liquidityByChannel?.inflow?.Color || []}
                                        showLegend={false}
                                        cutout={40}
                                    />
                                </CustomContainer>
                                <CustomContainer className='liquidity-chart-legend'>
                                    {
                                        liquidityByChannel?.inflow?.data?.map((item, index: number) => {
                                            return (
                                                <FlexRow
                                                    $gap={'1.5'} key={index}
                                                    $justifyContent={'space-between'}
                                                >
                                                    <FlexRow $width={'auto'} $sizeUnit={''}>
                                                        <CustomContainer
                                                            $width={'0.8'} $height={'0.8'} $bgColor={item.Color}
                                                            $radius={'0.2'} $rightMargin={'1'}
                                                        />
                                                        <AppSpan $color={'#5D5D5D'}>{item.Channel}</AppSpan>
                                                    </FlexRow>
                                                    <AppText>N{moneyFormat(item.Amount || 0)}</AppText>
                                                </FlexRow>
                                            )
                                        })
                                    }
                                </CustomContainer>
                            </FlexRow>
                        </CustomContainer>
                        <CustomContainer
                            $width={'46.3'} $minHeight={'26.3'} $radius={'0.8'}
                            $borderColor={'#C4C4C4'} $bgColor={'#ffffff'} $padding={'1.5'}
                            className='liquidity-chart-blk-3'
                        >
                            <AppLabel $textSize={'1.5'} $fontWeight={'600'}>
                                Outflow per channel
                            </AppLabel>
                            <FlexRow $topMargin={'1'} $wrap={'wrap'}>
                                <AppLabel $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'5'}>Total Outflow</AppLabel>
                                <AppText>
                                    <AppSpan $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'1'}>N{moneyFormat(liquidityOverview?.data?.TotalOutflow || 0)}</AppSpan>
                                    <AppSpan
                                        $textSize={'1.5'} $fontWeight={'700'}
                                        $color={(liquidityOverview?.data?.OutflowPercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                    >
                                        {(liquidityOverview?.data?.OutflowPercentageChange ?? 0) >= 0 ? '+' : ''}{liquidityOverview?.data?.OutflowPercentageChange?.toFixed(1) || 0}%
                                    </AppSpan>
                                </AppText>
                            </FlexRow>
                            <FlexRow
                                $gap={'2'} $wrap={'wrap'} $topMargin={'2'} $alignItems={'flex-start'}
                                className='liquidity-chart-container'
                            >
                                <CustomContainer $width={'12.2'} $height={'12.2'}>
                                    <DoughnutChart
                                        data={liquidityByChannel?.outflow?.Amount || []}
                                        labels={liquidityByChannel?.outflow?.Channel || []}
                                        bgColors={liquidityByChannel?.outflow?.Color || []}
                                        borderColor={liquidityByChannel?.outflow?.Color || []}
                                        showLegend={false}
                                        cutout={40}
                                    />
                                </CustomContainer>
                                <CustomContainer className='liquidity-chart-legend'>
                                    {
                                        liquidityByChannel?.outflow?.data?.map((item, index: number) => {
                                            return (
                                                <FlexRow
                                                    $gap={'1.5'} key={index}
                                                    $justifyContent={'space-between'}
                                                >
                                                    <FlexRow $width={'auto'} $sizeUnit={''}>
                                                        <CustomContainer
                                                            $width={'0.8'} $height={'0.8'} $bgColor={item.Color}
                                                            $radius={'0.2'} $rightMargin={'1'}
                                                        />
                                                        <AppSpan $color={'#5D5D5D'}>{item.Channel}</AppSpan>
                                                    </FlexRow>
                                                    <AppText>N{moneyFormat(item.Amount || 0)}</AppText>
                                                </FlexRow>
                                            )
                                        })
                                    }
                                </CustomContainer>
                            </FlexRow>
                        </CustomContainer>
                    </FlexRow>
                </CustomContainer>
            </ScreenContainer>
        </>
    )
}