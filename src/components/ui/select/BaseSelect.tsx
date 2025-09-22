"use client"

import React, {CSSProperties} from 'react';
import './select.css';
import '@/components/ui/input/input.css'
import {FormikValues} from "formik";
import {Formik} from "@/utilities/types";

export type BaseSelectOption = {
    startImage?: string;
    startImageUrl?: string;
    endImageUrl?: string;
    endImage?: string;
    placeholder?: boolean; // Flag to mark an option as a placeholder
} & React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>


export type BaseSelectProps<T extends FormikValues> = {
    label?: string;
    labelStyle?: CSSProperties,
    containerStyle?: CSSProperties,
    helperText?: string;
    helperTextProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
    error?: string,
    name: string,
    formik: Formik<T>,
    selectInputProps?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
    selectOptions: BaseSelectOption[],
    // onOptionSelect?: (option: string) => void;
    size?: "x-small" | "small" | "medium"
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export const BaseSelect = <T extends FormikValues>({
                                                       label,
                                                       labelStyle,
                                                       helperText,
                                                       helperTextProps,
                                                       formik,
                                                       name,
                                                       // onOptionSelect,
                                                       selectInputProps,
                                                       selectOptions,
                                                       containerStyle,
                                                       error,
                                                       size = "medium",
                                                       ...props
                                                   }: BaseSelectProps<T>) => {

    // if (type == "modern") return <ModernSelect label={label} labelStyle={labelStyle} selectOptions={selectOptions} />

    // const getOptionStyle = (option: BaseSelectOption) => {
    //     if (option.placeholder) {
    //         return {color: "#b7b9bd"}; // Gray color for placeholder
    //     }
    //     return {color: "black"}; // Default color for other options
    // };
    const selectSize = size == "x-small" ? "is-x-small" : size == "small" ? "is-small" : size == "medium" ? "is-medium" : "is-large";
    return (<div {...props} className={`w-full baseSelectOverallContainer flex flex-col gap-1 my-1 ${props?.className}`}
                 style={{
                     display: "flex",
                     flexDirection: "column",
                     gap: ".5rem",
                     width: "100%", ...containerStyle
                 }}>
        {
            label && (
                <label className="subtitle baseLabel" style={{...labelStyle}}>
                    {label}
                </label>
            )
        }
        {/*<p>{formik?.values[name]}kkk</p>*/}
        <select
            {...selectInputProps}
            className={`form-input baseSelect ${selectSize} ${selectInputProps?.className}`}
            style={{
                borderRadius: ".8em",
                // minWidth: "max-content",
                // color: formik?.values[name]?.length < 1 ? "#b7b9bd" : "black",
                ...selectInputProps?.style
            }}
            name={name}
            value={formik?.values[name]}
            onBlur={formik?.handleBlur(name)}
            // style={{
            //     padding: "3px",
            //     paddingLeft: ".5rem",
            //     borderRadius: "5px",
            //     height: "max-content",
            //     minHeight: "max-content",
            //     outline: "none",
            //     border: "1px solid var(--gray--3)",
            //     ...selectInputProps?.style
            // }}
            onChange={(e) => {
                formik?.handleChange(e);
                selectInputProps?.onChange?.(e)
            }}
        >
            {/*option.placeholder && option.value?.length < 1*/}
            {selectOptions.length > 0 && selectOptions?.map((option, index) => {
                return (<option key={index} {...option}
                    // disabled={option.placeholder} // Disable placeholder initially
                >{option.label}</option>)
            })}
        </select>
        {helperText && (
            <p {...helperTextProps} className={`helperText baseInput-helper-text ${helperTextProps?.className}`}>
                {helperText}
            </p>
        )}
        {(formik?.touched[name] && formik?.errors[name]) && (
            <p className={"baseInput-error-text"}>{error}
                {formik?.errors[name].toString()}
            </p>
        )}
    </div>)
}
