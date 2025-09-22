import {SVGProps} from "react"

const OutgoingCircledIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox="0 0 24 24"
        {...props}
        className={`icon ${props.className}`}>
        <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0m6 3 6-6"/>
            <path d="M11 9h4v4"/>
        </g>
    </svg>
)
export default OutgoingCircledIcon
