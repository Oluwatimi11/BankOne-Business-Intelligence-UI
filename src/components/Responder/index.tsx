import './style.scss'
import { useContext } from "react"
import VisibilityContext from "@/provider/state-manager/visibilityProvider"
import { AbsoluteContainer, AppLabel, AppSpan, AppText, Button, Circle, CustomContainer, FixedContainer, FlexColumn, GridContainer, SidePopupContainer } from "@/style"
import { RiCloseFill } from 'react-icons/ri'


export const Responder: React.FC<any> = () => {
    const { visibility: { response }, responder } = useContext(VisibilityContext)

    function handleNav(method: any) {
        responder.hide()
        if (method) method()
    }

    return (
        <>
            {response.status &&
                <>
                    <SidePopupContainer $zIndex={'8'} onClick={() => responder.hide()} />
                    <FixedContainer
                        className="display-box-container"
                        $zIndex={'9'} $radius={'0.8'} $bgColor={'#ffffff'}
                        $topPadding={'1.5'}
                    >
                        <FlexColumn
                            $width={'70'} $minHeight={'42.6'} $padding={'2.5'}
                            $radius={'0.8'} $bgColor={'#ffffff'}
                            className='display-box-content'
                        >
                            <AbsoluteContainer $top={'0'} $right={'2'}>
                                <Circle $size={'4'} $bgColor={'#F8F8F8'} onClick={() => responder.hide()}>
                                    <AppSpan $textSize={'2.5'} $color={'#000000'} $hoverColor={'#E4405F'} $topMargin={'-0.3'}>
                                        <RiCloseFill />
                                    </AppSpan>
                                </Circle>
                            </AbsoluteContainer>
                            <GridContainer $width={'42'} className='display-box-text-wrapper'>
                                {response.icon}
                                <CustomContainer $topMargin={'3'}>
                                    <AppLabel
                                        $textSize={'2'} $fontWeight={'700'} $color={'#000000'} $align={'center'}
                                        style={{ display: 'block' }}>
                                        {response.title}
                                    </AppLabel>
                                    <CustomContainer
                                        $width={'90'} $sizeUnit={'%'} style={{ border: '1px dashed #C4C4C4', margin: '2rem auto' }}
                                    />
                                    <AppText $topMargin={'1.6'} $color={'#2C2C2C'} $align={'center'}>{response.text}</AppText>
                                </CustomContainer>
                                <Button
                                    $width={'22.4'} $borderColor={'#0D968F'} $height={'4.8'}
                                    $hoverBgColor={'#ffffff'} $hoverColor={'#2C2C2C'}
                                    $radius={'0.8'} $topMargin={'4'}
                                    onClick={() => handleNav(response?.btnMethod)}
                                >
                                    {response.btnText}
                                </Button>
                            </GridContainer>
                        </FlexColumn>
                    </FixedContainer>
                </>
            }
        </>
    )
}