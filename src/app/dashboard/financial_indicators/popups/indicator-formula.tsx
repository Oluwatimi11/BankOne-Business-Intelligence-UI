import { SidePopupContainer, FlexColumn, CustomContainer, FlexRow, AppSpan, AppLabel, AppText, AbsoluteContainer, Circle, GridContainer } from "@/style"
import BackIcon from '@/assets/images/back-icon.svg'
import { RiCloseFill } from "react-icons/ri"
import Image from "next/image"

export const IndicatorFormula: React.FC<any> = ({ back, close }) => {
    return (
        <SidePopupContainer $zIndex={'8'} onClick={close} >
            <FlexColumn
                $width={'100'} $sizeUnit={'%'} $height={'100'} $hUnit={'%'}
            >
                <CustomContainer
                    $width={'70'} $sizeUnit={'%'} $height={'50'} $hUnit={'%'}
                    $bgColor={'#ffffff'} $radius={'0.8'} $padding={'3'} $overflow={'auto'}
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
                    <FlexRow $alignItems={'flex-start'} $wrap={'wrap'} $gap={'2'}>
                        <FlexRow
                            $width={'auto'} $sizeUnit={''}
                            $rightPadding={'1.5'}
                            style={{ borderRight: '1px solid #111111' }}
                            onClick={back}
                        >
                            <Image src={BackIcon} alt="Back Icon" width={24} height={24} />

                            <AppSpan $textSize={'1.5'} $leftMargin={'0.7'} $cursor={'pointer'}>Back</AppSpan>
                        </FlexRow>
                        <CustomContainer $width={'36.4'} $topMargin={'0.8'}>
                            <AppLabel $textSize={'2'} $fontWeight={'700'}>Lending limit Formular</AppLabel>
                            <AppText $color={'#5D5D5D'}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui faucibus vestibulum scelerisque
                            </AppText>
                        </CustomContainer>
                    </FlexRow>

                    <GridContainer $topMargin={'7'} >
                        <FlexRow $width={'auto'} $sizeUnit={''} $gap={'2'} $wrap={'wrap'} >
                            <AppLabel $textSize={'1.5'} $fontWeight={'700'} $rightMargin={'3'}>Individual Lending limit =</AppLabel>
                            <FlexRow $width={'auto'} $sizeUnit={''} $gap={'1.5'} $wrap={'wrap'}>
                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <AppText $textSize={'1.5'} $fontWeight={'700'} $width={'4.3'} $align={'center'}>1</AppText>
                                    <AppText
                                        $textSize={'1.5'} $fontWeight={'700'} $width={'4.3'}
                                        $align={'center'} style={{ borderTop: '1px solid #000000' }}
                                    >
                                        100
                                    </AppText>
                                </CustomContainer>
                                <AppText $textSize={'2.5'} $fontWeight={'700'}> * </AppText>
                                <CustomContainer $width={'auto'} $sizeUnit={''}>
                                    <AppText $textSize={'1.5'} $fontWeight={'700'}>Shareholder’s funds unimpaired by losses</AppText>
                                    <AppText
                                        $textSize={'1.5'} $fontWeight={'700'} $width={'31.5'}
                                        $align={'center'} style={{ borderTop: '1px solid #000000' }}
                                    >
                                        1
                                    </AppText>
                                </CustomContainer>
                            </FlexRow>
                        </FlexRow>
                    </GridContainer>

                    <AbsoluteContainer $bottom={'2.5'} $left={'4'} $right={'2'}>
                        <AppSpan $textSize={'1.2'} $color={'#5D5D5D'}>
                            Individual lending limit formular subject to change based on directives from CBN.
                        </AppSpan>
                    </AbsoluteContainer>
                </CustomContainer>
            </FlexColumn>
        </SidePopupContainer>
    )
}