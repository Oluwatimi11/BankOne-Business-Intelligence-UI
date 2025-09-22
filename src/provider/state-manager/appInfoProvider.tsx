"use client";
import React, { useReducer } from 'react'
import { Action, KeyValuePayload } from '@/models'
import access from '@/utilities/localAccess'


const AppInfoContext = React.createContext<any>(null)
const initialState = {
    authToken: '', userData: {}, institutionCode: '',
    sso_token: '', sessionAliveTrigger: false
}

const AppInfoReducer = (state: any, action: Action<KeyValuePayload>) => {
    switch (action.type) {
        case "set-property":
            return { ...state, [action.payload.key]: action.payload.value }
        case 'clear-data':
            return { ...initialState }
    }
}

export const AppInfoProvider = (props: any) => {
    const [state, dispatch] = useReducer(AppInfoReducer, {
        ...initialState
    })

    async function setInfoProperty(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value))
        const isString = typeof (value) === 'string' ? true : false
        const isNumber = typeof (value) === 'number' ? true : false
        localStorage.setItem(key, isString ? value : isNumber ? String(value) : JSON.stringify(value))
        await dispatch({ type: "set-property", payload: { key, value } })
    }

    async function recoverAppData(data?: Array<string>) {
        for (const item of Object.keys(initialState)) {
            if (data?.length) {
                if (!data.includes(item)) continue
            }
            let retrievedData = await localStorage.getItem(item)!
            retrievedData = (['null', 'undefined', 'NaN'].includes(retrievedData) ? state[item] : ['number', 'string'].includes(typeof state[item]) ? retrievedData : JSON.parse(retrievedData))
            await setInfoProperty(item, typeof state[item] === 'number' ? Number(retrievedData) : retrievedData)
        }
    }

    async function clearAppData() {
        await dispatch({ type: "clear-data", payload: { key: '', value: '' } })
    }

    async function recoverStatesData() {
        await Promise.all([
            recoverAppData(),
        ])
    }

    async function logout() {
        await Promise.all([
            localStorage.clear(),
            clearAppData()
        ])

        if (access.getNavigationAccess()) access.getNavigationAccess()('/')
    }


    const stateActions = {
        setInfoProperty,
        recoverStatesData,
        clearAppData,
        logout
    }

    return (
        <AppInfoContext.Provider value={{ info: state, ...stateActions }} >
            {props.children}
        </AppInfoContext.Provider>
    )
}

export default AppInfoContext