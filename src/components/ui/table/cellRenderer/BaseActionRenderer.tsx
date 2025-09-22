"use client"

import {StringUtil} from "@/utilities/stringUtil";
import {ColDef, ICellRendererParams} from "ag-grid-community";

export type ClickableActionRendererProps = {
    title: string
    value: string;
    data?: any;
    onClick?: (data: any) => void
    path?: string
    isCurrency?: boolean,
    isDate?: boolean,
    statusIndicator?: "fail" | "success" | "normal"
} & ICellRendererParams & ColDef

export function BaseActionRenderer(baseActionRendererProps: ClickableActionRendererProps) {
    const greenBadgeText = ["active", "approved"]
    const redBadgeText = ["inactive", "rejected", "closed"]
    const yellowBadgeText = ["pending"]
    // const [value,] = useState(baseActionRendererProps?.isCurrency ? StringUtil.handleCurrencyFormatter(baseActionRendererProps?.value || "") : baseActionRendererProps?.value)
    const renderFormattedValue = (baseActionRendererProps: ClickableActionRendererProps) => {
        // if (TimeUtil.isValidDate(baseActionRendererProps.value) || baseActionRendererProps?.isDate) {
        //     return TimeUtil.formatDateString(baseActionRendererProps?.value)
        // }
        if (baseActionRendererProps?.isCurrency) {
            return StringUtil.formatCurrency(baseActionRendererProps?.value || "");
        }
        if (baseActionRendererProps?.colDef?.field?.toLowerCase() == "drcr") {
            const amount = parseFloat(baseActionRendererProps?.data?.amount ?? 0)
            if (amount < 0) {
                return "Reversed";
            }
            // return drCr === "dr" ? "cr" : drCr === "cr" ? "dr" : drCr;
            return StringUtil.convertToSentenceCase(baseActionRendererProps?.value);

        }
        return StringUtil.convertToSentenceCase(baseActionRendererProps?.value)
    }
    const value = renderFormattedValue(baseActionRendererProps)

    return (
        <div
            style={{
                display: 'flex',
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
                // backgroundColor: "white",

            }}
            onClick={() => {
                baseActionRendererProps?.onClick && baseActionRendererProps?.onClick(baseActionRendererProps?.data)
                // baseActionRendererProps?.path && (
                //     router.push(baseActionRendererProps?.path, {
                //         state: {
                //             ...baseActionRendererProps.data,
                //         }
                //     })
                // )
            }}
        >
            <div
                className={
                    `${greenBadgeText.includes(baseActionRendererProps?.value?.toString().toLowerCase()) ? "badge-active" : ""}
                     ${redBadgeText.includes(baseActionRendererProps?.value?.toString().toLowerCase()) ? "badge-inactive" : ""}
                     ${yellowBadgeText.includes(baseActionRendererProps?.value?.toString().toLowerCase()) ? "badge-pending" : ""}`
                }
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // // padding: 2
                }}
            >
                {
                    (baseActionRendererProps?.onClick || baseActionRendererProps?.onCellClicked || baseActionRendererProps?.path) ?
                        <a className="table1_link"
                           style={{textDecoration: baseActionRendererProps?.onCellClicked ? "underline" : ""}}>{value}</a>
                        :
                        <div>
                            {value}
                        </div>
                }
            </div>
        </div>
    );
}
