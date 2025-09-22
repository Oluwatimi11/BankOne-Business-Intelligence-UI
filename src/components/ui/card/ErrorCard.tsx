export type ErrorCardProps = {
    message?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const ErrorCard = ({message = "Error", ...props}: ErrorCardProps) => {
    return <div  {...props} style={{
        width: "100%",
        height: "max-content",
        padding: ".5rem 1rem",
        backgroundColor: "var(--red--1)",
        fontSize: ".875rem",
        color: "var(--red--3)",
        textAlign: "center",
        ...props.style
    }}>{message}</div>
}

export default ErrorCard
