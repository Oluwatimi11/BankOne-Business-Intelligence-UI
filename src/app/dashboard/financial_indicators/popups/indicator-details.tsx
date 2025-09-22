"use client";
import Image from "next/image";
import { useState } from "react"
import { AbsoluteContainer, AppLabel, AppSpan, AppText, Circle, CustomContainer, FlexColumn, FlexRow, SidePopupContainer } from "@/style"
import { IoIosSettings } from 'react-icons/io'
import { RiCloseFill } from "react-icons/ri"
import WarningIcon from '@/assets/images/individual-lending-limit.svg'
import FailureIcon from '@/assets/images/corporate-lending-limit.svg'
import SuccessIcon from '@/assets/images/aggregate-exposure.svg'
import { IndicatorFormula } from "@/popup"


export const IndicatorDetails: React.FC<any> = ({ close }) => {
    const [navPosition, setNavPosition] = useState(0)
    const [showFormula, setShowFormula] = useState(false)

    const infoLabel = navPosition === 0 ? 'Individual Lending limit:' :
        navPosition === 23 ? 'Corporate or Group Lending limit:' : 'Aggregate Exposure:'
    const infoDescription = navPosition === 0 ? 'Lending limit to an individual should not exceed 1% (<1%) of shareholder’s funds unimpaired by losses.' :
        navPosition === 23 ? 'Lending limit to an Corporate or group should not exceed 5% (<5%) of shareholder’s funds unimpaired by losses.' :
            'Average exposure should not exceed 5% (<5%) of shareholder’s funds unimpaired by losses.'

    return (
        <>
            {!showFormula &&
                <SidePopupContainer $zIndex={'8'} onClick={close} >
                    <FlexColumn
                        $width={'100'} $sizeUnit={'%'} $height={'100'} $hUnit={'%'}
                    >
                        <CustomContainer
                            $width={'70'} $sizeUnit={'%'} $height={'70'} $hUnit={'%'}
                            $bgColor={'#ffffff'} $radius={'0.8'} $padding={'3'}
                            className="indicator-popup-container"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AbsoluteContainer $top={'2.5'} $right={'2'}>
                                <Circle $size={'4'} $bgColor={'#F8F8F8'} $leftMargin={'3'} onClick={close}>
                                    <AppSpan $textSize={'2.5'} $color={'#000000'} $hoverColor={'#E4405F'} $topMargin={'-0.3'}>
                                        <RiCloseFill />
                                    </AppSpan>
                                </Circle>
                            </AbsoluteContainer>
                            <CustomContainer $height={'100'} $hUnit={'%'} $overflow={'auto'}>
                                <FlexRow
                                    $justifyContent={'space-between'} $gap={'2'} $rightPadding={'5'}
                                    $wrap={'wrap'} $bottomMargin={'1.5'}
                                >
                                    <AppLabel $textSize={'2'} $fontWeight={'700'} $rightMargin={'3'}>Lending Limit</AppLabel>
                                    <FlexRow $width={'auto'} $sizeUnit={''} $gap={'2.5'} $wrap={'wrap'}>
                                        <AppSpan
                                            $fontWeight={'600'} style={{ fontStyle: 'italic' }} $cursor={'pointer'}
                                            onClick={() => setShowFormula(true)}
                                        >
                                            fx <AppSpan $fontWeight={'500'} $cursor={'pointer'} style={{ fontStyle: 'normal' }}>Formular</AppSpan>
                                        </AppSpan>
                                        <AppSpan $fontWeight={'500'} $cursor={'pointer'}><IoIosSettings style={{ fontSize: '1.7rem' }} /> Settings</AppSpan>
                                    </FlexRow>
                                </FlexRow>
                                <CustomContainer $width={'38'} $bottomMargin={'2'} className='customer-screen-note'>
                                    <AppSpan $color={'#5D5D5D'}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque
                                    </AppSpan>
                                </CustomContainer>

                                <CustomContainer className="info-view-nav-wrap" $bottomMargin={'4'}>
                                    <CustomContainer
                                        $height={'3.5'} $topMargin={'3'} $bottomMargin={'2'}
                                        $width={'76'} $radius={'0.8'} $overflow={'auto'}
                                        style={{ borderBottom: '1px solid #F4F4F4', display: 'inline-block' }}
                                    >
                                        <AbsoluteContainer $bottom={'0'} $left={`${navPosition}`}>
                                            <CustomContainer
                                                $bgColor={'#0D968F'} $width={navPosition === 23 ? '25.5' : '18.2'}
                                                $height={'0.3'} $radius={'0.6'}
                                            />
                                        </AbsoluteContainer>
                                        <FlexRow $gap={'6'}>
                                            <AppSpan
                                                $textSize={'1.5'}
                                                $color={navPosition === 0 ? '#111111' : '#5D5D5D'}
                                                $fontWeight={navPosition === 0 ? '700' : '400'}
                                                $cursor={'pointer'}
                                                onClick={() => setNavPosition(0)}
                                            >
                                                Individual Lending limit
                                            </AppSpan>
                                            <AppSpan
                                                $textSize={'1.5'}
                                                $color={navPosition === 23 ? '#111111' : '#5D5D5D'}
                                                $fontWeight={navPosition === 23 ? '700' : '400'}
                                                $cursor={'pointer'}
                                                onClick={() => setNavPosition(23)}
                                            >
                                                Corporate or Group Lending limit
                                            </AppSpan>
                                            <AppSpan
                                                $textSize={'1.5'}
                                                $color={navPosition === 52.5 ? '#111111' : '#5D5D5D'}
                                                $fontWeight={navPosition === 52.5 ? '700' : '400'}
                                                $cursor={'pointer'}
                                                onClick={() => setNavPosition(52.5)}
                                            >
                                                Aggregate Exposure
                                            </AppSpan>
                                        </FlexRow>
                                    </CustomContainer>
                                </CustomContainer>

                                <FlexRow $alignItems={'flex-start'} $gap={'2'} $wrap={'wrap'}>
                                    <AppSpan $textSize={'1.5'} $fontWeight={'700'}>{infoLabel}</AppSpan>
                                    <CustomContainer $width={'auto'} $sizeUnit={''}>
                                        <AppText
                                            $textSize={'1.5'} $color={'#5D5D5D'} $bottomPadding={'3'}
                                            style={{ borderBottom: '1px dashed #A0A4A8' }}
                                        >
                                            {infoDescription}
                                        </AppText>
                                        <FlexRow $width={'auto'} $sizeUnit={''} $gap={'3'} $topMargin={'5'} $wrap={'wrap'}>
                                            <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'4.5'}>
                                                <AppLabel $textSize={'1.5'} $color={'#5D5D5D'}>Shareholder’s funds unimpaired by losses</AppLabel>
                                                <AppText $textSize={'2.5'} $fontWeight={'700'}>N80,000,000,000</AppText>
                                            </CustomContainer>
                                            <CustomContainer $width={'auto'} $sizeUnit={''} $rightMargin={'4.5'}>
                                                <AppLabel $textSize={'1.5'} $color={'#5D5D5D'}>1% Lend Limit fund</AppLabel>
                                                <AppText $textSize={'2.5'} $fontWeight={'700'}>N800,000,000</AppText>
                                            </CustomContainer>
                                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                                <AppLabel $textSize={'1.5'} $color={'#5D5D5D'}>Amount over threshold</AppLabel>
                                                <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#FF9E2C'}>N200,000,000</AppText>
                                            </CustomContainer>
                                        </FlexRow>
                                        <FlexRow
                                            $width={'57.7'} $minHeight={'14'} $radius={'0.8'}
                                            $borderColor={navPosition === 0 ? '#FF9E2C' : navPosition == 23 ? '#F90000' : '#0D968F'}
                                            $bgColor={navPosition === 0 ? '#FFF1E1' : navPosition == 23 ? '#FFDFDF' : '#D9FFCE'}
                                            $padding={'2.5'} $topMargin={'4'}
                                            className="indicator-summary-container"
                                        >
                                            {navPosition === 0 ?
                                                <Image src={WarningIcon} alt="Warning Icon" width={24} height={24} />
                                                : navPosition === 23 ?
                                                    <Image src={FailureIcon} alt="Failure Icon" width={24} height={24} />

                                                    :
                                                    <Image src={SuccessIcon} alt="Success Icon" width={24} height={24} />

                                            }
                                            <CustomContainer $width={'auto'} $sizeUnit={''} $leftMargin={'1.5'}>
                                                <AppLabel $textSize={'1.5'} $fontWeight={'700'} $color={'#000000'}>10 Loans are on individual loan limit</AppLabel>
                                                <AppText $textSize={'1.5'} $color={'#5D5D5D'}>
                                                    10 Loans are on the 1% individual loan limit mark and urgent attention is need on them.
                                                </AppText>
                                            </CustomContainer>
                                        </FlexRow>
                                    </CustomContainer>
                                </FlexRow>
                            </CustomContainer>
                        </CustomContainer>
                    </FlexColumn>
                </SidePopupContainer>
            }
            {showFormula &&
                <IndicatorFormula
                    close={close}
                    back={() => setShowFormula(false)}
                />
            }
        </>
    )
}