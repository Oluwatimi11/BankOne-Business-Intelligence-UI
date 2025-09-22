'use client';
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisibilityContext from '@/provider/state-manager/visibilityProvider'
import AppInfoContext from '@/provider/state-manager/appInfoProvider'
import { AbsoluteContainer, CustomContainer, GridContainer, SideBarContainer, SideBarShadow } from "@/style"
import { sideBarData } from './sidebar-data'
import { SidebarMenu } from './sidebar-menu'
// import Logo from '@/assets/images/bankone-dashboard-logo.svg'
import SpiralImage from '@/assets/images/sidebar-spiral.svg'
import Logo from '@/assets/images/bi-logo-sm.svg'
import LogoutIcon from '@/assets/svg/logout-icon'

export const Sidebar: React.FC = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AppInfoContext)
    const { visibility, decisionBox, showSideBar } = useContext(VisibilityContext)
    const [isHover, setIsHover] = useState(false)

    async function handleLogout() {
        await logout()
        navigate('/login')
    }

    async function handleLogoutClick() {
        decisionBox.show(
            `Are you sure you want to log out?`,
            handleLogout,
            decisionBox.hide,
            `Yes, Logout`,
            'No'
        )
    }

    return (
        <>
            <SideBarShadow 
                $isSideBar={visibility.$isSideBar} 
                onClick={() => showSideBar(false)} 
            />
            <SideBarContainer $isSideBar={visibility.$isSideBar}>
                <AbsoluteContainer 
                    $bottom={'0'} 
                    $left={'0'}
                >
                    <SpiralImage />
                </AbsoluteContainer>

                <GridContainer 
                    style={{ zIndex: '2' }} 
                    $bottomMargin={'4'}
                >
                    <Logo className='logo' />
                    <CustomContainer 
                        $width={'13'} 
                        $borderColor={'#2E2E2F'} 
                        $topMargin={'2.5'} 
                        $bottomMargin={'3'} 
                    />
                    {sideBarData.map((menu, index) => (
                        <SidebarMenu item={menu} key={index} />
                    ))}
                </GridContainer>

                <AbsoluteContainer
                    $bottom={'2'} 
                    $left={'50'} 
                    $lSizeUnit={'%'}
                    className='logout-container'
                >
                    <LogoutIcon
                        className='icon-component'
                        isHover={isHover}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        onClick={handleLogoutClick}
                        style={{ cursor: 'pointer' }}
                    />
                </AbsoluteContainer>
            </SideBarContainer>
        </>
    )
}
