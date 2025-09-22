import type {SVGProps} from "react";

const SafeguardIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="37"
        fill="none"
        viewBox="0 0 35 37"
        {...props}
        className={`icon ${props.className}`}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.87"
            d="M2 13.96V3.435A1.435 1.435 0 0 1 3.435 2h28.703a1.435 1.435 0 0 1 1.435 1.435V13.96c0 15.071-12.792 20.065-15.346 20.911a1.35 1.35 0 0 1-.881 0C14.792 34.025 2 29.031 2 13.96"
        ></path>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.87"
            d="M25.68 12.046 15.154 22.092l-5.262-5.023"
        ></path>
    </svg>
);

export default SafeguardIcon;
