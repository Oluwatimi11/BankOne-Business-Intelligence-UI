import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { StyleProps } from '@/models'

export const SideBarLink = styled(NavLink)<StyleProps>`
   list-style: none;
   text-decoration: none !important;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding-right: 3rem;
   padding-top: 0.3rem;
   padding-bottom: 0.3rem;
   margin-bottom: 1rem;
   font-size: 1.5rem;
   transition: all 0.2s;
   color: ${({isclicked}) => !!isclicked ? '#fff' : '#667085'};
   background: ${({isclicked}) => !!isclicked ? '#0D968F' : 'default'};
   border-radius: ${({isclicked}) => !!isclicked ? '0.8rem' : 'none'};
   &:hover {
        background: #0D968F;
        color: #ffffff;
        border-radius: 0.8rem
    }
    &:hover div >i {
        color: #ffffff
    }
`
export const SideBarLinkWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: .5rem .5rem .5rem 1rem;
    transition: all 0.1s;
`
export const SideBarLabel = styled.span`
    margin-left: 0.8rem;
`
export const SideBarIcons = styled.i<StyleProps>`
    box-sizing: border-box;
    font-size: ${({size}) => size || 1.8}rem;
    margin-top: -0.5rem;
`