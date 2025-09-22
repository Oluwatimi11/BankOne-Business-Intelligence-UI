import {FormikValues, useFormik} from "formik";
import {CSSProperties} from "react";

export type Formik<Values extends FormikValues = FormikValues> = ReturnType<typeof useFormik<Values>>;

export interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number;
}

export type BaseResponse = {
    isSuccessful: boolean,
    message: string,
    code: number | string,
    data: any
    // responseCode: string;
    // responseMessage: string;
}
export type BaseErrorResponse = {
    "type": string,
    "title": string,
    "status": number,
    "errors": {
        [key: string]: string[]
    },
    "traceId": string
}


export type ReadJson = {
    showAllFields: boolean,
    fields: [
        {
            key: string,
            label: string
        }
    ],
    readEndpoint: string,
    uniqueColId: string, // the unique field for the entity
}

export type ModuleJson = [
    {
        moduleName: string;
        moduleItems: [
            {
                title: string;
                tabRoute: string; // the route to the page to find the appropriate component
            }
        ]
    }
]

export type formJson = [
    {
        name: string,//fieldName,
        label: string,// custom display label
        valueDataType: string | number | boolean | object | null | undefined,
        inputType: | "button"
            | "checkbox"
            | "color"
            | "date"
            | "datetime-local"
            | "email"
            | "file"
            | "hidden"
            | "image"
            | "month"
            | "number"
            | "password"
            | "radio"
            | "range"
            | "reset"
            | "search"
            | "submit"
            | "tel"
            | "text"
            | "time"
            | "url"
            | "week" | "select"
    }
]
