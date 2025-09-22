"use client";
import './style.scss'
import utility, { moneyFormat } from '../../../utilities/utility'
import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow, GridContainer, ScreenContainer } from '../../../style'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { BarChart, CustomerStatistics, Dropdown, LineChart } from '../../../components'
import { explain } from '../../../utilities/view'
import { customersStore } from "@/stores/customersStore";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/configs/storeConfig";
import { RootState } from "@/stores";
import { readCustomersByValueRequestInit } from "@/models/requests/customers/readCustomersByValueRequest";

export default function Customers() {
    const dispatch: AppDispatch = useDispatch();

    const {
        period,
        readCustomerOverviewResponse: customerOverview,
        readCustomersByProductResponse: customersByProduct,
        readCustomerActiveStatusResponse: customersByActiveStatus,
        readCustomerActiveTrendResponse: customersByActiveTrend,
        readCustomerByGenderMixResponse: customersByGender,
        readCustomerNewTrendResponse: customersByNewTrend,
        readCustomersByAgeRangeResponse: customersByAgeRange,
        readCustomersByCategoryResponse: customersByCategory
    } = useSelector((state: RootState) => state.customers);

    const handleFetchData = async (duration: string) => {
        await dispatch(
            customersStore.action.readCustomers({
                ...readCustomersByValueRequestInit,
                period: duration,
            })
        ).unwrap();
    };

    const handleChangePeriod = (value: string) => {
        dispatch(customersStore.action.setPeriod(value));
        handleFetchData(value);
    };

    return (
        <>
            <ScreenContainer $padding={'2.5'}>
                <CustomContainer>
                    <CustomContainer $width={'32.4'} $bottomMargin={'2'} className='customer-screen-note'>
                        <AppSpan $textSize={'1.5'}>
                            The data shows detailed analytics on all customers with the bank.
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
                            $leftMargin={20}
                            $rightMargin={20}
                        />
                    </FlexRow>
                    <CustomerStatistics
                        customerOverview={customerOverview}
                        customersByCategory={customersByCategory}
                        customersByActiveTrend={customersByActiveTrend}
                        customersByGender={customersByGender}
                    />
                    <FlexRow
                        $gap={'2'} $topMargin={'1.5'} $alignItems={'flex-start'} $justifyContent={'space-between'}
                        className='customer-chart-stats-container'
                    >
                        <CustomContainer
                            $padding={'2'} $width={'45.5'} $minHeight={'38.7'} $radius={'0.8'}
                            $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                            className='customer-chart-stats-1'
                        >
                            <FlexRow>
                                <AppLabel $textSize={"1.5"} $fontWeight={"600"} $color={"#111111"} $rightMargin={"1"}>Active Customer Trend</AppLabel>
                                {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                            </FlexRow>
                            <CustomContainer $height={'29'} $topMargin={'2'}>
                                <BarChart
                                    data={customersByAgeRange?.data?.items?.Count || []} // [10000, 35000, 50000, 35000, 25000, 20000, 10000, 5000]
                                    initialColor={'#0D968F'}
                                    finalColor={'#60BB46'}
                                    borderColor={'#0D968F'}
                                    labels={customersByAgeRange?.data?.items?.AgeRange || []} // ['18-24', '25-32', '33-39', '40-47', '48-54', '55-62', '63-70', '71-79'] 
                                />
                            </CustomContainer>
                        </CustomContainer>

                        <CustomContainer
                            $padding={'2'} $width={'45.5'} $minHeight={'38.7'} $radius={'0.8'}
                            $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                            className='customer-chart-stats-2'
                        >
                            <FlexRow>
                                <AppLabel $textSize={"1.5"} $fontWeight={"600"} $color={"#111111"} $rightMargin={"1"}>Customers By Product Type</AppLabel>
                                {explain(`The data shows detailed analytics on all customers with the bank.`, true)}
                            </FlexRow>
                            <CustomContainer $topMargin={'1'}>
                                {
                                    customersByProduct?.data?.items?.map((item, index) => {
                                        const bgColor = utility.customerByProductColorMap[item?.Product] || '#67DBE9'

                                        return (
                                            <CustomContainer key={index} $topMargin={index === 0 ? '0' : '3'}>
                                                <FlexRow $justifyContent={'space-between'} $gap={'0.7'} $wrap={'wrap'}>
                                                    <AppLabel $textSize={'1.2'} $color={'#000000'}>
                                                        {/* Demand Deposit <AppSpan $color={'#5D5D5D'} $textSize={'1.2'}>(Current product)</AppSpan> */}
                                                        {item.Product}
                                                    </AppLabel>
                                                    <AppText $textSize={'1.2'} $color={'#000000'}>
                                                        {moneyFormat(item.TotalCustomers || 0)} <AppSpan $color={'#5D5D5D'} $textSize={'1.2'}>({item.ProductPercentage}%)</AppSpan>
                                                    </AppText>
                                                </FlexRow>
                                                <CustomContainer $height={'0.8'} $radius={'0.2'} $bgColor={'#F3F3F3'}>
                                                    <CustomContainer $height={'0.8'} $width={String(item.ProductPercentage)} $sizeUnit={'%'} $bgColor={bgColor} />
                                                </CustomContainer>
                                            </CustomContainer>
                                        )
                                    })
                                }
                            </CustomContainer>
                        </CustomContainer>

                        <CustomContainer
                            $width={'45.5'} $minHeight={'38.7'}
                            className='customer-chart-stats-3'
                        >
                            <CustomContainer
                                $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                                $radius={'0.8'} $padding={'1.5'} $minHeight={'18.6'} $bottomPadding={'1'}
                                $topPadding={'1.5'} className='customer-chart-stats-3-child'
                            >
                                <FlexRow $alignItems={'flex-start'} $justifyContent={'space-between'}>
                                    <AppText $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'1.5'}>
                                        Customer Activity <AppSpan $textSize={'1.5'} $fontWeight={'600'} $color={'#5D5D5D'}>(Monthly)</AppSpan>
                                    </AppText>
                                    <GridContainer
                                        $width={'11'} $height={'2.7'} $borderColor={'#A0A4A8'}
                                        $radius={'0.5'} $bgColor={'#ffffff'}
                                        $leftPadding={'0.8'} $rightPadding={'0.8'}
                                    >
                                        <FlexRow $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1'} $rightMargin={'1'}>Last {period} Days</AppText>
                                            <AppSpan $textSize={'1'}><HiOutlineChevronDown /></AppSpan>
                                        </FlexRow>
                                    </GridContainer>
                                </FlexRow>
                                <FlexRow $topMargin={'2'}>
                                    <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'2'}>
                                        <AppLabel>Active Customers</AppLabel>
                                        <AppText $textSize={'2.5'} $fontWeight={'700'} $topMargin={'-1'}>{moneyFormat(customersByActiveStatus?.data?.ActiveCustomers || 0)}</AppText>
                                        <AppSpan
                                            $color={(customersByActiveStatus?.data?.PercentageChangeActive ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                            $textSize={"1.5"}
                                            $fontWeight={"700"}
                                        >
                                            {(customersByActiveStatus?.data?.PercentageChangeActive ?? 0) >= 0 ? '+' : ''}
                                            {(customersByActiveStatus?.data?.PercentageChangeActive || 0).toFixed(1)}%
                                        </AppSpan>
                                    </CustomContainer>
                                    <CustomContainer $width={'0'} $height={'7.6'} style={{ border: '0.5px solid #E5E5E5' }} $rightMargin={'2'} />
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppLabel>Inactive Customers</AppLabel>
                                        <AppText $textSize={'2.5'} $fontWeight={'700'} $topMargin={'-1'}>{moneyFormat(customersByActiveStatus?.data?.InactiveCustomers || 0)}</AppText>
                                        <AppSpan
                                            $color={(customersByActiveStatus?.data?.PercentageChangeInactive ?? 0) >= 0 ? '#0D968F' : '#F90000'}
                                            $textSize={'1.5'} $fontWeight={'700'}
                                        >
                                            {(customersByActiveStatus?.data?.PercentageChangeInactive ?? 0) >= 0 ? '+' : ''}{(customersByActiveStatus?.data?.PercentageChangeInactive || 0)?.toFixed(1)}%
                                        </AppSpan>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                            <CustomContainer
                                $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'} $bgColor={'#ffffff'}
                                $radius={'0.8'} $topPadding={'2'} $minHeight={'18.6'} $topMargin={'1.5'}
                                className='customer-chart-stats-3-child'
                            >
                                <FlexRow
                                    $alignItems={'flex-start'} $justifyContent={'space-between'}
                                    $leftPadding={'2'} $rightPadding={'1'}
                                >
                                    <AppText $textSize={'1.5'} $fontWeight={'600'} $rightMargin={'1.5'}>
                                        Newly Onboarded Customer trend
                                    </AppText>
                                    <GridContainer
                                        $width={'13'} $height={'2.7'} $borderColor={'#A0A4A8'}
                                        $radius={'0.5'} $bgColor={'#ffffff'}
                                        $leftPadding={'0.8'} $rightPadding={'0.8'}
                                    >
                                        <FlexRow $width={'auto'} $sizeUnit={''}>
                                            <AppText $textSize={'1'} $rightMargin={'1'}>Last {period} Days</AppText>
                                            <AppSpan $textSize={'1'}><HiOutlineChevronDown /></AppSpan>
                                        </FlexRow>
                                    </GridContainer>
                                </FlexRow>
                                <FlexRow $leftPadding={'2'} $rightPadding={'1'} $wrap={'wrap'}>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1'}>{moneyFormat(customersByNewTrend?.data?.selected_period?.NewCustomers || 0)}</AppText>
                                    <AppSpan
                                        $color={(customersByNewTrend?.data?.selected_period?.PercentageChange ?? 0) ? '#0D968F' : '#F90000'}
                                        $textSize={'1.5'} $fontWeight={'700'}
                                    >
                                        {(customersByNewTrend?.data?.selected_period?.PercentageChange ?? 0) ? '+' : ''}{(customersByNewTrend?.data?.selected_period?.PercentageChange || 0)?.toFixed(1)}%
                                    </AppSpan>
                                </FlexRow>
                                <CustomContainer $rightPadding={"3"} $height={"7.5"}>
                                    <LineChart
                                        borderColor="#0D968F"
                                        data={customersByNewTrend?.data?.NewCustomers || []} //[23, 35, 50, 38, 35, 37, 70, 62, 45, 52, 60, 75]
                                        label={customersByNewTrend?.data?.Duration}
                                        initialColor='rgba(78, 165, 54, 0)'
                                        finalColor='rgba(78, 165, 54, 0.52)'
                                    />
                                </CustomContainer>
                            </CustomContainer>
                        </CustomContainer>
                    </FlexRow>
                </CustomContainer>
            </ScreenContainer>
        </>
    )
}