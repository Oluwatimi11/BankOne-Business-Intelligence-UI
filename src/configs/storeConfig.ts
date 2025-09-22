"use client"

import { configureStore, Dispatch } from "@reduxjs/toolkit";
import { rootReducer } from "@/stores";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const persistConfig = {
    key: 'root',
    storage,
    // stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer,
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);


export type ThunkApiConfig = {
    state?: unknown
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch