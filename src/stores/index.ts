

import { combineReducers } from "@reduxjs/toolkit";
import { baseStore } from "@/stores/baseStore";
import { modalStore } from "@/stores/modalStore";
import { baseTableStore } from "@/stores/baseTableStore";
import { accountsStore } from "@/stores/accountsStore";
import { customersStore } from "@/stores/customersStore";
import { fixedDepositsStore } from "@/stores/fixedDepositsStore";
import { liquidityStore } from "@/stores/liquidityStore";
import { loansStore } from "@/stores/loansStore";
import { profitLossStore } from "@/stores/profitLossStore";
import { visibilityStore } from "@/stores/visibilityStore";
import { appInfoStore } from "@/stores/appInfoStore";


export const rootReducer = combineReducers({
    accounts: accountsStore.reducer,
    customers: customersStore.reducer,
    fixedDeposits: fixedDepositsStore.reducer,
    liquidity: liquidityStore.reducer,
    loans: loansStore.reducer,
    profitLoss: profitLossStore.reducer,
    visibility: visibilityStore.reducer,
    appInfo: appInfoStore.reducer,

    baseTable: baseTableStore.reducer,
    modal: modalStore.reducer,
    base: baseStore.reducer,
    // auth: auth.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;
