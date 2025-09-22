import {SVGProps} from "react";

const LightningQuickIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
            {...props}
            className={`icon ${props.className}`}>
            <path
                fill="#EDFDF4"
                d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z"
            ></path>
            <path
                fill="#26BD6C"
                d="M16.667 14.666h4.666l-6 8.667v-6h-4.666l6-8.666v6z"
            ></path>
        </svg>
    );
}
export default LightningQuickIcon
