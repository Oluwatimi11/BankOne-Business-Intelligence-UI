import * as React from "react";
import {SVGProps} from "react";

const WheelIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.6129 7.61341L4.10679 4.1073M4.10679 15.8924L7.63932 12.3599M12.3836 12.3863L15.8897 15.8924M15.8897 4.1073L12.3566 7.64035M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984ZM13.3327 9.99984C13.3327 11.8408 11.8403 13.3332 9.99935 13.3332C8.1584 13.3332 6.66602 11.8408 6.66602 9.99984C6.66602 8.15889 8.1584 6.6665 9.99935 6.6665C11.8403 6.6665 13.3327 8.15889 13.3327 9.99984Z"
            stroke="#D0D5DD"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default WheelIcon;
