"use client";
import './style.scss'
import Image from "next/image"
import { moneyFormat } from '@/utilities/utility'
import { AppDispatch } from '@/configs/storeConfig'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/stores'
import { AbsoluteContainer, AppLabel, AppSpan, AppText, CustomContainer, FlexRow, GridContainer, ScreenContainer } from '@/style'
import { HiOutlineChevronDown } from 'react-icons/hi'
import SpiralLeftImg from '@/assets/images/deposit-spiral-left.svg'
import SpiralRightImg from '@/assets/images/deposit-spiral-right.svg'
import { Dropdown, LineChart } from '@/components'
import { fixedDepositsStore } from '@/stores/fixedDepositsStore'
import { readFixedDepositByValueRequestInit } from '@/models/requests/fixedDeposit/readFixedDepositByValueRequest'

export default function FixedDeposit() {
    const dispatch: AppDispatch = useDispatch();

    const {
        period,
        readFixedDepositOverviewResponse: fixedDepositOverview,
        readFixedDepositsByBalanceResponse: fixedDepositBalance,
        readFixedDepositByActiveTrendResponse: fixedDepositByActiveTrend,
        readFixedDepositsByExpenseResponse: fixedDepositExpense,
    } = useSelector((state: RootState) => state.fixedDeposits);

    const handleFetchData = async (duration: string) => {
        await dispatch(
            fixedDepositsStore.action.readFixedDeposits({
                ...readFixedDepositByValueRequestInit,
                period: duration,
            })
        ).unwrap();
    };

    const handleChangePeriod = (value: string) => {
        dispatch(fixedDepositsStore.action.setPeriod(value));
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
                            $leftMargin={'20'}
                            $rightMargin={'20'}
                        />
                    </FlexRow>

                    <CustomContainer className='horizontal-scroll-container' $topMargin={'5'}>
                        <CustomContainer style={{ display: 'inline-block', overflow: 'auto' }}>
                            <FlexRow $gap={'2'} style={{ minWidth: 'fit-content' }}>
                                <FlexRow
                                    $minHeight={'29.7'} $width={'102.4'} $radius={'1'} $bgColor={'#111111'}
                                    $padding={'3.5'} $topPadding={'4.5'}
                                    className='total-deposit-card'
                                >
                                    <AbsoluteContainer $top={'0'} $left={'0'}>
                                        <Image src={SpiralLeftImg} alt="Spiral Left Icon" width={24} height={24} />

                                    </AbsoluteContainer>
                                    <AbsoluteContainer $top={'0'} $right={'0'}>
                                        <Image src={SpiralRightImg} alt="Spiral Right Icon" width={24} height={24} />

                                    </AbsoluteContainer>
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                            <CustomContainer
                                                $width={'0.8'} $height={'0.8'} $bgColor={'#0D968F'}
                                                $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                            />
                                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                                <AppText $textSize={'1.5'} $color={'#ffffff'}>Total Fixed Deposit balance</AppText>
                                                <AppText $topMargin={'0.7'}>
                                                    <AppSpan $textSize={'2'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>N{moneyFormat(fixedDepositBalance?.data?.TotalBalance || 0)}</AppSpan>
                                                    <AppSpan
                                                        $textSize={'1.5'} $fontWeight={'700'}
                                                        $color={(fixedDepositBalance?.data?.TotalBalancePercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                                    >
                                                        {(fixedDepositBalance?.data?.TotalBalancePercentageChange ?? 0) >= 0 ? '+' : ''}{(fixedDepositBalance?.data?.TotalBalancePercentageChange || 0)?.toFixed(1)}%
                                                    </AppSpan>
                                                </AppText>
                                            </CustomContainer>
                                        </FlexRow>
                                        <FlexRow $width={'auto'} $sizeUnit={''} $topMargin={'7'} $leftMargin={'1.5'}>
                                            <AppText $textSize={'1.5'} $color={'#ffffff'}>Average Fixed Deposit balance</AppText>
                                            <AppText $topMargin={'0.7'}>
                                                <AppSpan $textSize={'1.8'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>N{moneyFormat(fixedDepositBalance?.data?.AverageBalance || 0)}</AppSpan>
                                                <AppSpan
                                                    $textSize={'1.5'} $fontWeight={'700'}
                                                    $color={(fixedDepositBalance?.data?.AverageBalancePercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                                >
                                                    {(fixedDepositBalance?.data?.AverageBalancePercentageChange ?? 0) >= 0 ? '+' : ''}{(fixedDepositBalance?.data?.AverageBalancePercentageChange || 0)?.toFixed(1)}%
                                                </AppSpan>
                                            </AppText>
                                        </FlexRow>
                                    </CustomContainer>

                                </FlexRow>

                                <CustomContainer $width={'0'} $height={'20.5'} $leftMargin={'6'} $rightMargin={'4'}
                                    style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}
                                />

                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                        <CustomContainer
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#FF9E2C'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <CustomContainer $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1.5'} $color={'#ffffff'}>Total Number of Fixed Deposits</AppText>
                                            <AppText $topMargin={'0.7'}>
                                                <AppSpan $textSize={'2'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>{fixedDepositOverview?.data?.TotalFixedDeposits}</AppSpan>
                                                <AppSpan
                                                    $textSize={'1.5'} $fontWeight={'700'}
                                                    $color={(fixedDepositOverview?.data?.PercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                                >
                                                    {(fixedDepositOverview?.data?.PercentageChange || 0)?.toFixed(1)}%
                                                </AppSpan>
                                            </AppText>
                                        </CustomContainer>
                                    </FlexRow>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $topMargin={'7'} $leftMargin={'1.5'}>
                                        <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'7'}>
                                            <AppLabel $color={'#ffffff'}>Mature</AppLabel>
                                            <AppText $textSize={'1.8'} $fontWeight={'700'} $color={'#ffffff'}>{fixedDepositOverview?.data?.MatureAccounts || 0}</AppText>
                                        </CustomContainer>
                                        <CustomContainer $width={'auto'} $sizeUnit={''}>
                                            <AppLabel $color={'#ffffff'}>Immature</AppLabel>
                                            <AppText $textSize={'1.8'} $fontWeight={'700'} $color={'#ffffff'}>{fixedDepositOverview?.data?.ImmatureAccounts || 0}</AppText>
                                        </CustomContainer>
                                    </FlexRow>
                                </CustomContainer>

                                <CustomContainer $width={'0'} $height={'20.5'} $leftMargin={'6'} $rightMargin={'4'}
                                    style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}
                                />

                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-start'}>
                                        <CustomContainer
                                            $width={'0.8'} $height={'0.8'} $bgColor={'#3BE5B8'}
                                            $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                        />
                                        <CustomContainer $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1.5'} $color={'#ffffff'}>Total Interest Expenses</AppText>
                                            <AppText $topMargin={'0.7'}>
                                                <AppSpan $textSize={'2'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>N{moneyFormat(fixedDepositExpense?.data?.TotalExpense || 0)}</AppSpan>
                                                <AppSpan
                                                    $textSize={'1.5'} $fontWeight={'700'}
                                                    $color={(fixedDepositExpense?.data?.TotalExpensePercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                                >
                                                    {(fixedDepositExpense?.data?.TotalExpensePercentageChange ?? 0) >= 0 ? '+' : ''}{(fixedDepositExpense?.data?.TotalExpensePercentageChange || 0)?.toFixed(1)}%
                                                </AppSpan>
                                            </AppText>
                                        </CustomContainer>
                                    </FlexRow>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $topMargin={'7'} $leftMargin={'1.5'}>
                                        <AppText $textSize={'1.5'} $color={'#ffffff'}>Average Interest Expenses</AppText>
                                        <AppText $topMargin={'0.7'}>
                                            <AppSpan $textSize={'1.8'} $fontWeight={'700'} $color={'#ffffff'} $rightMargin={'1'}>N{moneyFormat(fixedDepositExpense?.data?.AvgExpense || 0)}</AppSpan>
                                            <AppSpan
                                                $textSize={'1.5'} $fontWeight={'700'}
                                                $color={(fixedDepositExpense?.data?.AverageExpensePercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                            >
                                                {(fixedDepositExpense?.data?.AverageExpensePercentageChange ?? 0) >= 0 ? '+' : ''}{(fixedDepositExpense?.data?.AverageExpensePercentageChange || 0)?.toFixed(1)}%
                                            </AppSpan>
                                        </AppText>
                                    </FlexRow>
                                </CustomContainer>
                            </FlexRow>
                            <CustomContainer
                                $minHeight={'29.7'} $width={'28.6'} $radius={'0.8'}
                                $borderColor={'#C4C4C4'} $bgColor={'#ffffff'}
                                className='active-deposit-card'
                            >
                                <CustomContainer $padding={'2'}>
                                    <AppLabel $textSize={'1.5'} $fontWeight={'600'}>Active Deposit Trend</AppLabel>
                                    <AppText $topMargin={'2'}>
                                        <AppSpan $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1.5'}>{fixedDepositByActiveTrend?.data?.selected_period?.PercentageActive || 0}%</AppSpan>
                                        <AppSpan
                                            $textSize={'1.5'} $fontWeight={'700'}
                                            $color={(fixedDepositByActiveTrend?.data?.selected_period?.PercentageChange ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                        >
                                            {(fixedDepositByActiveTrend?.data?.selected_period?.PercentageChange ?? 0) >= 0 ? '+' : ''}{(fixedDepositByActiveTrend?.data?.selected_period?.PercentageChange || 0)?.toFixed(1)}%
                                        </AppSpan>
                                    </AppText>
                                </CustomContainer>
                                <CustomContainer $rightPadding={'3'} $height={'17'}>
                                    <LineChart
                                        borderColor='#0D968F'
                                        data={fixedDepositByActiveTrend?.data?.ActiveAccounts || []}
                                        label={fixedDepositByActiveTrend?.data?.Duration || []}
                                        initialColor='rgba(133, 223, 108, 0.05)'
                                        finalColor='rgba(133, 223, 108, 0.6)'
                                    />
                                </CustomContainer>
                            </CustomContainer>
                        </CustomContainer>
                    </CustomContainer>
                </CustomContainer>
            </ScreenContainer>
        </>
    )
}