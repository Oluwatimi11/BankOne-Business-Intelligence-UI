import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseTableIdEnum} from "@/utilities/enums/baseTableIdEnum";

export type BaseTableState = {
    [tableId in BaseTableIdEnum]: {
        serverCurrentPage: number;
        serverPageSize: number;
        totalPages?: number;
        totalItems?: number;
        persistedTableData?: any[];
    };
}

const initialState: Partial<BaseTableState> = {};

const slice = createSlice({
    name: 'baseTableStore',
    initialState,
    reducers: {
        setTableState(state, action: PayloadAction<{
            tableId: BaseTableIdEnum;
            serverCurrentPage: number;
            serverPageSize: number;
            totalPages?: number;
            totalItems?: number;
            persistedTableData?: any[];
        }>) {
            const {tableId, ...tableState} = action.payload;
            state[tableId] = tableState;
        },
        reset: () => ({...initialState}),
    },
});

const action = {}

export const baseTableStore = {
    reducer: slice.reducer,
    action: action,
    mutation: slice.actions,
};
