import "./container.css"

type BaseContainer = {
    children: React.ReactNode
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const BaseContainer = ({children, ...props}: BaseContainer) => {
    return (
        <div className={`base-container ${props.className}`} {...props}>
            {children}
        </div>
    )
}

export default BaseContainer
