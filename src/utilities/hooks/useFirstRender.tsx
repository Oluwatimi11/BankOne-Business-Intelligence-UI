"use client";

import {useEffect, useRef} from "react";

export const useFirstRender = () => {
    const isFirst = useRef(true);

    useEffect(() => {
        isFirst.current = false;
    }, []);

    return isFirst.current;
};

// "use client"
//
// import {useRef} from "react";
//
// export const useFirstRender = () => {
//     const ref = useRef(true);
//     const firstRender = ref.current;
//     ref.current = false;
//     return firstRender;
// };
