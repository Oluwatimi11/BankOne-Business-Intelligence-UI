import {SVGProps} from "react"

const LightningIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        viewBox="0 0 24 24"
        {...props}
        className={`icon ${props.className}`}>
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 3v7h6l-8 11v-7H5z"
        />
    </svg>
)
export default LightningIcon
