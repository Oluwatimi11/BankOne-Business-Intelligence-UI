"use client"

import {CSSProperties} from "react";
import {Formik} from "@/utilities/types";
import {FormikValues} from "formik";
import "./radio.css"

export type BaseRadioProps<T extends FormikValues> = {
    formik: Formik<T>;
    name: string;
    label?: string,
    labelStyle?: CSSProperties;
    radioOptions?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const BaseRadio = <T extends FormikValues>({radioOptions, ...baseRadioProps}: BaseRadioProps<T>) => {
    return (
        <div {...baseRadioProps} className={`baseRadio-container ${baseRadioProps?.className}`}
             style={{...baseRadioProps?.style}}>
            <input
                {...radioOptions}
                type="radio"
                id={`${radioOptions?.id}ID`}
                name={baseRadioProps?.name}
                onBlur={baseRadioProps?.formik?.handleBlur(baseRadioProps?.name)}
                onChange={baseRadioProps?.formik?.handleChange(baseRadioProps?.name)}
                checked={baseRadioProps?.formik?.values[baseRadioProps.name] === radioOptions?.value}
            />
            {baseRadioProps?.label &&
                <label className="subtitle" htmlFor={`${radioOptions?.id}ID`}
                       style={{display: "block", ...baseRadioProps?.labelStyle,}}>{baseRadioProps?.label}</label>}
        </div>
    )
}
export default BaseRadio
