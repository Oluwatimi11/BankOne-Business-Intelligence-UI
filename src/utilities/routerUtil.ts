// RouterUtil.ts
import {NavigateFunction} from "react-router-dom";
import type {NavigateOptions} from "react-router/dist/lib/context";

class RouterUtil {
    private static navigateFn: NavigateFunction | null = null;

    public static setNavigateFn(navigateFn: NavigateFunction) {
        RouterUtil.navigateFn = navigateFn;
    }

    public static goBack() {
        if (RouterUtil.navigateFn) {
            RouterUtil.navigateFn(-1);
        }
    }

    public static navigate(path: string, options?: NavigateOptions & {
        paramsToReplaceWithValue?: { [key: string]: string }[]
    }) {
        // If we have parameters to replace, loop over them
        if (options?.paramsToReplaceWithValue) {
            options.paramsToReplaceWithValue.forEach(paramObj => {
                for (const key in paramObj) {
                    // Create a regex to match the parameter placeholder in the path.
                    // This regex will look for ":key" followed by either a "/" or the end of the string.
                    const regex = new RegExp(`:${key}(?=/|$)`, "g");
                    path = path.replace(regex, paramObj[key]);
                }
            });
        }

        // Remove our custom property before passing the options along.
        const {paramsToReplaceWithValue, ...restOptions} = options || {};
        void paramsToReplaceWithValue; // Mark as used to satisfy ESLint

        if (RouterUtil.navigateFn) {
            RouterUtil.navigateFn(path, restOptions);
        } else {
            // console.error("Navigate function is not set. Make sure to call setNavigateFn.");
        }
    }

    // public static navigate(path: string, options?: NavigateOptions & {
    //     paramsToReplaceWithValue: { [key: string]: string }[]
    // }) {
    //     if (RouterUtil.navigateFn) {
    //         RouterUtil.navigateFn(path, options);
    //     } else {
    //         // console.error("Navigate function is not set. Make sure to call setNavigateFn.");
    //     }
    // }
}

export default RouterUtil;
