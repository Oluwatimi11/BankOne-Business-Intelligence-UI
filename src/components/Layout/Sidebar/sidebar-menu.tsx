import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { 
    SideBarLinkWrapper, 
    SideBarLabel, 
} from './style'
import VisibilityContext from '@/provider/state-manager/visibilityProvider'
import './style.scss'

export const SidebarMenu: React.FC<any> = ({item}) => {
    const {showSideBar} = useContext(VisibilityContext) 

    const handleSideBarShow = async () => {
        if(window.matchMedia('(max-width: 770px)').matches) {
        await showSideBar(false)
        }

    }

    return (
        <NavLink
            to={item?.path}
            className={({ isActive }) => `default-menu ${isActive && 'active-menu'}`}
            onClick={handleSideBarShow}

        >
            <SideBarLinkWrapper className="nav-option" >
                {item.icon}
                <SideBarLabel>{item.title}</SideBarLabel>
            </SideBarLinkWrapper>
        </NavLink>
    )
}