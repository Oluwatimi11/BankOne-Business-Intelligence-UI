import { moneyFormat } from "@/utilities/utility"
import { BsArrowUpShort, BsArrowUp, BsArrowDown, BsArrowDownShort } from "react-icons/bs"
import { AppLabel, AppSpan, AppText, CustomContainer, FlexRow } from "@/style"
import { SingleLiquidityByPerChannel } from "@/models"
import './style.scss'

export const TransactionStatistics: React.FC<any> = ({ inflow, outflow, liquidityOverview }) => {
    return (
        <CustomContainer
            className='horizontal-scroll-container netflow-wrapper'
            $topMargin={'3'}
        >
            <CustomContainer style={{ display: 'inline-block', overflow: 'auto' }}>
                <FlexRow style={{ minWidth: 'fit-content' }}>
                    <CustomContainer
                        $width={'35.5'} $height={'31'} $radius={'1.2'} $bgColor={'#ffffff'}
                        $padding={'1.5'} $topPadding={'2.5'} $rightMargin={'2'}
                        $shadow={'0px 5px 30px rgba(0, 0, 0, 0.1)'}
                    >
                        <AppLabel $textSize={'1.6'} $fontWeight={'700'} $color={'#5D5D5D'}>Net flow</AppLabel>
                        <AppText $textSize={'2.5'} $fontWeight={'700'}>N{moneyFormat(liquidityOverview?.NetFlow || 0)}</AppText>
                        <FlexRow $width={'auto'} $sizeUnit={''}>
                            {liquidityOverview.NetPercentageChange! >= 0 ?
                                <AppSpan $color={'#0D968F'} $textSize={'1.5'} $topMargin={'-0.3'} >
                                    <BsArrowUpShort />
                                </AppSpan>
                                :
                                <AppSpan $color={'#F90000'} $textSize={'1.5'} $topMargin={'-0.3'} >
                                    <BsArrowDownShort />
                                </AppSpan>
                            }
                            <AppSpan
                                $textSize={'1.6'} $fontWeight={'700'}
                                $color={liquidityOverview.NetPercentageChange! >= 0 ? '#0D968F' : '#F90000'}
                            >
                                {liquidityOverview.NetPercentageChange! >= 0 ? '+' : ''}{liquidityOverview?.NetPercentageChange?.toFixed(1) || 0}%
                            </AppSpan>
                        </FlexRow>
                    </CustomContainer>
                    <CustomContainer>
                        <FlexRow $width={'auto'} $sizeUnit={''}>
                            <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'5'}>
                                <AppLabel $textSize={'1.6'} $fontWeight={'500'} $color={'#5D5D5D'}>Inflow</AppLabel>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-end'}>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1.5'} $bottomMargin={'-0.3'}>N{moneyFormat(liquidityOverview?.TotalInflow || 0)}</AppText>
                                    <FlexRow >
                                        {liquidityOverview.InflowPercentageChange! >= 0 ?
                                            <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                            : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                        }
                                        <AppSpan
                                            $textSize={'1.6'} $fontWeight={'700'}
                                            $color={liquidityOverview.InflowPercentageChange! >= 0 ? '#0D968F' : '#F90000'}
                                        >
                                            {liquidityOverview.InflowPercentageChange! >= 0 ? '+' : ''}{liquidityOverview?.InflowPercentageChange?.toFixed(1) || 0}%
                                        </AppSpan>
                                    </FlexRow>
                                </FlexRow>
                                <AppSpan $color={'#5D5D5D'}>Compared to N5,100,000 Yesterday</AppSpan>
                            </CustomContainer>
                            <CustomContainer $height={'6.8'} $width={'0'} $rightMargin={'5'} style={{ border: '0.5px solid #000000' }} />
                            {
                                inflow?.map((item: SingleLiquidityByPerChannel, index: number) => {
                                    return (
                                        <CustomContainer
                                            $width={'auto'} $sizeUnit={''} $rightMargin={'5'}
                                            key={index}
                                        >
                                            <AppLabel $textSize={'1.6'} $fontWeight={'500'} $color={'#5D5D5D'}>{item.Channel}</AppLabel>
                                            <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-end'}>
                                                <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1.5'} $bottomMargin={'-0.3'}>N{moneyFormat(item.Amount || 0)}</AppText>
                                                <FlexRow >
                                                    {inflow.VolumePercentChange! >= 0 ?
                                                        <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                        : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                    }
                                                    <AppSpan
                                                        $textSize={'1.6'} $fontWeight={'700'}
                                                        $color={inflow.VolumePercentChange! >= 0 ? '#0D968F' : '#F90000'}
                                                    >
                                                        {inflow.VolumePercentChange! >= 0 ? '+' : ''}{inflow?.VolumePercentChange?.toFixed(1) || 0}%
                                                    </AppSpan>
                                                </FlexRow>
                                            </FlexRow>
                                            <AppSpan $color={'#5D5D5D'}>Compared to N4,900,000 Yesterday</AppSpan>
                                        </CustomContainer>
                                    )
                                })
                            }
                        </FlexRow>
                        <CustomContainer style={{ border: '1px dashed #C4C4C4' }} $topMargin={'4'} $bottomMargin={'4'} />
                        <FlexRow $width={'auto'} $sizeUnit={''}>
                            <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'5'}>
                                <AppLabel $textSize={'1.6'} $fontWeight={'500'} $color={'#5D5D5D'}>Outflow</AppLabel>
                                <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-end'}>
                                    <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1.5'} $bottomMargin={'-0.3'}>N{moneyFormat(liquidityOverview?.TotalOutflow || 0)}</AppText>
                                    <FlexRow >
                                        {liquidityOverview.OutflowPercentageChange! >= 0 ?
                                            <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                            : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                        }
                                        <AppSpan
                                            $textSize={'1.6'} $fontWeight={'700'}
                                            $color={liquidityOverview.OutflowPercentageChange! >= 0 ? '#0D968F' : '#F90000'}
                                        >
                                            {liquidityOverview.OutflowPercentageChange! >= 0 ? '+' : ''}{liquidityOverview?.OutflowPercentageChange?.toFixed(1) || 0}%
                                        </AppSpan>
                                    </FlexRow>
                                </FlexRow>
                                <AppSpan $color={'#5D5D5D'}>Compared to N5,100,000 Yesterday</AppSpan>
                            </CustomContainer>
                            <CustomContainer $height={'6.8'} $width={'0'} $rightMargin={'5'} style={{ border: '0.5px solid #000000' }} />
                            {
                                outflow?.map((item: SingleLiquidityByPerChannel, index: number) => {
                                    return (
                                        <CustomContainer
                                            $width={'auto'} $sizeUnit={''} $rightMargin={'5'}
                                            key={index}
                                        >
                                            <AppLabel $textSize={'1.6'} $fontWeight={'500'} $color={'#5D5D5D'}>{item.Channel}</AppLabel>
                                            <FlexRow $width={'auto'} $sizeUnit={''} $alignItems={'flex-end'}>
                                                <AppText $textSize={'2.5'} $fontWeight={'700'} $rightMargin={'1.5'} $bottomMargin={'-0.3'}>N{moneyFormat(item.Amount || 0)}</AppText>
                                                <FlexRow >
                                                    {outflow.VolumePercentChange! >= 0 ?
                                                        <AppSpan $color={'#0D968F'} $textSize={'1.2'}><BsArrowUp style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                        : <AppSpan $color={'#F90000'} $textSize={'1.2'}><BsArrowDown style={{ marginTop: '-0.5rem' }} /></AppSpan>
                                                    }
                                                    <AppSpan
                                                        $textSize={'1.6'} $fontWeight={'700'}
                                                        $color={outflow.VolumePercentChange! >= 0 ? '#0D968F' : '#F90000'}
                                                    >
                                                        {outflow.VolumePercentChange! >= 0 ? '+' : ''}{outflow?.VolumePercentChange?.toFixed(1) || 0}%
                                                    </AppSpan>
                                                </FlexRow>
                                            </FlexRow>
                                            <AppSpan $color={'#5D5D5D'}>Compared to N4,900,000 Yesterday</AppSpan>
                                        </CustomContainer>
                                    )
                                })
                            }
                        </FlexRow>
                    </CustomContainer>
                </FlexRow>
            </CustomContainer>
        </CustomContainer>
    )
}