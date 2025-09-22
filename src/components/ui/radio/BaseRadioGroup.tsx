"use client"

import {CSSProperties} from "react";
import "./radio.css"

export type BaseRadioGroupProps = {
    name: string;
    label?: string,
    labelStyle?: CSSProperties;
    helperText?: string;
    helperTextProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
        isLoading?: boolean
    },
    error?: string,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const BaseRadioGroup = ({
                            children,
                            label,
                            labelStyle,
                            helperText,
                            helperTextProps,
                            error,
                            ...baseRadioGroupProps
                        }: BaseRadioGroupProps) => {
    return (
        <div {...baseRadioGroupProps}>
            {label && <p className={"subtitle"} style={{...labelStyle}}>{label}</p>}
            <div style={{display: "flex", width: "100%", gap: "1rem"}}>
                {children}
            </div>
            {helperText && (
                <p {...helperTextProps} className={`helperText baseInput-helper-text ${helperTextProps?.className}`}>
                    {helperTextProps?.isLoading ? "loading.." : helperText}
                </p>
            )}
            {!helperText && error && (
                <p className={"baseInput-error-text"}>
                    {error}
                </p>
            )
            }
        </div>
    )
}
export default BaseRadioGroup
