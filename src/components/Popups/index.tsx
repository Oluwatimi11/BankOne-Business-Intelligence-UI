import React, { useContext } from 'react'
import { DecisionBox, Loader, Notifier, Responder } from '@/components'
import VisibilityContext from '@/provider/state-manager/visibilityProvider'

export const PopUps: React.FC<any> = () => {
    const { visibility: {isLoading, decision} } = useContext(VisibilityContext)

    return (
        <>
            { isLoading ? <Loader /> : null }
            <Notifier />
            <Responder />
            { decision.status &&
                <DecisionBox 
                    yesBtnText={decision.yesBtnText}
                    noBtnTxt={decision.cancelBtnText}
                    message={decision.message}
                    yesMethod={decision.yesMethod}
                    close={decision.noMethod} 
                />
            }
        </>
    )
}