import type {SVGProps} from "react";

const TwitterNowXIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="33"
        fill="none"
        viewBox="0 0 36 33"
        {...props}
        className={`icon ${props.className}`}
    >
        <g clipPath="url(#clip0_9539_39583)">
            <path
                fill="currentColor"
                d="M28.462.662h5.405L22.062 14.245 36 32.662H25.049l-8.533-11.164-9.814 11.164H1.298l12.658-14.506L.586.662h11.236l7.751 10.24zm-1.92 28.73h2.987L10.187 3.72H6.916z"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_9539_39583">
                <path fill="#fff" d="M.587.662H36v32H.587z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default TwitterNowXIcon;
