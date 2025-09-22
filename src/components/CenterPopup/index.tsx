import './style.scss'
import { CustomContainer, FixedContainer, GridContainer } from "@/style"

export const AppCenterPopup: React.FC<any> = ({
    width, height, bgColor, padding, radius, zIndex,
    overlayBgColor, shadow, className, close, children
}) => {

    return (
        <FixedContainer 
            $height={'full'} 
            $width={'100'} 
            $sizeUnit={'%'} 
            $top={'0'} 
            $left={'0'} 
            $zIndex={zIndex || '3'}
        >
            <GridContainer 
                $width={'100'} 
                $sizeUnit={'%'} 
                $height={'100'} 
                $hUnit={'%'} 
                $bgColor={overlayBgColor || 'rgba(0,0,0, 0.3)'}
                onClick={close}
            >
                <CustomContainer 
                    $width={width || '39'} 
                    $minHeight={height || '54.6'} 
                    $radius={radius || '2'} 
                    $bgColor={bgColor || '#ffffff'} 
                    $padding={padding || '2.5'} 
                    $overflow={'auto'}
                    $shadow={shadow || '0px 24px 56px rgba(0, 23, 69, 0.04)'}
                    className={`popup-main-container ${className}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </CustomContainer>
            </GridContainer>
        </FixedContainer>
    )
}
