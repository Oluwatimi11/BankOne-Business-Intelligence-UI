"use client"

import "./input.css"
import {CSSProperties, SVGProps, useEffect, useRef, useState} from "react";
import EyeIcon from "@/components/icon/EyeVisibleIcon";
import {FormikProps, FormikValues} from "formik";
import CopyIcon from "@/components/icon/CopyIcon";
import PadlockIcon from "@/components/icon/PadlockIcon";
import EmailIcon from "@/components/icon/EmailIcon";
import {FormUtil} from "@/utilities/formUtil";
import DOMPurify from "dompurify";

export type BaseInputProps<T extends FormikValues> = {
    startIcon?: React.FC<SVGProps<SVGSVGElement>> | string,
    endIcon?: React.FC<SVGProps<SVGSVGElement>> | string,
    startIconProps?: SVGProps<SVGSVGElement>,
    endIconProps?: SVGProps<SVGSVGElement>,
    label?: string;
    labelStyle?: CSSProperties,
    helperText?: string;
    helperTextProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
        isLoading?: boolean
    },
    containerStyle?: CSSProperties,
    inputContainerStyle?: CSSProperties,
    error?: string,
    formik: FormikProps<T>,
    endIconSize?: string
    startIconSize?: string,
    copyTextOnly?: boolean,
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    name: string
    multiline?: boolean;
    formatNumberWithCommas?: boolean;
    formatDecimalNumberWithCommas?: boolean;
    decimalPlaces?: number;
    maxNumberValue?: number;
    minNumberValue?: number; // Added prop
    allowNegative?: boolean; // Added prop
    textAreaOptions?: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
}

export const BaseInput = <T extends FormikValues>({
                                                      startIcon: StartIcon,
                                                      endIcon: EndIcon,
                                                      startIconProps,
                                                      endIconProps,
                                                      label,
                                                      labelStyle,
                                                      helperText,
                                                      helperTextProps,
                                                      inputProps,
                                                      containerStyle,
                                                      inputContainerStyle,
                                                      endIconSize = '50px',
                                                      startIconSize = '50px',
                                                      error,
                                                      multiline = false,
                                                      formatNumberWithCommas = false,
                                                      formatDecimalNumberWithCommas = false,
                                                      decimalPlaces = 2,
                                                      maxNumberValue = 999999999999999,
                                                      minNumberValue = 0, // Default added
                                                      allowNegative = false, // Default added
                                                      textAreaOptions, copyTextOnly,
                                                      name,
                                                      formik,
                                                  }: BaseInputProps<T>) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isCopiedClicked, setIsCopiedClicked] = useState<boolean>(false)
    const isStartIconPresent = StartIcon || EndIcon || copyTextOnly || inputProps?.type === "password" || inputProps?.type === "email";
    const isEndIconPresent = EndIcon || copyTextOnly;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleWholeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        const cursorPosition = e.target.selectionStart || 0;

        if (!allowNegative) {
            inputValue = inputValue.replace(/-/g, '');
        }

        inputValue = inputValue.replace(/,/g, '');
        const negativeSignAdded = inputValue.includes('-') && !formik.values[name].toString().includes('-');

        const regex = allowNegative ? /[^0-9-]/g : /[^0-9]/g;
        const cleanValue = inputValue.replace(regex, '');
        const negativeCount = (cleanValue.match(/-/g) || []).length;

        let finalValue = cleanValue;
        if (negativeCount > 0) {
            finalValue = '-' + cleanValue.replace(/-/g, '');
        }

        if (!finalValue || finalValue === '-') {
            finalValue = '0';
        }

        const numericValue = parseFloat(finalValue);
        if (numericValue > maxNumberValue || numericValue < minNumberValue) {
            return;
        }

        const numericPart = finalValue.replace('-', '').replace(/^0+/, '');
        finalValue = (finalValue.startsWith('-') ? '-' : '') + (numericPart || '0');

        const formattedValue = finalValue.replace('-', '').length > 0
            ? (finalValue.startsWith('-') ? '-' : '') + FormUtil.formatNumberWithCommas(finalValue.replace('-', ''))
            : '0';

        if (inputRef.current) {
            inputRef.current.value = formattedValue;
            if (negativeSignAdded) {
                requestAnimationFrame(() => {
                    if (inputRef.current) {
                        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
                    }
                });
            }
        }

        formik.setFieldValue(name, finalValue);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const oldValue = input.value;
        let inputValue = oldValue;

        if (!allowNegative) {
            inputValue = inputValue.replace(/-/g, '');
        }

        const cursorPosition = input.selectionStart || 0;
        const isBackspace =
            e.nativeEvent instanceof InputEvent &&
            e.nativeEvent.inputType === "deleteContentBackward";

        const currentHasNegative = formik.values[name].toString().includes("-");
        const inputHasNegative = oldValue.includes("-");

        if (inputHasNegative && !currentHasNegative) {
            inputValue = "-" + inputValue.replace(/-/g, "");
        }

        const isNegative = inputValue.startsWith("-");
        if (isNegative) {
            inputValue = "-" + inputValue.substring(1).replace(/-/g, "");
        }

        const numericPart = inputValue.replace("-", "").replace(/[^0-9]/g, "");
        if (numericPart.length === 0) {
            formik.setFieldValue(name, `0.${"0".repeat(decimalPlaces)}`);
            return;
        }

        const parsedValue = FormUtil.parseFormattedNumber(numericPart).toString();
        const paddedValue = parsedValue.padStart(decimalPlaces, "0");

        const integerPart =
            (isNegative ? "-" : "") + (paddedValue.slice(0, -decimalPlaces) || "0");
        const decimalPart = paddedValue.slice(-decimalPlaces);

        const fullNumericValue = parseFloat(`${integerPart}.${decimalPart}`);
        if (fullNumericValue > maxNumberValue || fullNumericValue < minNumberValue) {
            return;
        }

        const formattedIntegerPart = FormUtil.formatNumberWithCommas(integerPart.replace("-", ""));
        const formattedValue = `${isNegative ? "-" : ""}${formattedIntegerPart}.${decimalPart}`;

        if (formattedValue === "-0.00") {
            formik.setFieldValue(name, `0.${"0".repeat(decimalPlaces)}`);
            return;
        }

        formik.setFieldValue(name, `${integerPart}.${decimalPart}`);

        requestAnimationFrame(() => {
            if (!inputRef.current) return;

            const oldCommasBeforeCursor = (oldValue.slice(0, cursorPosition).match(/,/g) || []).length;
            const newCommasBeforeCursor = (formattedValue.slice(0, cursorPosition).match(/,/g) || []).length;

            let newPosition = cursorPosition + (newCommasBeforeCursor - oldCommasBeforeCursor);

            if (isBackspace && formattedValue.startsWith("0.") || formattedValue.startsWith("-0.")) {
                const decimalStartIndex = formattedValue.indexOf(".");
                const decimalDigitStart = decimalStartIndex + 1;
                const endOfDecimal = formattedValue.length;

                if (newPosition <= decimalStartIndex + 2) {
                    newPosition = decimalDigitStart + 1;
                }

                newPosition = Math.max(decimalDigitStart, Math.min(newPosition + 1, endOfDecimal));
            }

            newPosition = Math.max(0, Math.min(newPosition, formattedValue.length));

            inputRef.current.setSelectionRange(newPosition, newPosition);
        });
    };
    const formatWholeNumberDisplay = (value: string | number) => {
        if (!value) return '0';

        const stringValue = value.toString();
        const isNegative = stringValue.startsWith('-');

        // Handle zero case
        if (stringValue === '0' || stringValue === '-0') return '0';

        // Format with commas
        const numericValue = stringValue.replace(/[^0-9-]/g, '');
        return numericValue.replace('-', '').length > 0
            ? (isNegative ? '-' : '') + FormUtil.formatNumberWithCommas(numericValue.replace('-', ''))
            : '0';
    };
    const formatDisplayValue = (value: string | number) => {
        if (!value) return `0.${'0'.repeat(decimalPlaces)}`;

        const stringValue = value.toString();
        const isNegative = stringValue.startsWith('-');

        // Split into parts and handle decimal point
        const [integerPart = '0', decimalPart = ''] = stringValue.split('.');

        // Format integer part with commas
        const formattedIntegerPart = integerPart.replace('-', '').length > 0
            ? (isNegative ? '-' : '') + FormUtil.formatNumberWithCommas(integerPart.replace('-', ''))
            : '0';

        // Pad or truncate decimal part
        const formattedDecimalPart = decimalPart.padEnd(decimalPlaces, '0').slice(0, decimalPlaces);

        return `${formattedIntegerPart}.${formattedDecimalPart}`;
    };
    // const [referenceElement, setReferenceElement] = useState<SVGSVGElement | null>(null);
    // const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isCopiedClicked) {
            const timeoutID = setTimeout(() => {
                setIsCopiedClicked(false);
            }, 3000);

            // Cleanup function to clear the timeout when component unmounts or isCopiedClicked changes
            return () => clearTimeout(timeoutID);
        }
    }, [isCopiedClicked]);


    return <div className="baseInput-overall-container"
                style={{...containerStyle}}>
        {
            label && (
                <label className={`baseLabel subtitle`}
                       dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(label)}}
                       style={{...labelStyle}}/>
            )
        }
        {multiline && <textarea className="form-input is-text-area" {...textAreaOptions} name={name}
                                value={formik?.values[name]}
                                onBlur={formik?.handleBlur(name)}
                                onChange={formik?.handleChange(name)}/>}

        {!multiline && <div className="baseInput-container" style={{...inputContainerStyle}}>
            {
                StartIcon && (
                    <StartIcon width={startIconSize} height={startIconSize} {...startIconProps}
                               className={`baseInput-icon start ${startIconProps?.className}`}/>
                )
            }
            {
                inputProps?.type === "password" && !StartIcon && (
                    <PadlockIcon width={startIconSize} height={startIconSize} className={"baseInput-icon start"}/>
                )
            }
            {
                inputProps?.type === "email" && !StartIcon && (
                    <EmailIcon width={startIconSize} height={startIconSize} className={"baseInput-icon start"}/>
                )
            }

            {(formatDecimalNumberWithCommas) && (
                <input
                    ref={inputRef}
                    className={`form-input baseInput ${isStartIconPresent ? "with-icon" : ""} ${StartIcon ? "start" : ""} ${isEndIconPresent ? "end" : ""}`}
                    name={name}
                    type="text"
                    value={formatDisplayValue(formik.values[name])} // Display formatted value
                    onChange={handleNumberChange} // Handle input change
                    onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)} // Cursor at end
                    onBlur={(e) => {
                        const parsedValue = FormUtil.parseFormattedNumber(e.target.value);
                        formik.setFieldValue(name, isNaN(parsedValue) ? `0.${'0'.repeat(decimalPlaces)}` : parsedValue.toFixed(decimalPlaces));
                    }}
                    {...inputProps}
                    style={{...inputProps?.style}}
                />
            )}
            {(formatNumberWithCommas) && (
                <input
                    ref={inputRef}
                    className={`form-input baseInput ${isStartIconPresent ? "with-icon" : ""} ${StartIcon ? "start" : ""} ${isEndIconPresent ? "end" : ""}`}
                    name={name}
                    type="text"
                    value={formatWholeNumberDisplay(formik.values[name])}
                    onChange={handleWholeNumberChange}
                    onBlur={(e) => {
                        // Remove commas but preserve negative sign
                        const value = e.target.value;
                        const isNegative = value.startsWith('-');
                        const numericValue = value.replace(/[^0-9-]/g, '');
                        const finalValue = (numericValue === '' || numericValue === '-')
                            ? '0'
                            : (isNegative ? '-' : '') + numericValue.replace('-', '');
                        formik.setFieldValue(name, finalValue);
                    }}
                    // onBlur={(e) => {
                    //     // Remove commas and ensure a numeric value
                    //     const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    //     formik.setFieldValue(name, numericValue || '0');
                    // }}
                    {...inputProps}
                    style={{...inputProps?.style}}
                />
            )}

            {!(formatNumberWithCommas || formatDecimalNumberWithCommas) && <input
                className={`form-input baseInput ${(isStartIconPresent) ? "with-icon" : ""} ${StartIcon ? "start" : ""} ${isEndIconPresent ? "end" : ""} `}
                onBlur={formik?.handleBlur(name)}
                onChange={formik?.handleChange(name)}
                name={name}
                value={formik?.values[name] || ""}
                {...inputProps}
                type={inputProps?.type === "password" ? (isPasswordVisible ? "text" : "password") : inputProps?.type}
                style={{
                    // minHeight: "max-content",
                    // outline: "2px solid #0a226a",
                    ...inputProps?.style
                }}/>}

            {
                copyTextOnly && !EndIcon && (
                    <div className={"baseInput-icon end  copyIcon"}>
                        <CopyIcon width={endIconSize} height={endIconSize} style={{cursor: "pointer"}}
                                  onClick={async () => {
                                      if (formik?.values[name]) {
                                          setIsCopiedClicked(true)
                                          await navigator.clipboard.writeText(formik?.values[name]);
                                      }
                                  }} className={'baseInput-icon'}
                        />
                        {isCopiedClicked &&
                            <p className={"subtitle label"}
                               style={{position: "absolute", top: "100%", left: 0,}}>Copied!</p>}
                    </div>
                )
            }
            {
                inputProps?.type === "password" && !EndIcon && (
                    <EyeIcon type={isPasswordVisible ? "visible" : "hidden"} width={endIconSize} height={endIconSize}
                             onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                             className={"baseInput-icon end"}/>
                )
            }
            {
                inputProps?.type != "password" && EndIcon && (
                    <EndIcon width={endIconSize} height={endIconSize}  {...endIconProps}
                             className={`baseInput-icon end ${endIconProps?.className}`}/>
                )
            }
        </div>}

        {helperText && (
            <p {...helperTextProps} className={`helperText baseInput-helper-text ${helperTextProps?.className}`}>
                {helperTextProps?.isLoading ? "loading.." : helperText}
            </p>
        )}
        {!helperText && (formik?.touched[name] && formik?.errors[name]) && !error && (
            <p className={"baseInput-error-text"}>
                {formik?.errors[name].toString()}
            </p>
        )
        }
        {!helperText && error && !(formik?.touched[name] && formik?.errors[name]) && (
            <p className={"baseInput-error-text"}>
                {error}
            </p>
        )
        }
    </div>
}
export default BaseInput
