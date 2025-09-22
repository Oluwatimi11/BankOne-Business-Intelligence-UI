import type {SVGProps} from "react";

const NoteIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="none"
        viewBox="0 0 34 34"
        {...props}
        className={`icon ${props.className}`}
    >
        <path
            fill="currentColor"
            d="M28.667 33.667H5.333a5 5 0 0 1-5-5V2A1.667 1.667 0 0 1 2 .333h23.333A1.667 1.667 0 0 1 27 2v20h6.667v6.667a5 5 0 0 1-5 5M27 25.333v3.334a1.666 1.666 0 1 0 3.333 0v-3.334zm-3.333 5V3.667h-20v25a1.667 1.667 0 0 0 1.666 1.666zM7 8.667h13.333V12H7zm0 6.666h13.333v3.334H7zM7 22h8.333v3.333H7z"
        ></path>
    </svg>
);

export default NoteIcon;
