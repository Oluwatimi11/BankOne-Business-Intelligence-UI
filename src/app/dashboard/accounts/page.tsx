"use client";
import './style.scss';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/configs/storeConfig";
import { accountsStore } from "@/stores/accountsStore";
import { readAccountsByValueRequestInit } from "@/models/requests/accounts/readAccountsByValueRequest";
import {
    ScreenContainer,
    CustomContainer,
    FlexRow,
    FlexColumn,
    AppLabel,
    AppText,
    AppSpan,
    GridContainer
} from "@/style";
import { DoughnutChart, Dropdown, LineChart } from "@/components";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { moneyFormat } from "@/utilities/utility";
import { explain } from "@/utilities/view";
import AccountHolderIcon from '@/assets/images/account-holder-icon.svg';
import { RootState } from "@/stores";


export default function Accounts() {
    const dispatch: AppDispatch = useDispatch();

    const {
        period,
        readAccountOverviewResponse: overview,
        readAccountBalanceByProductResponse: balanceByProduct,
        readAccountsByProductResponse: accountsByProduct,
        readAccountsByCategoryResponse: accountsByCategory,
        readNewAccountResponse: newAccounts,
        readNewAccountActiveTrendResponse: accountsByActiveTrend,
    } = useSelector((state: RootState) => state.accounts);

    const handleFetchData = async (duration: string) => {
        await dispatch(
            accountsStore.action.readAccounts({
                ...readAccountsByValueRequestInit,
                period: duration,
            })
        ).unwrap();
    };

    const handleChangePeriod = (value: string) => {
        dispatch(accountsStore.action.setPeriod(value));
        handleFetchData(value);
    };

    return (
        <>
            <ScreenContainer $padding={'2.5'}>
                <CustomContainer>
                    <CustomContainer $width={'32.4'} $bottomMargin={'2'} className='customer-screen-note'>
                        <AppSpan $textSize={'1.5'}>
                            This data anlaytics shows the data of accounts by products within the bank.
                        </AppSpan>
                    </CustomContainer>
                    <FlexRow $gap={'2'} $wrap='wrap' $justifyContent='flex-end'>
                        <AppText $textSize='1.5' $color='#000000'>Viewing {period} days Data Trend</AppText>
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
                            $leftMargin={20}
                            $rightMargin={20}
                        />
                    </FlexRow>

                    <FlexRow
                        $gap={'2'} $topMargin={'2'} $alignItems='stretch'
                        $wrap='wrap' $minHeight={'25.2'} $justifyContent='space-between'
                        className='account-stats-container'
                    >
                        <FlexColumn
                            $padding='1.5' $minHeight={'25.2'} $radius={'0.8'} $justifyContent='space-between'
                            $bgColor={'#FFE9CE'} $borderColor={'#FF9E2C'}
                            className='account-stats-1'
                        >
                            <CustomContainer>
                                <FlexRow>
                                    {/* <AccountHolderIcon /> */}
                                    <Image src={AccountHolderIcon} alt="Account Holder Icon" width={24} height={24} />
                                    <AppText $textSize='1.5' $fontWeight='600' $leftMargin='1'>Account Holders</AppText>
                                </FlexRow>
                                <FlexRow $topMargin={'0.5'}>
                                    <AppLabel $textSize="2.5" $fontWeight="700" $rightMargin="0.7">{moneyFormat(overview?.data?.ActiveAccounts || 0)}</AppLabel>
                                    {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                                </FlexRow>
                            </CustomContainer>
                            <FlexRow $gap={'2'} $wrap='wrap' $topMargin={'2'} $bottomMargin={'1'}>
                                <CustomContainer $width={'auto'} $sizeUnit='' $rightMargin={'2.5'}>
                                    <AppSpan>Active Account</AppSpan>
                                    <AppText $fontWeight='700'>{moneyFormat(overview?.data?.ActiveAccounts || 0)}</AppText>
                                </CustomContainer>
                                <CustomContainer $width={'auto'} $sizeUnit=''>
                                    <AppSpan>Inactive Account</AppSpan>
                                    <AppText $fontWeight='700'>{moneyFormat(overview?.data?.InactiveAccounts || 0)}</AppText>
                                </CustomContainer>
                            </FlexRow>
                        </FlexColumn>

                        <CustomContainer
                            $padding='1.5' $minHeight={'25.2'} $radius={'0.8'}
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                            className='account-stats-2'
                        >
                            <FlexRow $topMargin={'0.5'}>
                                <AppLabel $textSize="1.5" $fontWeight="500" $color='#5D5D5D' $rightMargin="1">
                                    Total Balance of all Product:
                                    <AppSpan $textSize='1.5' $fontWeight='700'> N{moneyFormat(balanceByProduct?.data?.total?.TotalBalance || 0)} </AppSpan>
                                </AppLabel>
                                {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                            </FlexRow>
                            <FlexRow
                                $gap={'1.5'} $wrap='wrap' $topMargin={'2'} $alignItems='flex-start'
                                className='number-of-account-by-product'
                            >
                                <CustomContainer $width={'14.7'} $height={'14.7'}>
                                    <DoughnutChart
                                        data={balanceByProduct?.data?.totalBalance || []}
                                        labels={balanceByProduct?.data?.products || []}
                                        bgColors={balanceByProduct?.data?.color || []}
                                        borderColor={balanceByProduct?.data?.color || []}
                                        showLegend={false}
                                        cutout={40}
                                    />
                                </CustomContainer>
                                <FlexRow
                                    className='total-balance-chart-legend'
                                    $gap={'2'} $alignItems='flex-start' $wrap='wrap'
                                >
                                    {
                                        balanceByProduct?.data?.breakdown?.map((item, index: number) => {
                                            return (
                                                <FlexRow
                                                    $width={'auto'} $sizeUnit=''
                                                    $alignItems='flex-start'
                                                    key={index}
                                                >
                                                    <CustomContainer
                                                        $width={'0.8'} $height={'0.8'} $bgColor={item?.Color}
                                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                                    />
                                                    <CustomContainer $width={'auto'} $sizeUnit='' >
                                                        <AppLabel $textSize='1.2' $color='#000000'>{item?.Products}</AppLabel>
                                                        {/* <AppText $color='#5D5D5D' $textSize='1.2' $topMargin={'-0.3'}>(Current product)</AppText> */}
                                                        <AppText $textSize='1.2' $fontWeight='700' $topMargin={'-0.5'}>
                                                            {moneyFormat(item?.TotalBalance)}
                                                            <AppSpan $color='#5D5D5D' $textSize='1.2' $fontWeight='700'> ({item?.PercentageTotal?.toFixed(1) || 0}%) </AppSpan>
                                                            <AppSpan >
                                                                {item?.PercentageTotal >= 0 ?
                                                                    <AppSpan $color='#0D968F' $textSize='1.2'><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                    : <AppSpan $color='#F90000' $textSize='1.2'><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                }
                                                                <AppSpan
                                                                    $textSize='1.2' $fontWeight='600'
                                                                    $color={item?.PercentageTotal >= 0 ? '#0D968F' : '#F90000'}
                                                                >
                                                                    {item?.PercentageTotal?.toFixed(1) || 0}%
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

                        <CustomContainer
                            $padding='2' $minHeight={'25.2'} $radius={'0.8'} $topPadding='1.5'
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                            className='account-stats-3'
                        >
                            <FlexRow $topMargin={'0.5'}>
                                <AppLabel $textSize="1.5" $fontWeight="600" $rightMargin="1">
                                    Total Balance of all Product:
                                </AppLabel>
                                {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                            </FlexRow>
                            <FlexRow
                                //className='total-balance-chart-legend' 
                                $gap={'3'} $alignItems='flex-start'
                                $wrap='wrap' $topMargin={'1.5'}
                            >
                                {
                                    balanceByProduct?.data?.breakdown?.map((item, index: number) => {
                                        return (
                                            <FlexRow
                                                $width={'auto'} $sizeUnit=''
                                                $alignItems='flex-start'
                                                key={index}
                                            >
                                                <CustomContainer
                                                    $width={'0.8'} $height={'0.8'} $bgColor={item?.Color}
                                                    $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                                />
                                                <CustomContainer $width={'auto'} $sizeUnit='' >
                                                    <AppLabel $textSize='1.2' $color='#000000'>{item?.Products}</AppLabel>
                                                    {/* <AppText $color='#5D5D5D' $textSize='1.2' $topMargin={'-0.3'}>(Current product)</AppText> */}
                                                    <AppText $textSize='1.2' $fontWeight='700' $topMargin={'-0.5'}>
                                                        {moneyFormat(item?.TotalBalance)}
                                                        <AppSpan $color='#5D5D5D' $textSize='1.2' $fontWeight='700'> ({item?.PercentageTotal?.toFixed(1) || 0}%) </AppSpan>
                                                        <AppSpan >
                                                            {item?.PercentageTotal >= 0 ?
                                                                <AppSpan $color='#0D968F' $textSize='1.2'><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                : <AppSpan $color='#F90000' $textSize='1.2'><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                            }
                                                            <AppSpan
                                                                $textSize='1.2' $fontWeight='600'
                                                                $color={item?.PercentageTotal >= 0 ? '#0D968F' : '#F90000'}
                                                            >
                                                                {item?.PercentageTotal?.toFixed(1) || 0}%
                                                            </AppSpan>
                                                        </AppSpan>
                                                    </AppText>
                                                </CustomContainer>
                                            </FlexRow>
                                        )
                                    })
                                }
                            </FlexRow>
                        </CustomContainer>

                        <CustomContainer
                            $padding='1.5' $minHeight={'25.2'} $radius={'0.8'}
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                            className='account-stats-4'
                        >
                            <FlexRow $topMargin={'0.5'}>
                                <AppLabel $textSize="1.5" $fontWeight="600" $rightMargin="1">
                                    Total Number of Accounts by Product
                                </AppLabel>
                                {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                            </FlexRow>
                            <FlexRow
                                $gap={'1.5'} $wrap='wrap' $topMargin={'2'} $alignItems='flex-start'
                                className='number-of-account-by-product'
                            >
                                <CustomContainer $width={'14.7'} $height={'14.7'}>
                                    <DoughnutChart
                                        data={accountsByProduct?.data?.TotalAccounts || []}
                                        labels={accountsByProduct?.data?.Product || []}
                                        bgColors={accountsByProduct?.data?.Color || []}
                                        borderColor={accountsByProduct?.data?.Color || []}
                                        showLegend={false}
                                        cutout={40}
                                    />
                                </CustomContainer>
                                <FlexRow
                                    className='total-balance-chart-legend'
                                    $gap={'2'} $alignItems='flex-start' $wrap='wrap'
                                >
                                    {
                                        accountsByProduct?.data?.items?.map((item, index: number) => {
                                            return (
                                                <FlexRow
                                                    $width={'auto'} $sizeUnit=''
                                                    $alignItems='flex-start'
                                                    key={index}
                                                >
                                                    <CustomContainer
                                                        $width={'0.8'} $height={'0.8'} $bgColor={item?.Color}
                                                        $radius={'0.2'} $rightMargin={'0.7'} $topMargin={'0.7'}
                                                    />
                                                    <CustomContainer $width={'auto'} $sizeUnit='' >
                                                        <AppLabel $textSize='1.2' $color='#000000'>{item?.Product}</AppLabel>
                                                        {/* <AppText $color='#5D5D5D' $textSize='1.2' $topMargin={'-0.3'}>(Current product)</AppText> */}
                                                        <AppText $textSize='1.2' $fontWeight='700' $topMargin={'-0.5'}>
                                                            {moneyFormat(item?.TotalAccounts)}
                                                            <AppSpan $color='#5D5D5D' $textSize='1.2' $fontWeight='700'> ({item?.ProductPercentage?.toFixed(1) || 0}%) </AppSpan>
                                                            <AppSpan >
                                                                {item?.ProductPercentage >= 0 ?
                                                                    <AppSpan $color='#0D968F' $textSize='1.2'><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                    : <AppSpan $color='#F90000' $textSize='1.2'><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                                }
                                                                <AppSpan
                                                                    $textSize='1.2' $fontWeight='600'
                                                                    $color={item?.PercentageChange >= 0 ? '#0D968F' : '#F90000'}
                                                                >
                                                                    {item?.PercentageChange?.toFixed(1) || 0}%
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

                        <CustomContainer
                            $padding='1.5' $minHeight={'25.2'} $radius={'0.8'}
                            $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                            className='account-stats-5'
                        >
                            <FlexRow $topMargin={'0.5'}>
                                <AppLabel $textSize="1.5" $fontWeight="600" $rightMargin="1">
                                    Account by Customer Category
                                </AppLabel>
                                {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                            </FlexRow>
                            <FlexRow $height={'1.3'} $alignItems='flex-start' $radius={'0.2'} $topMargin={'0.5'} $overflow='hidden'>
                                {/* <CustomContainer $width={'52.6'} $sizeUnit='%' $height={'1.3'} $bgColor={'#0D968F'}/>
                                <CustomContainer $width={'27'} $sizeUnit='%' $height={'1.3'} $bgColor={'#FF9E2C'} />
                                <CustomContainer $width={'20.4'} $sizeUnit='%' $height={'1.3'} $bgColor={'#A900F9'} /> */}
                                {
                                    accountsByCategory?.data?.items?.map((item, index: number) => {
                                        const bgColor = item?.Category === 'Individual' ? '#0D968F' : item?.Category === 'Group' ? '#FF9E2C' : '#A900F9'

                                        return (
                                            <CustomContainer
                                                $width={String(item?.CategoryPercentage)}
                                                $sizeUnit='%' $height={'1.5'}
                                                $bgColor={bgColor} key={index}
                                            />
                                        )
                                    })
                                }
                            </FlexRow>
                            <CustomContainer>
                                {
                                    accountsByCategory?.data?.items.map((item, index: number) => {
                                        const bgColor = item?.Category === 'Individual' ? '#0D968F' : item?.Category === 'Group' ? '#FF9E2C' : '#A900F9'

                                        return (
                                            <FlexRow
                                                $justifyContent='space-between'
                                                $topMargin={'0.7'}
                                                key={index}
                                            >
                                                <FlexRow $width={'auto'} $sizeUnit=''>
                                                    <CustomContainer
                                                        $height={'0.8'} $width={'0.8'} $bgColor={bgColor}
                                                        $topMargin={'-0.5'} $rightMargin={'1'} $radius={'0.2'}
                                                    />
                                                    <AppLabel $textSize="1.2">{item?.Category} account</AppLabel>
                                                </FlexRow>
                                                <FlexRow $width="auto" $sizeUnit="">
                                                    <AppText $textSize="1.2" $fontWeight="600" $rightMargin="2">{moneyFormat(item?.TotalAccounts || 0)}</AppText>
                                                    <AppSpan
                                                        $textSize='1.2' $fontWeight='600'
                                                        $color={item?.PercentageChange >= 0 ? '#0D968F' : '#F90000'}
                                                    >
                                                        {item?.PercentageChange >= 0 ? '+' : ''}{item?.PercentageChange?.toFixed(1) || 0}%
                                                    </AppSpan>
                                                </FlexRow>
                                            </FlexRow>
                                        )
                                    })
                                }
                            </CustomContainer>
                        </CustomContainer>

                        <FlexColumn
                            $minHeight={'25.2'}
                            $justifyContent='space-between'
                            className='account-stats-6'
                        >
                            <CustomContainer
                                $padding='1.5' $radius={'0.8'} $minHeight={'45.2'} $mnHUnit='%'
                                $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                                className='account-stats-6-child'
                            >
                                <FlexRow >
                                    <AppLabel $textSize="1.5" $fontWeight="600" $color="#111111" $rightMargin="1">New Account Holders</AppLabel>
                                    {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                                </FlexRow>
                                <FlexRow>
                                    <AppSpan $textSize='2.5' $fontWeight='700'>{moneyFormat(newAccounts?.data?.selected_period?.NewAccounts || 0)}</AppSpan>
                                    <AppSpan $leftMargin="1">
                                        {(() => {
                                            const percentageChange = newAccounts?.data?.selected_period?.Percentage_change ?? 0;
                                            const isPositive = percentageChange >= 0;
                                            const arrowColor = isPositive ? "#0D968F" : "#F90000";

                                            return (
                                                <>
                                                    <AppSpan $color={arrowColor} $textSize="1.2">
                                                        {isPositive ? (
                                                            <BsArrowUp style={{ marginTop: "-0.5rem" }} />
                                                        ) : (
                                                            <BsArrowDown style={{ marginTop: "-0.5rem" }} />
                                                        )}
                                                    </AppSpan>
                                                    <AppSpan $textSize="1.2" $fontWeight="600" $color={arrowColor}>
                                                        {isPositive ? "+" : ""}
                                                        {percentageChange.toFixed(1)}%
                                                    </AppSpan>
                                                </>
                                            );
                                        })()}
                                    </AppSpan>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer
                                $radius={'0.8'} $minHeight={'50.8'} $mnHUnit='%' $topPadding='1.5'
                                $bgColor={'#ffffff'} $borderColor={'#C4C4C4'}
                                className='account-stats-6-child'
                            >
                                <FlexRow $leftPadding={'1.5'}>
                                    <AppLabel $textSize="1.5" $fontWeight="600" $color="#111111" $rightMargin="1">Active Account Trend</AppLabel>
                                    {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                                </FlexRow>
                                <FlexRow $leftPadding={'1.5'} $topMargin={'-1'}>
                                    <AppSpan $textSize='2.5' $fontWeight='700'>{accountsByActiveTrend?.data?.selected_period?.PercentageActive?.toFixed(1) || 0}%</AppSpan>
                                    <AppSpan $leftMargin="1">
                                        {(() => {
                                            const percentageChange = accountsByActiveTrend?.data?.selected_period?.PercentageChange ?? 0;
                                            const isPositive = percentageChange >= 0;
                                            const arrowColor = isPositive ? "#0D968F" : "#F90000";

                                            return (
                                                <>
                                                    <AppSpan $color={arrowColor} $textSize="1.2">
                                                        {isPositive ? (
                                                            <BsArrowUp style={{ marginTop: "-0.5rem" }} />
                                                        ) : (
                                                            <BsArrowDown style={{ marginTop: "-0.5rem" }} />
                                                        )}
                                                    </AppSpan>
                                                    <AppSpan $textSize="1.2" $fontWeight="600" $color={arrowColor}>
                                                        {percentageChange.toFixed(1)}%
                                                    </AppSpan>
                                                </>
                                            );
                                        })()}
                                    </AppSpan>
                                </FlexRow>
                                <CustomContainer $rightPadding="3" $height={"5"}>
                                    <LineChart
                                        borderColor="#0D968F"
                                        data={accountsByActiveTrend?.data?.ActiveAccounts || []} // [23, 35, 50, 38, 35, 37, 70, 62, 45, 52, 60, 75]  
                                        label={accountsByActiveTrend?.data?.Duration || []}
                                        initialColor='rgba(78, 165, 54, 0)'
                                        finalColor='rgba(78, 165, 54, 0.52)'
                                    />
                                </CustomContainer>
                            </CustomContainer>
                        </FlexColumn>
                    </FlexRow>
                </CustomContainer>
            </ScreenContainer>
        </>
    )
}