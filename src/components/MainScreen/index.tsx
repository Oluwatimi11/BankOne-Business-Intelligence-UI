import './style.scss'
import { AppLabel, AppText, CustomContainer, FixedContainer, FlexColumn, FlexRow, GridContainer, ScreenContainer } from '@/style'
import { MainBgImage } from '@/components'
// import BankoneLogoWhite from '@/assets/images/bankone-logo-black-white.svg'
import LogoWhite from '@/assets/images/bi-logo-white.svg'
// import AppzoneLogo from '@/assets/images/appzone-logo.svg'
// import BankoneLogo from '@/assets/images/bankone-logo.svg'
import Logo from '@/assets/images/bi-logo-lg.svg'

export const MainScreen: React.FC<any> = ({ children, formTitle, formNote }) => {
    return (
        <ScreenContainer $topPadding={'5'} $bottomPadding={'5'} $bgColor={'#111111'}>
            <MainBgImage />
            <CustomContainer $height={'100'} $hUnit={'%'} style={{ zIndex: '2' }} >
                <FixedContainer $top={'3'} $left={'3'}>
                    <LogoWhite className='icon-component' />
                </FixedContainer>
                {/* <FixedContainer bottom='3' left='3'>
                    <Icon src={AppzoneLogo} />
                </FixedContainer> */}
                <FlexRow
                    $height={'100'} $hUnit={'%'} $topPadding={'3'}
                    $bottomPadding={'3'} $gap={'1'}
                    className='login-content-container'
                >
                    <GridContainer
                        $width={'45'} $sizeUnit={'%'} $minHeight={'100'} $mnHUnit={'%'}
                        $leftPadding={'2'} $rightPadding={'1'}
                        className='app-description-container'
                    >
                        <CustomContainer $width={'43.5'} className='app-description'>
                            <AppText $textSize={'1.6'} $color={'#ffffff'} $bottomMargin={'3'}>Welcome to</AppText>
                            <Logo />
                            {/* <AppText textSize='2.5' color='#ffffff' topMargin='1.5' bottomMargin="1.5">
                                Business Intelligence Dashboard
                            </AppText> */}
                            <CustomContainer
                                $width={'23.1'} $height={'0'} $topMargin={'2.5'}
                                style={{ border: '1px dashed #0D968F' }}
                            />
                            <AppText $textSize={'1.6'} $color={'#ffffff'} $topMargin={'3'}>
                                Get real-time insights, track performance, and make informed decisions, all in one place.
                                Stay ahead with data that drives your business forward.
                            </AppText>
                        </CustomContainer>
                    </GridContainer>
                    <FlexColumn
                        $width={'55'} $sizeUnit={'%'} $minHeight={'100'} $mnHUnit={'%'}
                        $alignItems={'flex-start'} $leftPadding={'2'} $rightPadding={'2'}
                        className='login-form-container'
                    >
                        <FlexColumn
                            $width={'61.3'} $height={'68.3'} $radius={'0.8'} $alignItems={'flex-start'}
                            $bgColor={'#ffffff'} $padding={'7'} $topPadding={'5'} $bottomPadding={'5'}
                            $shadow={'0px 10px 50px rgba(0, 0, 0, 0.7)'}
                            className='login-form-content-container'
                        >
                            <CustomContainer $width={'80'} $sizeUnit={'%'} $bottomMargin={'4'}>
                                <AppLabel $textSize={'3.9'} $fontWeight={'700'} $color={'#000000'}>{formTitle}</AppLabel>
                                <AppText $textSize={'1.6'} $color={'#2C2C2C'}>
                                    {formNote}
                                </AppText>
                            </CustomContainer>
                            {children}
                        </FlexColumn>
                    </FlexColumn>
                </FlexRow>
            </CustomContainer>
        </ScreenContainer>
    )
}