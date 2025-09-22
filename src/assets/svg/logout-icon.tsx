function SvgComponent(props: any) {

    return (
        <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
        <rect
            x={0.5}
            y={0.5}
            width={39}
            height={39}
            rx={3.5}
            fill="#282828"
            stroke="#282828"
        />
        <g clipPath="url(#clip0_1728_1952)" fill={props.isHover ? '#ffffff' : "#EB5757"}>
            <path d="M12.667 12h10.667v6.533h1.333V12a1.333 1.333 0 00-1.334-1.334H12.668A1.334 1.334 0 0011.334 12v16a1.333 1.333 0 001.333 1.333h10.667A1.333 1.333 0 0024.666 28h-12V12z" />
            <path d="M26.773 19.52a.667.667 0 00-.94.94l2.254 2.207H18.42a.667.667 0 000 1.333h9.667l-2.254 2.307a.666.666 0 10.94.94l3.894-3.867-3.894-3.86z" />
        </g>
        <defs>
            <clipPath id="clip0_1728_1952">
            <path fill="#fff" transform="translate(8 8)" d="M0 0H24V24H0z" />
            </clipPath>
        </defs>
        </svg>
    )
}
  
  export default SvgComponent