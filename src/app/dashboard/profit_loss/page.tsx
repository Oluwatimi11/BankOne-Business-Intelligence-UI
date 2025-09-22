"use client";
import './style.scss'
import { ScreenContainer, CustomContainer, AppSpan, AbsoluteContainer, FlexRow, GridContainer, AppText } from "../../../style"
import { HiOutlineChevronDown } from 'react-icons/hi'
import { Dropdown, ExpensesStatistics, IncomeStatistics, Profitability } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/configs/storeConfig'
import { RootState } from '@/stores'
import { profitLossStore } from '@/stores/profitLossStore'
import { readProfitLossByValueRequestInit } from '@/models/requests/profitLoss/readProfitLossByValueRequest'

export default function ProfitAndLoss() {
    const dispatch: AppDispatch = useDispatch();

    const {
        period,
        navPosition,
        readProfitLossByTrendResponse: profitAndLossTrend,
        readProfitLossOverviewResponse: profitAndLossOverview
    } = useSelector((state: RootState) => state.profitLoss);

    const handleFetchData = async (duration: string) => {
        await dispatch(
            profitLossStore.action.readProfitLoss({
                ...readProfitLossByValueRequestInit,
                period: duration,
            })
        ).unwrap();
    };

    const handleChangePeriod = (value: string) => {
        dispatch(profitLossStore.action.setPeriod(value));
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
                    <GridContainer>
                        <GridContainer
                            $height={'4.8'} $topMargin={'3'} $bottomMargin={'2'}
                            $width={'46.7'} $radius={'0.8'} $bgColor={'#EDEDED'}
                            className="profit_loss-toggler-container"
                        >
                            <AbsoluteContainer $width={'33.3'} $sizeUnit={'%'} $top={'0.3'} style={{ left: `${navPosition}%` }}>
                                <CustomContainer $bgColor={'#111111'} $height={'4.1'} $radius={'0.6'} />
                            </AbsoluteContainer>
                            <FlexRow style={{ zIndex: '2' }}>
                                <AppSpan
                                    $color={navPosition === 0 ? '#ffffff' : '#5D5D5D'}
                                    $fontWeight={navPosition === 0 ? '700' : '400'}
                                    $cursor={'pointer'} $width={'33.3'}
                                    $sizeUnit={'%'} $align={'center'}
                                    onClick={() => dispatch(profitLossStore.action.setNavPosition(0))}

                                >
                                    Profitability
                                </AppSpan>
                                <AppSpan
                                    $color={navPosition === 33.3 ? '#ffffff' : '#5D5D5D'}
                                    $fontWeight={navPosition === 33.3 ? '700' : '400'}
                                    $cursor={'pointer'} $width={'33.3'}
                                    $sizeUnit={'%'} $align={'center'}
                                    onClick={() => dispatch(profitLossStore.action.setNavPosition(33.3))}
                                >
                                    Income
                                </AppSpan>
                                <AppSpan
                                    $color={navPosition === 66.67 ? '#ffffff' : '#5D5D5D'}
                                    $fontWeight={navPosition === 66.67 ? '700' : '400'}
                                    $cursor={'pointer'} $width={'33.3'}
                                    $sizeUnit={'%'} $align={'center'}
                                    onClick={() => dispatch(profitLossStore.action.setNavPosition(66.67))}
                                >
                                    Expenses
                                </AppSpan>
                            </FlexRow>
                        </GridContainer>
                    </GridContainer>
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
                    {navPosition === 0 ?
                        <Profitability
                            overview={profitAndLossOverview}
                            trendInfo={profitAndLossTrend}
                        />
                        : navPosition === 33.3 ?
                            <IncomeStatistics
                                overview={profitAndLossOverview}
                            />
                            : navPosition === 66.67 ?
                                <ExpensesStatistics
                                    overview={profitAndLossOverview}
                                    trendInfo={profitAndLossTrend}
                                />
                                : null
                    }
                </CustomContainer>
            </ScreenContainer>
        </>
    )
}