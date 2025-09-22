import {appConfig} from "@/configs/appConfig";
import {BaseResponse} from "@/utilities/types";

export class BaseUtil {

    static logger(...logInfo: any) {
        if (appConfig.stage == "Dev") {
            console.log(...logInfo);
        }
    }

    static isResponseSuccessful(response: BaseResponse): boolean {
        return response.isSuccessful
        // return ["200", "201"].includes(String(response.code))
    }
}
