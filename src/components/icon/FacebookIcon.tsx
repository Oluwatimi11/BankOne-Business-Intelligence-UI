import type {SVGProps} from "react";

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        fill="none"
        viewBox="0 0 33 33"
        {...props}
        className={`icon ${props.className}`}
    >
        <g clipPath="url(#clip0_9539_39574)">
            <path
                fill="currentColor"
                d="M32.679 16.662c0-8.836-7.164-16-16-16s-16 7.164-16 16c0 7.986 5.85 14.606 13.5 15.806v-11.18h-4.062v-4.626h4.062v-3.525c0-4.01 2.389-6.225 6.043-6.225 1.75 0 3.582.313 3.582.313v3.937h-2.018c-1.987 0-2.607 1.234-2.607 2.499v3.001h4.438l-.71 4.625H19.18v11.181c7.649-1.2 13.5-7.82 13.5-15.806"
            ></path>
            <path
                fill="#fff"
                d="m22.907 21.287.71-4.625h-4.438v-3.001c0-1.265.62-2.499 2.607-2.499h2.018V7.225s-1.831-.313-3.582-.313c-3.654 0-6.043 2.215-6.043 6.225v3.525h-4.062v4.625h4.062v11.181a16.1 16.1 0 0 0 5 0v-11.18z"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_9539_39574">
                <path fill="#fff" d="M.679.662h32v32h-32z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default FacebookIcon;
