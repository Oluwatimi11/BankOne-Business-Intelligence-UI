import type {SVGProps} from 'react';

export default function BlurredEllipseBgIcon({type = "faceUp", ...props}: SVGProps<SVGSVGElement> & {
    type?: "faceUp" | "faceDown"
}) {
    if (type == "faceDown") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="458"
                height="268"
                fill="none"
                viewBox="0 0 458 268"
                {...props}
            >
                <g filter="url(#filter0_f_9539_39551)">
                    <path
                        stroke="url(#paint0_linear_9539_39551)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.4"
                        strokeWidth="200"
                        d="M226.68 2.467c.671-12.169 6.475-23.95 16.852-34.207s24.979-18.646 42.399-24.36c17.42-5.712 37.071-8.557 57.062-8.26 19.992.298 39.649 3.728 57.081 9.96s32.051 15.057 42.449 25.624 16.226 22.52 16.922 34.71-3.763 24.204-12.948 34.888"
                    ></path>
                </g>
                <defs>
                    <linearGradient
                        id="paint0_linear_9539_39551"
                        x1="433.003"
                        x2="276.277"
                        y1="44.487"
                        y2="-96.295"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#2C74E5"></stop>
                        <stop offset="0.313" stopColor="#139DEA"></stop>
                        <stop offset="0.781" stopColor="#139DEA"></stop>
                        <stop offset="1" stopColor="#259DF6"></stop>
                    </linearGradient>
                    <filter
                        id="filter0_f_9539_39551"
                        width="685.818"
                        height="557.829"
                        x="0.189"
                        y="-290.692"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                        ></feBlend>
                        <feGaussianBlur
                            result="effect1_foregroundBlur_9539_39551"
                            stdDeviation="63.2"
                        ></feGaussianBlur>
                    </filter>
                </defs>
            </svg>
        )
    }
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        width="506"
        height="321"
        fill="none"
        viewBox="0 0 506 321"
        {...props}
    >
        <g filter="url(#filter0_f_9556_392)">
            <path
                stroke="url(#paint0_linear_9556_392)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.4"
                strokeWidth="200"
                d="M279 264.848c0 15.133-5.149 30.011-14.95 43.202-9.802 13.192-23.927 24.251-41.014 32.115-17.088 7.863-36.563 12.266-56.551 12.783-19.988.518-39.815-2.867-57.574-9.828-17.758-6.961-32.849-17.264-43.82-29.917-10.97-12.653-17.451-27.23-18.818-42.328S48.697 240.667 57.284 227"
            ></path>
        </g>
        <defs>
            <linearGradient
                id="paint0_linear_9556_392"
                x1="70.563"
                x2="262.311"
                y1="221.852"
                y2="347.929"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#2C74E5"></stop>
                <stop offset="0.313" stopColor="#139DEA"></stop>
                <stop offset="0.781" stopColor="#139DEA"></stop>
                <stop offset="1" stopColor="#259DF6"></stop>
            </linearGradient>
            <filter
                id="filter0_f_9556_392"
                width="685.802"
                height="578.813"
                x="-180.402"
                y="0.587"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                ></feBlend>
                <feGaussianBlur
                    result="effect1_foregroundBlur_9556_392"
                    stdDeviation="63.2"
                ></feGaussianBlur>
            </filter>
        </defs>
    </svg>);
}
