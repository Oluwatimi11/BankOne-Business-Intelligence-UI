import {ICellRendererParams} from "ag-grid-community";
import {TimeUtil} from "@/utilities/timeUtil";

export type DateCellRendererProps = ICellRendererParams & {
    title: string
    data: any,
    value: string
    onClick?: (data: any) => void
    path?: string
}

export function DateCellRenderer(dateCellRendererProps: DateCellRendererProps) {
    const {formattedTime, formattedDate} = TimeUtil.getFormatDateTime(dateCellRendererProps?.value);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "column",
                // width: "100%",
                // height: "100%",
                // alignItems: "center",
                // justifyContent: "center",
                cursor: "pointer",
                // backgroundColor: "red",
                // gap: "10px",
                // flex: 1

            }}
            onClick={() => {
                dateCellRendererProps?.onClick && dateCellRendererProps?.onClick(dateCellRendererProps?.data)
            }}
        >
            {/*{TimeUtil.formatDateString(dateCellRendererProps?.value)}*/}
            {formattedDate && formattedTime && <p>{formattedDate}:{formattedTime}</p>}
            {formattedDate && !formattedTime && <p>{formattedDate}</p>}
            {!formattedDate && formattedTime && <p>{formattedTime}</p>}
            {/*{formattedDate && !formattedTime && <p style={{fontSize: "6px"}}>{formattedTime}</p>}*/}
        </div>
    );
}
