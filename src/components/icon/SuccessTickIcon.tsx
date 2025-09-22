import {SVGProps} from "react";

const SuccessTickIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            {...props}
            className={`icon ${props.className}`}>
            <circle cx="10" cy="10" r="10" fill="#26BD6C"></circle>
            <path
                fill="#fff"
                d="M9 11.586l4.596-4.597.707.707L9 13 5.818 9.818l.707-.707L9 11.586z"
            ></path>
        </svg>
    );
}

export default SuccessTickIcon
