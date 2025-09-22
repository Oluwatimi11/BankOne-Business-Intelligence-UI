export type StatusIndicatorProps = {
    status: "pending" | "success" | "error"
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const StatusIndicator = ({status = "pending"}: StatusIndicatorProps) => {
    const statusIndicatorBg = status == "pending" ? "var(--gray--3)" : status == "success" ? "var(--green--3)" : "var(--red--3)"
    return (
        <div style={{width: ".5rem", height: ".5rem", borderRadius: "50%", backgroundColor: statusIndicatorBg}}></div>)
}
export default StatusIndicator
