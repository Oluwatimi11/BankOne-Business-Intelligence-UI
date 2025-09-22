import type {SVGProps} from "react";

const FileFolderIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="none"
        viewBox="0 0 40 40"
        {...props}
        className={`icon ${props.className}`}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M18.333 35H6.667A1.667 1.667 0 0 1 5 33.333V16.667A1.666 1.666 0 0 1 6.667 15H15l3.333 3.333h15A1.666 1.666 0 0 1 35 20v1.667M25 31.667 28.333 35 35 28.333"
        ></path>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M28.333 5H10a1.667 1.667 0 0 0-1.667 1.667V15H15l3.333 3.333h13.334v-10zm0 0v3.333h3.334z"
        ></path>
    </svg>
);

export default FileFolderIcon;
