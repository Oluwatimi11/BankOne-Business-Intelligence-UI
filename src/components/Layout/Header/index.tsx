"use client";
import './style.scss'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"
import { visibilityStore } from "@/stores/visibilityStore"
import { RootState } from "@/stores"
import { AbsoluteContainer, AppLabel, AppSpan, AppText, Circle, CustomContainer, FixedContainer, FlexRow, GridContainer, Icon, MenuIcon } from "@/style"
import { HiOutlineChevronDown } from 'react-icons/hi'
import { FiBell } from 'react-icons/fi'
import ProfilePics from '@/assets/images/profile-pics.svg'
import utility from '@/utilities/utility'
import { AppDispatch } from '@/configs/storeConfig'

export const Header = () => {
    const pathname = usePathname();
    const dispatch: AppDispatch = useDispatch()

    const isSideBarOpen = useSelector((state: RootState) => state.visibility.isSideBarOpen)
    const { firstName, lastName } = useSelector((state: RootState) => state.appInfo.userData)

    const [title, setTitle] = useState('Dashboard')

    useEffect(() => {
        setTitle(utility.getPageTitle(pathname))
    }, [pathname])
    console.log("title", title);

    return (
        <>
            <MenuIcon
                $isSideBar={isSideBarOpen}
                onClick={() => dispatch(visibilityStore.action.toggleSideBar())}
            />
            <FixedContainer
                $width={"78"}
                $sizeUnit={"%"}
                $zIndex={"3"}
            >
                <GridContainer
                    $height={"6.9"}
                    $bgColor={"#ffffff"}
                    $leftPadding={"2.5"}
                    $rightPadding={'2.5'}
                    className='header-grid'
                >
                    <FlexRow $justifyContent={'space-between'} className='header-content-wrapper'>
                        <AppLabel
                            $textSize={'2.5'}
                            $fontWeight={'600'}
                            $color={'#000000'}
                            className='page-label'
                        >
                            {title === 'Home' ? 'Home' : title === 'Fin indicators' ? 'Financial Indicators' : title}
                        </AppLabel>
                        <FlexRow
                            $width={'30'}
                            $height={'5'}
                            $radius={'0.8'}
                            $bgColor={'#111111'}
                            $leftPadding={'1.5'}
                            $rightPadding={'1.5'}
                            className='header-info-bar'
                        >
                            <AppSpan $color={'#ffffff'} $textSize={'2.5'}>
                                <FiBell />
                            </AppSpan>
                            <AbsoluteContainer $top={'1'} $left={'2.5'}>
                                <Circle
                                    $size={'2.2'}
                                    $bgColor={'#F90000'}
                                    $borderColor={'#ffffff'}
                                >
                                    <AppSpan
                                        $textSize={'1.2'}
                                        $fontWeight={'700'}
                                        $color={'#ffffff'}
                                    >
                                        24
                                    </AppSpan>
                                </Circle>
                            </AbsoluteContainer>
                            <CustomContainer
                                $width={'0'}
                                $height={'3.2'}
                                $borderColor={'#5D5D5D'}
                                $leftMargin={'4'}
                            />
                            <Circle
                                $size={'3'}
                                $leftMargin={'2.5'}
                                $bgColor={'#0D968F'}
                            >
                                <AppText
                                    $color={'#ffffff'}
                                    $fontWeight={'600'}
                                    $textSize={'1.6'}
                                >
                                    {firstName?.[0]}{lastName?.[0]}
                                </AppText>
                            </Circle>
                            <FlexRow $width={'auto'} $sizeUnit={''} $leftMargin={'1'}>
                                <AppText
                                    $cursor={'pointer'}
                                    $textSize={'1.6'}
                                    $color={'#FFFFFF'}
                                    $width={'12'}
                                    style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                                >
                                    {firstName} {lastName}
                                </AppText>
                                <AppSpan
                                    $cursor={'pointer'}
                                    $leftPadding={'0.5'}
                                    $color={'#ffffff'}
                                    $textSize={'2'}
                                >
                                    <HiOutlineChevronDown />
                                </AppSpan>
                            </FlexRow>
                        </FlexRow>
                        <FlexRow $width={'auto'} $sizeUnit={''} className='header-user-dp-mobile'>
                            <Circle $size={'6'} $leftMargin={'2.5'}>
                                <Icon src={ProfilePics} />
                            </Circle>
                        </FlexRow>
                    </FlexRow>
                </GridContainer>
            </FixedContainer>
        </>
    )
}
