import {SVGProps} from 'react';

export default function CloseIcon({animated, ...props}: SVGProps<SVGSVGElement> & { animated?: boolean }) {
    return (animated ?
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
             className={`icon ${props.className}`}>
            <path fill="none" stroke="currentColor" strokeDasharray={12} strokeDashoffset={12} strokeLinecap="round"
                  strokeWidth={2} d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0"></animate>
            </path>
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}
             className={`icon ${props.className}`}>
            <path fill="currentColor" d="m4.3 2.9l12.8 12.8l-1.4 1.4L2.9 4.3z"></path>
            <path fill="currentColor" d="M17.1 4.3L4.3 17.1l-1.4-1.4L15.7 2.9z"></path>
        </svg>);
}
