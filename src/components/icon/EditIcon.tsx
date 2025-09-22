import type {SVGProps} from 'react';

export default function EditIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            viewBox="0 0 24 24"
            {...props}
            // className={`icon ${props.className}`}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            >
                <path d="M7 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-1"></path>
                <path d="M20.385 6.585a2.1 2.1 0 00-2.97-2.97L9 12v3h3zM16 5l3 3"></path>
            </g>
        </svg>
    );
}
