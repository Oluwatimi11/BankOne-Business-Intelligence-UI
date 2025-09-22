import {Table, TableProps} from "qore-components";
import {BaseResponse} from "@/utilities/types";

export type BaseTableType = TableProps
const BaseTable = (props: BaseTableType) => {

    const onDataFetchSuccess: BaseTableType["onDataFetchSuccess"] = (response: BaseResponse) => {
        console.log("response: ", response);
        if (response.isSuccessful) return response?.data;
        return []
    }
    const handleError = (err: any) => {
        console.error("API error:", err);
    };

    return (
        <Table {...props} onDataFetchError={handleError} onDataFetchSuccess={onDataFetchSuccess} showAllFields={false}/>
    )
}

export default BaseTable

// "use client"
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css";
// import "./table.css"
// import {CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from "react";
// import {AgGridReact} from "ag-grid-react"; // Optional Theme applied to the Data Grid
// import {ColDef} from "ag-grid-community";
// import {BaseActionRenderer} from "./cellRenderer/BaseActionRenderer";
// import {StringUtil} from "@/utilities/stringUtil";
// import BaseTablePaginationPanel from "@/components/ui/table/tablePanels/BaseTablePaginationPanel";
// import {ModernSelect, ModernSelectOption, ModernSelectProps} from "@/components/ui/select/ModernSelect";
// import SearchIcon from "@/components/icon/SearchIcon";
// import BaseInput from "@/components/ui/input/BaseInput";
// import RefreshAltIcon from "@/components/icon/RefreshAltIcon";
// import IconButton from "@/components/ui/button/IconButton";
// import StatusIndicator, {StatusIndicatorProps} from "@/components/custom/StatusIndicator";
// import {useFormik} from "formik";
// import {BaseSelect, BaseSelectOption, BaseSelectProps} from "@/components/ui/select/BaseSelect";
// import {BaseButtonProps} from "@/components/ui/button/BaseButton";
// import {BaseResponse, Formik} from "@/utilities/types";
// import {EditActionRenderer} from "@/components/ui/table/cellRenderer/EditActionRenderer";
// import {ViewActionRenderer} from "@/components/ui/table/cellRenderer/ViewActionRenderer";
// import {TimeUtil} from "@/utilities/timeUtil";
// import RowOptionsActionRenderer from "@/components/ui/table/cellRenderer/RowOptionsActionRenderer";
// import {DateCellRenderer} from "@/components/ui/table/cellRenderer/DateCellRenderer";
// import moment from "moment";
// import {useFirstRender} from "@/utilities/hooks/useFirstRender";
// import {useDispatch} from "react-redux";
// import {baseTableStore} from "@/stores/baseTableStore";
// import {BaseTableIdEnum} from "@/utilities/enums/baseTableIdEnum";
// import CustomTableActionRenderer from "@/components/ui/table/components/CustomTableActionRenderer";
// import {StatusRenderer} from "@/components/ui/table/cellRenderer/StatusRenderer";
// import {saveAs} from "file-saver";
// import * as XLSX from 'xlsx';
// import {BaseUtil} from "@/utilities/baseUtil";
//
// export type FieldType = ColDef & {
//     label: string,
//     key: string,
//     className?: string,
//     style?: React.CSSProperties,
//     onClick?: (data: any) => void
//     path?: string
//     isCurrency?: boolean
//     isDate?: boolean,
//     statusIndicator?: "fail" | "success" | "normal",
//     hide?: boolean
// }
// export type CustomTableActionBaseButtonProps = BaseButtonProps & { actionType: "baseButton" };
// export type CustomTableActionBaseSelectProps = BaseSelectProps<Formik> & { actionType: "baseSelect" };
// export type CustomTableActionModernSelectProps = ModernSelectProps & { actionType: "modernSelect" };
// export type CustomTableActions = (CustomTableActionBaseButtonProps | CustomTableActionModernSelectProps | CustomTableActionBaseSelectProps)
//
// export type BaseTableType = {
//     title: string,
//     tableId: BaseTableIdEnum,
//     fields?: FieldType[],
//     items?: object[],
//     showAllFields?: boolean,
//     itemIdKey: string,
//     selectable?: boolean,
//     loading?: boolean,
//     refreshPage?: (pageNo: number, pageSize: number) => Promise<BaseResponse>
//     tableActions?: {
//         general?: {
//             export?: boolean,
//             exportSelectProps?: Partial<ModernSelectProps>
//             dateFilter?: boolean,
//         },
//         custom?: CustomTableActions[]
//     }
//     colActions?: {
//         view?: boolean
//         edit?: boolean
//         subscribe?: boolean
//         close?: boolean
//         add?: boolean
//         rowOptions: boolean
//     },
//     customColActions?: ColDef[];
//     rowOptions?: { optionName: string, onClick: (data: any) => void; optionStyle?: CSSProperties }[]
//     mainDateColumnFilterKey?: string;
//     navigateOnActionClick?: {
//         view?: string,
//         edit?: string
//         subscribe?: string
//         close?: string
//         add?: string
//         rowOptions?: string
//     };
// }
//
// export default function BaseTable(baseTableType: BaseTableType) {
//     const gridRef = useRef<AgGridReact>(null);
//     const dispatch = useDispatch();
//     // const baseTableState = useSelector((state: RootState) => state.baseTable);
//     const [pageNo, setPageNo] = useState<number>(0);
//     const [maxPage, setMaxPage] = useState<number>(0);
//     const [tableIsLoading, setTableIsLoading] = useState(false)
//     const globalItems = useMemo(() => {
//         if (baseTableType?.items) {
//             return baseTableType?.items
//         }
//         return []
//     }, [baseTableType?.items])
//     const [rowData, setRowData] = useState(globalItems);
//     // const [rowData, setRowData] = useState<any[]>(baseTableState[baseTableType?.tableId]?.persistedTableData || []);
//     const [numRow, setNumRow] = useState<number>(rowData?.length);
//     const isFirstRender = useFirstRender();
//     const [dataColumnKeysOptions, setDataColumnKeysOptions] = useState<{ label: string, value: string }[]>([]);
//     const dataColumnKeys: { label: string, value: string }[] = useMemo(() => {
//         return [{label: "Date Field", value: ""}]
//     }, [rowData])
//
//     const isInternalUpdateRef = useRef(!!baseTableType?.refreshPage);
//     const activeRefreshCallsRef = useRef(baseTableType?.refreshPage ? 1 : 0);
//
//     const tableActions: BaseTableType["tableActions"] = {
//         general: {
//             export: baseTableType?.tableActions?.general?.export ?? true,
//             dateFilter: baseTableType?.tableActions?.general?.dateFilter ?? true,
//             exportSelectProps: baseTableType?.tableActions?.general?.exportSelectProps
//         },
//         custom: baseTableType?.tableActions?.custom
//     }
//
//     const formik = useFormik({
//         initialValues: {
//             search: "",
//             pageSize: 10,
//             dateFilter: "",
//             mainDateColumnFilterKey: "",
//             serverPageNo: 1
//         },
//         onSubmit: () => {
//         }
//     })
//     // const baseColFields: FieldType[] = useMemo(() => {
//     //     console.log("baseColFields rowData: ", rowData?.length > 0 && Object.entries(rowData[0]), "baseTableType?.fields: ", baseTableType?.fields)
//     //     return rowData && rowData.length > 0 ? Object.entries(rowData[0]).map(([key,]) => {
//     //         const customField = baseTableType?.fields?.find(customField => customField.key === key);
//     //         // console.log("customField", customField)
//     //         return {
//     //             key: key,
//     //             label: key,
//     //             hide: !customField?.key,
//     //             ...customField
//     //         };
//     //     }) : []
//     // }, [rowData])
//     const baseColFields: FieldType[] = useMemo(() => {
//         if (!rowData || rowData.length === 0) {
//             return baseTableType?.fields || []; // Fallback to static fields if no data
//         }
//
//         // Convert rowData keys to a Set for O(1) lookups
//         const rowDataKeys = new Set(Object.keys(rowData[0]));
//
//         // Ensure fields from `baseTableType?.fields` are respected
//         const orderedFields = baseTableType?.fields?.map(field => ({
//             ...field,
//             hide: field.hide ?? !rowDataKeys.has(field.key), // Hide fields not present in rowData
//         })) || [];
//         const showAllFields = baseTableType?.showAllFields ?? false;
//         if (showAllFields) {
//             const additionalFields = Array.from(rowDataKeys)
//                 .filter(key => !baseTableType?.fields?.some(field => field.key === key))
//                 .map(key => ({
//                     key,
//                     label: key,
//                     hide: false,
//                 }));
//             return [...orderedFields, ...additionalFields]; // Combine ordered and additional fields
//         }
//         return [...orderedFields]; // Combine ordered and additional fields
//     }, [rowData, baseTableType?.fields]);
//     const colDefConfig: any = useMemo(() => {
//         if (!baseColFields) return [];
//         // console.log("setting baseColFields", baseColFields)
//         const cols: ColDef[] = baseColFields?.map((tableField) => {
//             // @ts-ignore
//             if (TimeUtil.isValidDate(baseTableType && rowData && rowData[0] ? rowData[0][tableField.key] as string : "")) {
//                 dataColumnKeys.push({
//                     label: StringUtil.convertToSentenceCase(tableField.label),
//                     value: tableField.key
//                 })
//                 return {
//                     field: tableField?.key,
//                     filter: 'agDateColumnFilter',
//                     filterParams: {
//                         filterOptions: ['inRange'],
//                         inRangeInclusive: true,
//                         comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
//                             const cellDate = moment(cellValue);
//                             const filterDate = moment(filterLocalDateAtMidnight);
//                             if (!cellDate.isValid()) return -1;
//                             if (cellDate.isSame(filterDate, 'day')) return 0;
//                             if (cellDate.isBefore(filterDate, 'day')) return -1;
//                             if (cellDate.isAfter(filterDate, 'day')) return 1;
//                             return 0;
//                         },
//                         valueFormatter: (params: any) => moment(params.value).format('YYYY-MM-DD HH:mm:ss'),
//                         browserDatePicker: true,
//                         closeOnApply: true,
//                         buttons: ['apply', 'reset', "cancel"],
//                         defaultOption: "inRange",
//                         // filterOptions: ["inRange"],
//                         maxNumConditions: 1
//                     },
//                     cellRenderer: DateCellRenderer,
//                     cellRendererParams: {
//                         onClick: tableField?.onClick,
//                         path: tableField?.path,
//                         isCurrency: tableField?.isCurrency,
//                         isDate: tableField?.isDate
//                     },
//                     headerName: StringUtil.convertToSentenceCase(tableField?.label),
//                     flex: 1,
//                     hide: tableField?.hide,
//                     // minWidth: 150,
//                     ...tableField
//                 };
//             }
//
//             if (tableField?.key === "statusIndicator") {
//                 return {
//                     field: tableField.key,
//                     headerName: StringUtil.convertToSentenceCase(tableField.label),
//                     cellRenderer: (params: any) => {
//                         const status = params?.value || "success";
//                         let indicatorStatus: StatusIndicatorProps["status"];
//                         if (status === "success") {
//                             indicatorStatus = "success";
//                         } else if (status === "error") {
//                             indicatorStatus = "error";
//                         } else {
//                             indicatorStatus = "pending";
//                         }
//                         return <div style={{display: "flex", alignItems: "center", height: "100%"}}>
//                             <StatusIndicator status={indicatorStatus}/></div>;
//                     },
//                     filter: false,
//                     hide: tableField?.hide,
//                     flex: 1,
//                     ...tableField
//                 };
//             }
//             if (tableField?.key?.toLowerCase().includes("status")) {
//                 return {
//                     field: tableField.key,
//                     headerName: StringUtil.convertToSentenceCase(tableField.label),
//                     cellRenderer: StatusRenderer,
//                     filter: true,
//                     hide: tableField?.hide,
//                     flex: 1,
//                     ...tableField
//                 };
//             }
//             return {
//                 field: tableField?.key,
//                 filter: true,
//                 filterParams: {
//                     // filterOptions: ['inRange'],
//                     // inRangeInclusive: true,
//                     // browserDatePicker: true,
//                     closeOnApply: true,
//                     buttons: ['apply', 'reset', "cancel"],
//                     // defaultOption: "inRange",
//                     // filterOptions: ["inRange"],
//                     maxNumConditions: 1
//                 },
//                 headerName: StringUtil.convertToSentenceCase(tableField?.label),
//                 cellRenderer: BaseActionRenderer,
//                 cellRendererParams: {
//                     onClick: tableField?.onClick,
//                     path: tableField?.path,
//                     isCurrency: tableField?.isCurrency,
//                     isDate: tableField?.isDate,
//                     onCellClicked: tableField?.onCellClicked
//                 },
//                 valueGetter: (params) => {
//                     const value = params.data[params.colDef.field as any];
//
//                     if (params.colDef.field?.toLowerCase() === "drcr") {
//                         const amount = parseFloat(params.data?.amount ?? 0);
//                         if (amount < 0) return "Reversed";
//                     }
//
//                     return StringUtil.convertToSentenceCase(value);
//                 },
//                 // valueGetter: (params) => {
//                 //     // Extract searchable text from the raw data
//                 //     const data = params.data;
//                 //     // Concatenate all relevant fields into a searchable string
//                 //     return `${data}`;
//                 // }
//                 flex: 1,
//                 hide: tableField?.hide,
//                 // minWidth: 150,
//                 ...tableField
//             };
//         })
//         // Add action columns based on colActions
//         if (baseTableType?.colActions?.edit) {
//             cols.push({
//                 headerName: "Action",
//                 field: "action",
//                 pinned: "right",
//                 filter: false,
//                 minWidth: 100,
//                 cellRenderer: EditActionRenderer,
//                 cellRendererParams: {
//                     title: baseTableType?.title,
//                     path: baseTableType?.navigateOnActionClick?.edit,
//                 },
//                 flex: 1
//             });
//         }
//
//         if (baseTableType?.colActions?.view) {
//             cols.push({
//                 headerName: "",
//                 field: "action",
//                 filter: false,
//                 minWidth: 100,
//                 cellRenderer: ViewActionRenderer,
//                 cellRendererParams: {
//                     title: baseTableType?.title
//                 },
//                 flex: 0.2
//             });
//         }
//         if (baseTableType?.rowOptions) {
//             cols.push({
//                 headerName: "",
//                 field: "action",
//                 pinned: "right",
//                 filter: false,
//                 minWidth: 10,
//                 cellRenderer: RowOptionsActionRenderer,
//                 cellRendererParams: {
//                     title: baseTableType?.title,
//                     rowOptions: baseTableType?.rowOptions,
//                     referenceElement: gridRef?.current
//                 },
//                 flex: 0.2,
//             });
//         }
//         if (baseTableType?.customColActions) {
//             cols.push(...baseTableType.customColActions);
//         }
//         return cols
//     }, [rowData, baseColFields, baseTableType?.colActions, baseTableType?.title, baseTableType?.navigateOnActionClick, baseTableType?.rowOptions]);
//
//     const clearAllDateFilters = useCallback(() => {
//         if (gridRef.current && gridRef.current.api) {
//             const filterModel = gridRef.current.api.getFilterModel();
//             Object.keys(filterModel).forEach(key => {
//                 if (filterModel[key].filterType === 'date') {
//                     delete filterModel[key];
//                 }
//             });
//             gridRef.current.api.setFilterModel(filterModel);
//         }
//     }, []);
//
//     //  function to close existing filter and open the new one
//     const openCustomFilter = () => {
//         // console.log("openCustomFilter", formik.values.mainDateColumnFilterKey);
//         if (gridRef.current && formik.values.mainDateColumnFilterKey) {
//             // Clear all previous filters
//             gridRef.current.api.onFilterChanged();
//
//             // Open the new filter after clearing
//             setTimeout(() => {
//                 gridRef.current!.api.showColumnFilter(formik.values.mainDateColumnFilterKey);
//             }, 0);
//         }
//     }
//
//     const dateFilterSelectOptions: BaseSelectOption[] = [{label: "Date filter", value: ""}].concat([
//         {label: "Today", value: "Today"},
//         {label: "Last 7 days", value: "Last 7 days"},
//         {label: "This Month", value: "This Month"},
//         {label: "Last Month", value: "Last Month"},
//         {label: "All Time", value: "All Time"},
//         {label: "Custom", value: "custom"},
//     ]);
//
//     const defaultColDef: ColDef = useMemo(() => {
//         return {
//             editable: false,
//             filter: false,
//             minWidth: 200,
//             // enableCellChangeFlash: true,
//         };
//     }, []);
//
//     const paginationPageSizeSelector = useMemo(() => {
//         return [10, 20, 50, 100];
//     }, []);
//
//     const handleOnDateFilterSelect = useCallback((filterValue: string) => {
//         clearAllDateFilters()
//         if (!gridRef.current || !formik.values.mainDateColumnFilterKey) return;
//
//         let dateFrom: moment.Moment | null = null;
//         let dateTo: moment.Moment | null = null;
//
//         switch (filterValue) {
//             case 'Today':
//                 dateFrom = moment().startOf('day');
//                 dateTo = moment().endOf('day');
//                 break;
//             case 'Last 7 days':
//                 dateFrom = moment().subtract(6, 'days').startOf('day');
//                 dateTo = moment().endOf('day');
//                 break;
//             case 'This Month':
//                 dateFrom = moment().startOf('month');
//                 dateTo = moment().endOf('month');
//                 break;
//             case 'Last Month':
//                 dateFrom = moment().subtract(1, 'month').startOf('month');
//                 dateTo = moment().subtract(1, 'month').endOf('month');
//                 break;
//             case 'All Time':
//                 dateFrom = null;
//                 dateTo = null;
//                 break;
//             case 'custom':
//                 openCustomFilter();
//                 return;
//             default:
//                 return;
//         }
//
//         const filterModel = gridRef.current.api.getFilterModel();
//         filterModel[formik.values.mainDateColumnFilterKey] = {
//             filterType: 'date',
//             type: 'inRange',
//             dateFrom: dateFrom?.toISOString(true),
//             dateTo: dateTo?.toISOString(true),
//         };
//         gridRef.current.api.setFilterModel(filterModel);
//     }, [formik.values.mainDateColumnFilterKey]);
//
//     const onFilterTextBoxChanged = useCallback(() => {
//         gridRef.current!.api.setGridOption(
//             "quickFilterText",
//             (document.getElementById("filter-text-box") as HTMLInputElement).value,
//         );
//     }, []);
//
//     const exportSelectOptions: ModernSelectOption[] = [
//         {label: "Export CSV", value: "CSV", onClick: () => onBtnExport("CSV")},
//         {label: "Export Xlsx", value: "EXCEL", onClick: () => onBtnExport("EXCEL")},
//     ]
//
//     const downloadExcel = () => {
//         const currentRowData: any[] = [];
//         gridRef.current!.api.forEachNode(function (node) {
//             currentRowData.push(node.data);
//         });
//         const worksheet = XLSX.utils.json_to_sheet(currentRowData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//         const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
//         const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
//         saveAs(blob, `${baseTableType.title}Information.xlsx`);
//     };
//
//     const onBtnExport = useCallback((type: "CSV" | "EXCEL") => {
//         if (type == "EXCEL") {
//             downloadExcel()
//         } else {
//             gridRef.current!.api.exportDataAsCsv({
//                 columnSeparator: ",",
//                 fileName: `${baseTableType?.title}.${"csv"}`
//             });
//
//         }
//     }, []);
//
//     const onPaginationChanged = useCallback(() => {
//         // console.log("onPaginationPageLoaded");
//         // Workaround for bug in events order
//         if (gridRef.current!.api!) {
//             // console.log("pagination ref loaded");
//             setMaxPage(gridRef.current!.api.paginationGetTotalPages());
//             setPageNo(gridRef?.current!.api?.paginationGetCurrentPage());
//             formik.setValues((prevState) => {
//                 return ({
//                     ...prevState,
//                     pageSize: gridRef.current!.api.paginationGetPageSize(),
//                     serverPageNo: gridRef?.current!.api?.paginationGetCurrentPage() + 1
//                 })
//             })
//             setNumRow(gridRef.current!.api.getDisplayedRowCount());
//         }
//     }, []);
//
//     const handlePrevPageClick = () => {
//         // console.log("current page", pageNo, "maxPage: ", maxPage)
//         if (pageNo > 0) {
//             gridRef?.current!.api?.paginationGoToPreviousPage()
//         }
//     }
//
//     const handleNextPageClick = () => {
//         if (pageNo >= 0 && (pageNo < gridRef.current!.api.paginationGetTotalPages())) {
//             gridRef?.current!.api?.paginationGoToNextPage()
//         }
//     }
//
//     const handleGoToPage = (page: number) => {
//         gridRef.current!.api?.paginationGoToPage(page);
//     }
//
//     const incrementRefreshCalls = () => {
//         activeRefreshCallsRef.current += 1;
//     };
//
//     const decrementRefreshCalls = () => {
//         if (activeRefreshCallsRef.current > 0) {
//             activeRefreshCallsRef.current -= 1;
//         }
//         if (activeRefreshCallsRef.current === 0) {
//             isInternalUpdateRef.current = false;
//         }
//     };
//
//     const handleRefreshTableData = useCallback(async (pageNo = 1, pageSize = 100) => {
//         if (baseTableType?.refreshPage) {
//             // Mark this update as internal
//             isInternalUpdateRef.current = true;
//             incrementRefreshCalls(); // Safe increment
//             try {
//                 const response = await baseTableType?.refreshPage(pageNo, pageSize);
//                 // if (response?.responseCode === BaseEnum.RESPONSE_CODE_SUCCESS) {
//                 if (BaseUtil.isResponseSuccessful(response)) {
//                     if (gridRef.current && gridRef.current.api) {
//                         // Collect current row data in one pass
//                         const existingRowData: any[] = [];
//                         const existingIds = new Set();
//                         gridRef.current.api.forEachNode((node) => {
//                             existingRowData.push(node.data);
//                             existingIds.add(node.data[baseTableType.itemIdKey]);
//                         });
//                         // console.log("globalItems, rowData, existingRowData: ", globalItems, rowData, existingRowData)
//
//                         // if the data returned from the first page is empty array then the whole table data is empty.
//                         if (pageNo == 1 && (Array.isArray(response?.data) && response?.data?.length <= 0)) {
//                             // set the table to empty array
//                             gridRef.current!.api.applyTransactionAsync({
//                                 remove: existingRowData,
//                             });
//
//                             dispatch(baseTableStore.mutation.setTableState({
//                                 tableId: baseTableType?.tableId,
//                                 serverPageSize: pageSize,
//                                 serverCurrentPage: pageNo,
//                                 persistedTableData: []
//                             }));
//                             return
//                         }
//                         // if the data returned from other pages apart from the first page, then there's no need adding the
//
//                         // Identify new and updated records in a single pass
//                         const newRecords = [];
//                         const updatedRecords = [];
//
//                         for (const record of response.data) {
//                             if (existingIds.has(record[baseTableType.itemIdKey])) {
//                                 updatedRecords.push(record);
//                             } else {
//                                 newRecords.push(record);
//                             }
//                         }
//
//                         // console.log("existingRowData count:", existingRowData.length);
//                         // console.log("New records:", newRecords.length);
//                         // console.log("Updated records:", updatedRecords.length);
//
//                         if (newRecords.length > 0) {
//                             // console.log("applyTransaction for newRecords:", newRecords.length);
//                             gridRef.current.api.applyTransactionAsync({add: newRecords});
//                         }
//
//                         if (updatedRecords.length > 0) {
//                             // console.log("applyTransaction for updatedRecords:", updatedRecords.length);
//                             gridRef.current.api.applyTransactionAsync({update: updatedRecords});
//                         }
//
//                         const currentRowData: any[] = [];
//                         gridRef.current!.api.forEachNode(function (node) {
//                             currentRowData.push(node.data);
//                         });
//                         // console.log("existingRowData", existingRowData, "currentRowData", currentRowData)
//                         dispatch(baseTableStore.mutation.setTableState({
//                             tableId: baseTableType?.tableId,
//                             serverPageSize: pageSize,
//                             serverCurrentPage: pageNo,
//                             persistedTableData: currentRowData,
//                             // persistedTableData: []
//                         }));
//                     }
//                 }
//             } finally {
//                 decrementRefreshCalls(); // Safe decrement
//                 // console.log("handleRefreshTableDataFINALLY activeRefreshCallsRef", activeRefreshCallsRef.current, "isInternalUpdateRef ", isInternalUpdateRef?.current)
//             }
//         }
//     }, [baseTableType?.refreshPage]);
//
//     // Effect for external updates to baseTableType.items
//     useEffect(() => {
//         // Only update rowData if the change is external
//         // console.log("isInternalUpdateRef.current", isInternalUpdateRef.current, "activeRefreshCallsRef.current ", activeRefreshCallsRef.current)
//         if (!isInternalUpdateRef.current) {
//             // console.log("setting row data from baseTable?.items since it wasn't internal update " + globalItems?.length)
//             setRowData(globalItems);
//         }
//         dispatch(baseTableStore.mutation.setTableState({
//             tableId: baseTableType?.tableId,
//             serverPageSize: formik.values.pageSize,
//             serverCurrentPage: formik.values.serverPageNo,
//             persistedTableData: globalItems,
//             // persistedTableData: response?.data || currentRowData
//             // persistedTableData: []
//         }));
//         // Reset isInternalUpdate only when no refreshes are pending
//         if (activeRefreshCallsRef.current === 0) {
//             isInternalUpdateRef.current = false;
//         }
//     }, [globalItems]);
//
//     useEffect(() => {
//         if (isFirstRender) {
//             console.log("in base table isFirstRender", isFirstRender)
//             if (baseTableType?.refreshPage) {
//                 // console.log("CALLING FIRST RENDER API")
//                 if (rowData?.length <= 0) {
//                     setTableIsLoading(true);
//                 }
//                 baseTableType?.refreshPage(formik?.values?.serverPageNo, 1000).then((response) => {
//                     setTableIsLoading(false)
//                     // isInternalUpdateRef.current = true;
//                     // activeRefreshCallsRef.current += 1;
//                     // console.log("THEN HAS RUN")
//                     if (BaseUtil.isResponseSuccessful(response)) {
//                         // const existingTableData = baseTableState[baseTableType?.tableId]?.persistedTableData || [];
//                         // const existingTableData = baseTableType?.items || [];
//                         const existingTableData: never[] = [];
//                         const responseData = response?.data || [];
//                         const combinedTableData = [...existingTableData, ...responseData];
//                         // Use Map to filter out duplicate invoices (by invoiceId) and keep the most updated one
//                         const uniqueTableData = Array.from(
//                             new Map(combinedTableData.map(tableData => [tableData[baseTableType?.itemIdKey], tableData])).values()
//                         );
//                         // console.log("setting rowData from first render", uniqueTableData?.length)
//                         setRowData(uniqueTableData);
//                         // handleRefreshTableData(formik?.values?.serverPageNo + 1, formik?.values?.pageSize)
//                     }
//
//                 }).finally(() => {
//                     // console.log("FINALLY HAS RUN")
//                     decrementRefreshCalls()
//                     // console.log("activeRefreshCallsRef.current", activeRefreshCallsRef.current)
//                 })
//             }
//         }
//         if (!isFirstRender && gridRef?.current && gridRef?.current!.api?.paginationGetCurrentPage() >= gridRef.current?.api?.paginationGetTotalPages() - 1) {
//             // console.log("next page clicked ", formik?.values?.serverPageNo)
//             handleRefreshTableData(formik?.values?.serverPageNo + 1, formik?.values?.pageSize)
//         }
//     }, [formik?.values?.serverPageNo]);
//
//     useEffect(() => {
//         // // console.log("dataColumnKeys", dataColumnKeys)
//         setDataColumnKeysOptions([...new Set(dataColumnKeys)])
//     }, [dataColumnKeys]);
//
//     useEffect(() => {
//         // // console.log(formik.values.dateFilter, formik.values.mainDateColumnFilterKey)
//         handleOnDateFilterSelect(formik.values.dateFilter)
//     }, [formik.values.dateFilter, formik.values.mainDateColumnFilterKey]);
//
//     return (
//         <div style={{
//             position: "relative",
//             width: "100%",
//             height: "100%",
//         }}>
//             <div
//                 style={{
//                     fontSize: ".800rem",
//                     fontWeight: "400",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "30px",
//                 }} // the Data Grid will fill the size of the parent container
//             >
//                 <div style={{gap: "1rem", display: "flex", flexDirection: "column",}}>
//                     <div className=""
//                          style={{
//                              display: "flex",
//                              alignItems: "center",
//                              justifyContent: "space-between",
//                          }}>
//                         <div style={{
//                             display: "flex",
//                             alignItems: "flex-end", gap: "10px",
//                             width: "100%",
//                         }}>
//                             <BaseInput
//                                 name={"search"}
//                                 formik={formik}
//                                 inputProps={{
//                                     id: "filter-text-box",
//                                     type: "text",
//                                     onInput: onFilterTextBoxChanged,
//                                     placeholder: "Search"
//                                 }} startIcon={SearchIcon}
//                                 inputContainerStyle={{backgroundColor: "white"}}
//                                 containerStyle={{maxWidth: "300px"}}/>
//                             <p>{numRow} results</p>
//                         </div>
//                         <div style={{
//                             display: "flex",
//                             gap: "10px",
//                             alignItems: "center",
//                             width: "100%",
//                             justifyContent: "flex-end",
//                         }}>
//                             <div style={{
//                                 display: "flex",
//                                 gap: "10px",
//                                 alignItems: "center",
//                                 flexWrap: "wrap",
//                                 // backgroundColor: "red",
//                                 justifyContent: "flex-end",
//                             }}>
//                                 {tableActions?.custom?.map((customAction, index) => {
//                                     return (<CustomTableActionRenderer key={index} {...customAction} />)
//                                 })}
//                                 {tableActions?.general?.export &&
//                                     <ModernSelect theme={"dark"}
//                                                   selectOptions={exportSelectOptions} size={"small"}
//                                                   placeholderLabel={"Export"} {...tableActions?.general?.exportSelectProps}
//                                     />}
//                             </div>
//                             {baseTableType?.refreshPage &&
//                                 <IconButton icon={RefreshAltIcon} onClick={() => {
//                                     handleRefreshTableData(formik?.values?.serverPageNo, formik?.values?.pageSize).then(() => {
//                                         handleRefreshTableData(formik?.values?.serverPageNo + 1, formik?.values?.pageSize)
//                                     })
//                                 }}
//                                             style={{
//                                                 backgroundColor: "white",
//                                                 color: "black",
//                                                 border: "1px solid var(--gray--3)",
//                                                 // padding: ".25em 1em"
//                                             }}/>}
//                         </div>
//                     </div>
//
//                     <div style={{display: "flex", alignItems: "center", gap: "10px",}}>
//                         {tableActions?.general?.dateFilter && dataColumnKeysOptions?.length > 0 && <div style={{
//                             display: "flex",
//                             alignItems: "center", gap: "10px",
//                         }}>
//                             <BaseSelect name={"dateFilter"} formik={formik} selectOptions={dateFilterSelectOptions}/>
//                             <BaseSelect name={"mainDateColumnFilterKey"} formik={formik}
//                                         selectOptions={dataColumnKeysOptions}/>
//                         </div>}
//                         <div
//                             style={{
//                                 display: "flex",
//                                 gap: "10px",
//                                 alignItems: "center",
//                             }}>
//                             <p style={{width: "100%"}}>Per Page</p>
//                             <BaseSelect formik={formik} name={"pageSize"} size={"small"} selectInputProps={{
//                                 onChange: (e) => {
//                                     formik.setFieldValue("pageSize", parseInt(e.target?.value))
//                                 }
//                             }}
//                                         selectOptions={[
//                                             {label: "5", value: 5},
//                                             {label: "10", value: 10},
//                                             {label: "30", value: 30},
//                                             {label: "50", value: 50},
//                                             {label: "100", value: 100},
//                                         ]}/>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div
//                     className="ag-theme-quartz" // applying the Data Grid theme
//                     style={{height: "max-content", backgroundColor: "transparent",}}>
//                     <AgGridReact
//                         autoSizeStrategy={{type: 'fitCellContents'}}
//                         ref={gridRef}
//                         rowData={rowData}
//                         containerStyle={{
//                             height: `${(40 * Math.min(rowData?.length, Number(formik.values.pageSize))) + 45}px`, //(rowHeight * visiblePageSize) + headerHeight
//                             maxHeight: "500px",
//                             minHeight: "250px",
//                             overflow: "auto"
//                         }}
//                         // ensureDomOrder={true}
//                         // popupParent={document.body}
//                         getRowId={(params) => params.data[baseTableType?.itemIdKey]?.toString()}
//                         columnDefs={colDefConfig}
//                         defaultColDef={defaultColDef}
//                         pagination={true}
//                         paginationPageSize={Number(formik.values.pageSize)}
//                         paginateChildRows={true}
//                         paginationPageSizeSelector={paginationPageSizeSelector}
//                         rowHeight={40}
//                         headerHeight={45}
//                         onPaginationChanged={onPaginationChanged}
//                         suppressPaginationPanel={true}
//                         // suppressColumnVirtualisation={true}
//                         rowSelection={'multiple'}
//                         rowGroupPanelShow={'always'}
//                         serverSideInitialRowCount={10}
//                         loading={tableIsLoading}
//                         alwaysShowHorizontalScroll={false}
//                         alwaysShowVerticalScroll={false}
//                         overlayNoRowsTemplate="<span class='no-rows-overlay'>No rows to display</span>"
//                         domLayout={"normal"}
//                         // domLayout={"autoHeight"}
//                     />
//                 </div>
//                 {rowData?.length > 0 && <BaseTablePaginationPanel handlePrevPageClick={handlePrevPageClick}
//                                                                   handleGoToPage={handleGoToPage}
//                                                                   handleNextPageClick={handleNextPageClick}
//                                                                   currentPage={pageNo}
//                                                                   numberOfPages={maxPage}/>}
//
//             </div>
//         </div>
//     )
// }
