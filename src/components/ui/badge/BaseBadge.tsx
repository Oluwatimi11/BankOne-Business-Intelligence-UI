import "./badge.css"
import {CSSProperties} from "react";

export type BaseBadgeProps =
    { title?: string, backgroundColor?: CSSProperties["backgroundColor"] }
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
const BaseBadge = ({title, ...props}: BaseBadgeProps) => {
    return (
        <div {...props} className={`baseBadge ${props?.className}`}
             style={{backgroundColor: props?.backgroundColor, ...props?.style}}>
            <p>
                {title}
            </p>
        </div>
    )
}
export default BaseBadge
