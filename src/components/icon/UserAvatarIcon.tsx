import type {SVGProps} from 'react';

export default function UserAvatarIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}
                 className={`icon ${props.className}`}
    >
        <path fill="currentColor" d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5"></path>
        <path fill="currentColor"
              d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m7.993 22.926A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"></path>
    </svg>);
}
// import {SVGProps} from "react"
//
// const UserAvatarIcon = (props: SVGProps<SVGSVGElement>) => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width={64}
//         height={64}
//         fill="none"
//         {...props}
//         // className={`icon ${props.className}`}
//     >
//         <rect width={64} height={64} fill="#F2F4F7" rx={32}/>
//         <rect
//             width={63.25}
//             height={63.25}
//             x={0.375}
//             y={0.375}
//             stroke="#101828"
//             strokeWidth={0.75}
//             opacity={0.08}
//             rx={31.625}
//         />
//         <path
//             stroke="#475467"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2.667}
//             d="M42.667 44c0-1.86 0-2.791-.23-3.548a5.333 5.333 0 0 0-3.556-3.556c-.757-.23-1.687-.23-3.548-.23h-6.666c-1.861 0-2.792 0-3.549.23a5.334 5.334 0 0 0-3.555 3.556c-.23.757-.23 1.687-.23 3.548M38 26a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
//         />
//     </svg>
// )
// export default UserAvatarIcon
