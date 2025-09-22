import type {SVGProps} from 'react';


export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}
                 className={`${props.className}`}>
        <path fill="none" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth={32}
              d="M256 112v288m144-144H112"></path>
    </svg>);
}
