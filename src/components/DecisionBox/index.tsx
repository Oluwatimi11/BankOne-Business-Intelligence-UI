import { AppText, Button, FlexRow, GridContainer } from "@/style"
import DecisionBoxIcon from '@/assets/images/decision-box-icon.svg'
import { AppCenterPopup } from "@/components"

export const DecisionBox: React.FC<any> = ({
    yesMethod,
    noMethod,
    yesBtnText,
    noBtnTxt,
    message,
    height,
    width,
    close
}) => {

    function handleDecision(type: string) {
        if (type === 'yes' && yesMethod) yesMethod()
        else if (type === 'no' && noMethod) noMethod()
        if (close) close()
    }

    return (
        <AppCenterPopup
            $height={height || '22.5'}
            $width={width || '35'}
            $zIndex={'8'}
            $radius={'1.2'}
            close={close}
            noCancel
        >
            <GridContainer>
                <DecisionBoxIcon className="icon-component" />
                <AppText
                    $fontWeight={'400'}
                    $textSize={'1.6'}
                    $color={'#101828'}
                    $topMargin={'2'}
                    $align={'center'}
                >
                    {message}
                </AppText>
                <FlexRow
                    $justifyContent={'center'}
                    $topMargin={'3'}
                    $gap={'1.5'}
                    $wrap={'wrap'}
                >
                    <Button
                        $width={'auto'}
                        $sizeUnit={""}
                        $leftPadding={'1.5'}
                        $rightPadding={'1.5'}
                        $height={'4'}
                        $radius={'0.8'}
                        $bgColor={'#ffffff'}
                        $hoverBgColor={'#ffffff'}
                        $borderColor={'#D0D5DD'}
                        $color={'#344054'}
                        $hoverColor={'#0D968F'}
                        $fontWeight={"500"}
                        onClick={() => handleDecision('no')}
                    >
                        {noBtnTxt}
                    </Button>
                    <Button
                        $width={'auto'}
                        $sizeUnit={""}
                        $leftPadding={'1.5'}
                        $rightPadding={'1.5'}
                        $height={'4'}
                        $radius={'0.8'}
                        $hoverBgColor={'#ffffff'}
                        $borderColor={'#0D968F'}
                        $hoverColor={'#0D968F'}
                        $fontWeight={"500"}
                        onClick={() => handleDecision('yes')}
                    >
                        {yesBtnText}
                    </Button>
                </FlexRow>
            </GridContainer>
        </AppCenterPopup>
    )
}
