'use client';

import {Provider} from 'react-redux';
import {store} from "@/configs/storeConfig";
import {ModalProvider} from "qore-components";

export function ReduxProvider({children}: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export function GlobalModalProvider({children}: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
}
