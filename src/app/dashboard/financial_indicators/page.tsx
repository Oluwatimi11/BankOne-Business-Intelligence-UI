"use client";
import './style.scss'
import { useState } from 'react'
import utility from "../../../utilities/utility"
import { AppSpan, AppText, CustomContainer, FlexRow, ScreenContainer } from "../../../style"
import { IndicatorDetails } from '../../../popup'
import Image from 'next/image';

export default function FinancialIndicator() {
    const [isIndicatorDetails, setIsIndicatorDetails] = useState(false)

    return (
        <>
            <ScreenContainer $padding={'2.5'}>
                <CustomContainer>
                    <CustomContainer $width={'38'} $bottomMargin={'2'} className='customer-screen-note'>
                        <AppSpan $textSize={'1.5'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo nullam vel tristique est diam nibh.
                        </AppSpan>
                    </CustomContainer>
                    <FlexRow $gap={'1.5'} $alignItems={'stretch'} $wrap={'wrap'} $topMargin={'5'}>
                        {
                            utility.finIndicatorsData?.map((item: any, index: number) => {
                                return (
                                    <CustomContainer
                                        $padding={'1.8'} $width={'30.6'} $minHeight={'14.5'} key={index}
                                        $borderColor={'#E0E0E0'} $bgColor={'#ffffff'} $radius={'0.4'}
                                        className='fin-indicators-item'
                                        onClick={() => setIsIndicatorDetails(true)}
                                    >
                                        <FlexRow $bottomMargin={'1.5'}>
                                            <Image src={item.icon} alt="Warning Icon" width={24} height={24} margin-right={5} />

                                            {/* <Icon src={item.icon} $minWidth={'auto'} $rightMargin={'1.5'} /> */}
                                            <AppText $fontWeight={'700'} $color={'#000000'} $leftMargin={'1.5'}>{item.title}</AppText>
                                        </FlexRow>
                                        <AppSpan $color={'#5D5D5D'}>{item.description}</AppSpan>
                                    </CustomContainer>
                                )
                            })
                        }
                    </FlexRow>
                </CustomContainer>
            </ScreenContainer>

            {isIndicatorDetails &&
                <IndicatorDetails
                    close={() => setIsIndicatorDetails(false)}
                />
            }
        </>
    )
}