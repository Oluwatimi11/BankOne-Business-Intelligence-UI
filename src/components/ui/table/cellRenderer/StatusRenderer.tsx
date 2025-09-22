import {StringUtil} from "@/utilities/stringUtil";

export type ClickableActionRendererProps = {
    title: string
    data: any,
    value: string
    onClick?: (data: any) => void
    path?: string
    isCurrency?: boolean,
    isDate?: boolean,
    statusIndicator?: "fail" | "success" | "normal"
}

export function StatusRenderer(statusRendererProps: ClickableActionRendererProps) {
    const greenText = ["active", "success"]
    const redText = ["rejected", "closed", "deleted"]
    const yellowText = ["pending", "inactive"]
    const value = statusRendererProps?.value?.toString().toLowerCase();

    const statusColor = {
        backgroundColor: greenText.includes(value) ? "var(--green--1)" : redText.includes(value) ? "var(--red--1)" : yellowText.includes(value) ? "var(--orange--1)" : "transparent",
        color: greenText.includes(value) ? "var(--green--4)" : redText.includes(value) ? "var(--red--4)" : yellowText.includes(value) ? "var(--orange--4)" : "var(--base-color-neutral--black)",
    }

    const handleClick = () => {
        statusRendererProps?.onClick && statusRendererProps?.onClick(statusRendererProps?.data)
        // statusRendererProps?.path && (
        //     navigate(statusRendererProps?.path, {
        //         state: {
        //             ...statusRendererProps.data,
        //         }
        //     })
        // )
    }

    return (
        <div
            onClick={handleClick}
            // className={
            //     `${greenText.includes(statusRendererProps?.value?.toString().toLowerCase()) ? "badge-active" : ""}
            //          ${redText.includes(statusRendererProps?.value?.toString().toLowerCase()) ? "badge-inactive" : ""}
            //          ${yellowText.includes(statusRendererProps?.value?.toString().toLowerCase()) ? "badge-pending" : ""}`
            // }
            // className={"baseBadge"}
            style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <p style={{
                maxWidth: "100%", width: "max-content", textAlign: "center",
                backgroundColor: statusColor?.backgroundColor,
                color: statusColor?.color,
                borderRadius: ".5em",
                // height: "1em",
                lineHeight: "1em",
                padding: ".25em .5em"
            }}>
                {StringUtil.convertToSentenceCase(statusRendererProps?.value?.toString())}
            </p>
        </div>
    );
}
