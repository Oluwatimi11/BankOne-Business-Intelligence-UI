import {SVGProps} from "react";

const MenuUnfoldIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg height="20" width="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"        {...props}
         className={`icon ${props.className}`}>
        <path
            d="M17.5 15V16.6667H2.5V15H17.5ZM14.2083 2.95837L18.3333 7.08337L14.2083 11.2084V2.95837ZM10 9.16671V10.8334H2.5V9.16671H10ZM10 3.33337V5.00004H2.5V3.33337H10Z"
            fill="currentColor"/>
    </svg>
);

export default MenuUnfoldIcon
