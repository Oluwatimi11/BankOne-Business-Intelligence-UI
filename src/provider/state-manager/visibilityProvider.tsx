"use client";
import React, {useReducer} from 'react'
import { Action, KeyValuePayload } from '@/models'

  
const VisibilityContext = React.createContext<any>(null)

const VisibilityReducer = (state: any, action: Action<KeyValuePayload>) => {
    switch(action.type){
        case "set-visibility": 
            return { ...state, [action.payload.key]: action.payload.value }
    }
}

export const VisibilityProvider = (props: any) => {
    const [state, dispatch] = useReducer(VisibilityReducer, {
        isLoading: false,
        notification: {status: false, message: '', title: '', type: 'success'},
        $isSideBar: false,
        selectedMenu: '/dashboard/home',
        isOnline: true,
        decision: {status: false, message: '', cancelBtnText: '', yesBtnText: '', yesMethod: null, noMethod: null},
        response: {status: false, title: '', text: '', icon: null, btnText: '', btnMethod: null},
    })

    async function loader (value: boolean) {
        await dispatch({type: "set-visibility", payload: {key: 'isLoading', value }})
    }

    async function showSideBar (value: boolean) {
        await dispatch({type: "set-visibility", payload: {key: '$isSideBar', value }})
    }

    const notifier = {
        show: async function (message: string, title = null, type?: string) {
            const messageType = type ? type.toLowerCase() : 'error'
            const messageTitle = title ? title : title === null ? (messageType === 'success' ? 'Success Response' : 'Error Response') : ''
            await dispatch({type: "set-visibility", payload: {key: 'notification', value: {status: message ? true : false, message, type: messageType, title: messageTitle}}})
        },
        hide: async function () {
            await dispatch({type: "set-visibility", payload: {key: 'notification', value: {status: false, message: state.notification.message, type: state.notification.type, title: state.notification.title}}})
        }
    }

    async function updateSelectedMenu (value: string) {
        await dispatch({type: "set-visibility", payload: {key: 'selectedMenu', value }})
        await localStorage.setItem('selectedMenu', value)
    }

    const decisionBox = {
        show: async function (message: string, yesMethod: any, noMethod: any, yesBtnText = 'Yes', cancelBtnText = 'Cancel') {
            await dispatch({type: "set-visibility", payload: {key: 'decision', value: {status: true, message, yesMethod, noMethod, yesBtnText, cancelBtnText} }})
        },
        hide: async function () {
            await dispatch({type: "set-visibility", payload: {key: 'decision', value: {...state.decision, status: false, }}})
        }
    }

    async function isConnected (value: boolean) {
        await dispatch({type: "set-visibility", payload: {key: 'isOnline', value }})
    }

    const responder = {
        show: async function (title: string, text: string, icon: any, btnText: string, btnMethod: any) {
            btnText = btnText || ''
            await dispatch({type: "set-visibility", payload: {key: 'response', value: {status: true, title, icon, text, btnText, btnMethod} }})
        },
        hide: async function () {
            await dispatch({type: "set-visibility", payload: {key: 'response', value: {status: false, text: '', icon: null, title: '', btnMethod: null, btnText: ''} }})
        }
    }
  

    const stateActions = {
        loader,
        showSideBar,
        notifier,
        updateSelectedMenu,
        decisionBox,
        isConnected,
        responder
    }

    return (
        <VisibilityContext.Provider value={{visibility: state, ...stateActions}} >
            {props.children}
        </VisibilityContext.Provider>
    )
}

export default VisibilityContext