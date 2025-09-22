"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react";
import {FormikValues} from "formik";
import {ModernSelect, ModernSelectOption} from "@/components/ui/select/ModernSelect";
import BaseInput, {BaseInputProps} from "@/components/ui/input/BaseInput";
import countryCodes from "@/assets/data/countryCodes.json";
import {Formik} from "@/utilities/types";

export type BasePhoneNumberInputProps<T extends FormikValues> = {
    /** The Formik instance */
    formik: Formik<T>;

    /** Single-field approach: the backend wants everything in one field, e.g. '+2347088...' */
    customFullPhoneNumberInputName?: string;

    /** Two‐field approach: the backend has separate fields for code & phone */
    selectInputName?: string;  // e.g. 'countryCode'
    inputName?: string;        // e.g. 'phoneNumber'

    /** Label displayed above everything */
    label?: string;
    /** Style for that label */
    labelStyle?: React.CSSProperties;

    /** Additional props for the code dropdown */
    selectProps?: Omit<React.ComponentProps<typeof ModernSelect>, "selectOptions" | "onOptionSelect">;

    /** Additional props for the phone input */
    baseInputProps?: Omit<BaseInputProps<T>, "formik" | "name">;

    /** The placeholder for the phone part (not the code). */
    inputPlaceholder?: string;

} & React.HTMLAttributes<HTMLDivElement>;

/**
 * parseFullPhoneFromDictionary:
 *   - We have a big array of known dial codes (like '+1', '+234', '+358', etc.).
 *   - We look for the longest code that matches the start of `fullVal`.
 *   - If found, we return { code, local }.
 *   - Otherwise we return { code: '+234', local: everything } as fallback.
 */
function parseFullPhoneFromDictionary(
    fullVal: string,
    allDialCodes: string[]
): { code: string; local: string } {
    // Trim whitespace
    const input = fullVal.trim();

    // Sort dial codes by length descending, so we match the longest possible prefix first.
    const sortedCodes = [...allDialCodes].sort(
        (a, b) => b.length - a.length
    );

    for (const dial of sortedCodes) {
        if (input.startsWith(dial)) {
            // Found a match
            const remainder = input.slice(dial.length);
            return {code: dial, local: remainder};
        }
    }

    // fallback
    return {code: '+234', local: input};
}


/**
 * Phone input that can handle either:
 *   1) single field (customFullPhoneNumberInputName), or
 *   2) separate fields (selectInputName, inputName).
 *
 * Internally, we keep local states: selectedCode & localNumber.
 * On every user change, we update the form field(s).
 */
export default function BasePhoneNumberInput<T extends FormikValues>(
    props: BasePhoneNumberInputProps<T>
) {
    const {
        formik,
        customFullPhoneNumberInputName,
        selectInputName = "countryCode",
        inputName = "phoneNumber",
        label,
        labelStyle,

        selectProps,
        baseInputProps,
        inputPlaceholder,

        ...divProps
    } = props;

    // ------------------------------------------------------------------
    // 1) Local internal states
    //    Because we don't want to forcibly parse user typed text
    //    for +234 each time, let's keep them separate.
    // ------------------------------------------------------------------
    const DEFAULT_COUNTRY_CODE = "+234"
    const [selectedCode, setSelectedCode] = useState(DEFAULT_COUNTRY_CODE);
    const [localNumber, setLocalNumber] = useState("");

    // Gather all dial codes from your JSON
    const dialCodesArray = useMemo(
        () => countryCodes.map((cc) => cc.dial_code),
        []
    );

    // ------------------------------------------------------------------
    // 2) On mount, parse any existing formik values
    // ------------------------------------------------------------------
    useEffect(() => {
        if (customFullPhoneNumberInputName) {
            // single field approach
            const fullVal = String(formik.values[customFullPhoneNumberInputName] ?? "");
            if (fullVal) {
                const {code, local} = parseFullPhoneFromDictionary(fullVal, dialCodesArray);
                setSelectedCode(code);
                setLocalNumber(local);
            }
        } else {
            // Two‐field approach
            const codeVal = String(formik.values[selectInputName] ?? DEFAULT_COUNTRY_CODE);
            const phoneVal = String(formik.values[inputName] ?? "");
            setSelectedCode(codeVal || DEFAULT_COUNTRY_CODE);
            setLocalNumber(phoneVal);
        }
    }, [customFullPhoneNumberInputName, formik.values, selectInputName, inputName, dialCodesArray]);

    // ------------------------------------------------------------------
    // 3) We'll keep a function that updates the form whenever we change local states
    // ------------------------------------------------------------------
    const pushToFormik = useCallback((newCode: string, newLocal: string) => {
        if (customFullPhoneNumberInputName) {
            // single field => newVal = code + local
            formik.setFieldValue(customFullPhoneNumberInputName, newCode + newLocal);
        } else {
            // separate fields
            formik.setFieldValue(selectInputName, newCode);
            formik.setFieldValue(inputName, newLocal);
        }
    }, [
        customFullPhoneNumberInputName,
        selectInputName,
        inputName,
        formik
    ]);

    // ------------------------------------------------------------------
    // 4) Country code dropdown changed
    // ------------------------------------------------------------------
    const handleSelectCode = useCallback((newCode: string) => {
        // newCode e.g. '+358'
        setSelectedCode(newCode);
        pushToFormik(newCode, localNumber);
    }, [localNumber, pushToFormik]);

    // ------------------------------------------------------------------
    // 5) Phone input changed
    // ------------------------------------------------------------------
    const handleLocalNumberChange = useCallback((rawValue: string) => {
        // optionally remove disallowed characters
        const cleaned = rawValue.replace(/[^\d\s-]/g, "");
        setLocalNumber(cleaned);
        pushToFormik(selectedCode, cleaned);
    }, [selectedCode, pushToFormik]);

    // ------------------------------------------------------------------
    // 6) Build the final props for <BaseInput>
    // ------------------------------------------------------------------
    // We'll treat the phone input as purely local digits, ignoring the code.
    // We'll show localNumber in the input, and onChange => handleLocalNumberChange
    // const phoneFieldError = useMemo(() => {
    //     if (customFullPhoneNumberInputName) {
    //         return formik.errors[customFullPhoneNumberInputName] as string | undefined;
    //     } else {
    //         // two field approach => error might be in inputName
    //         return formik.errors[inputName] as string | undefined;
    //     }
    // }, [
    //     customFullPhoneNumberInputName,
    //     inputName,
    //     formik.errors
    // ]);

    const finalBaseInputProps: BaseInputProps<T> = {
        ...baseInputProps,
        formik: formik as Formik<T>,
        // the name is for internal formik handleBlur, but we can set it to
        // the single field or the phone field. We won't rely on onChange from
        // BaseInput for the phone number, but we'll override below anyway
        name: (customFullPhoneNumberInputName ?? inputName) as string,
        // error: phoneFieldError,
        inputProps: {
            ...baseInputProps?.inputProps,
            maxLength: 11,
            type: "text",
            placeholder: inputPlaceholder,
            value: localNumber,  // we display localNumber only
            onChange: (e) => {
                handleLocalNumberChange(e.currentTarget.value);
            },
            onBlur: (e) => {
                // Mark field as touched
                if (customFullPhoneNumberInputName) {
                    formik.setFieldTouched(customFullPhoneNumberInputName);
                } else {
                    formik.setFieldTouched(inputName);
                }
                if (baseInputProps?.inputProps?.onBlur) {
                    baseInputProps.inputProps.onBlur(e);
                }
            }
        }
    };

    // ------------------------------------------------------------------
    // 7) Build the options for ModernSelect
    // ------------------------------------------------------------------
    const codeOptions: ModernSelectOption[] = useMemo(() => {
        return countryCodes.map((it) => ({
            label: it.dial_code,   // e.g. '+234'
            value: it.dial_code
        }));
    }, []);

    // We'll pass `selectedCode` as the dropdown’s placeholderLabel (or better: a real value)
    // Typically, you'd enhance ModernSelect to have a “selectedOption” prop,
    // but let's do it via placeholderLabel if you rely on that approach.
    // Then onOptionSelect => handleSelectCode
    //
    // Or if your ModernSelect has a “value” prop, do that:
    //   <ModernSelect
    //      value={selectedCode}
    //      onOptionSelect={(val) => handleSelectCode(val)}
    //      …
    //   />
    //

    return (
        <div className="baseInput-overall-container" {...divProps}>
            {label && (
                <label className="baseLabel subtitle" style={labelStyle}>
                    {label}
                </label>
            )}

            <div className="form-input-flex-group" style={{display: "flex", gap: "4px"}}>
                <ModernSelect

                    selectOptions={codeOptions}
                    placeholderLabel={selectedCode}
                    onOptionSelect={(chosenValue) => handleSelectCode(chosenValue)}
                    {...selectProps}
                />

                <BaseInput {...finalBaseInputProps} />
            </div>
            {/*{*/}
            {/*    phoneFieldError && (*/}
            {/*        <p className={"baseInput-error-text"}>*/}
            {/*            {phoneFieldError.toString()}*/}
            {/*        </p>*/}
            {/*    )*/}
            {/*}*/}
        </div>
    );
}


// import "@/components/ui/input/input.css"
// import {ModernSelect, ModernSelectOption, ModernSelectProps} from "@/components/ui/select/ModernSelect";
// import BaseInput, {BaseInputProps} from "@/components/ui/input/BaseInput";
// import {CSSProperties, useEffect, useMemo} from "react";
// import countryCodes from "@/assets/data/countryCodes.json";
// import {Formik} from "@/utilities/Types";
// import {FormikValues} from "formik";
//
// export type BasePhoneNumberInputProps<T extends FormikValues> = {
//     formik: Formik<T>;
//     inputName?: string;
//     label?: string;
//     labelStyle?: CSSProperties,
//     selectInputName?: string
//     customFullPhoneNumberInputName?: string
//     selectProps?: ModernSelectProps,
//     baseInputProps?: Omit<BaseInputProps<T>, "formik" | "name">
//     inputPlaceholder?: string
// } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
//
// const BasePhoneNumberInput = <T extends FormikValues>({
//                                                           label,
//                                                           labelStyle,
//                                                           formik,
//                                                           selectInputName = "countryCode",
//                                                           inputName = "phoneNumber",
//                                                           customFullPhoneNumberInputName,
//                                                           selectProps,
//                                                           baseInputProps,
//                                                           inputPlaceholder,
//                                                           ...props
//                                                       }: BasePhoneNumberInputProps<T>) => {
//     const selectInputValue = formik.values[selectInputName] || "+234"; // Default country code
//     const baseInputValue = customFullPhoneNumberInputName ? formik.values[customFullPhoneNumberInputName] : formik.values[inputName] || "";
//     // const customFullPhoneNumberInputValue = customFullPhoneNumberInputName ? formik.values[customFullPhoneNumberInputName] : "";
//
//     const countryCodesSelectOption: ModernSelectOption[] = useMemo(() => {
//         return countryCodes.map((countryCode): ModernSelectOption => ({
//             label: countryCode.dial_code,
//             value: countryCode.dial_code,
//         }));
//     }, []);
//
//     useEffect(() => {
//         if (customFullPhoneNumberInputName && !baseInputValue) {
//             formik.setFieldValue(customFullPhoneNumberInputName, selectInputValue)
//             // formik.setFieldValue(customFullPhoneNumberInputName, "+234")
//         }
//     }, []);
//
//     // Effectively handle changes based on the presence of customFullPhoneNumberInputName
//     const handleSelectChange = (option: string, prevSelectedOptionValue: string | undefined) => {
//         prevSelectedOptionValue = prevSelectedOptionValue || selectInputValue
//         // prevSelectedOptionValue = prevSelectedOptionValue || "+234"
//         if (customFullPhoneNumberInputName) {
//             console.log(option, prevSelectedOptionValue)
//             // formik.setFieldValue(customFullPhoneNumberInputName, baseInputValue);
//             formik.setFieldValue(customFullPhoneNumberInputName, option + baseInputValue?.toString().slice(prevSelectedOptionValue?.toString().length));
//         } else {
//             formik.setFieldValue(selectInputName, option?.toString());
//         }
//     };
//
//     const handlePhoneNumberChange = (value: string) => {
//         if (customFullPhoneNumberInputName) {
//             formik.setFieldValue(customFullPhoneNumberInputName, value);
//             // formik.setFieldValue(customFullPhoneNumberInputName, selectInputValue + value);
//         } else {
//             formik.setFieldValue(inputName, value?.toString());
//         }
//     };
//
//     return (
//         <div className={"baseInput-overall-container"} {...props}>
//             {label && (
//                 <label className={`baseLabel subtitle`} style={labelStyle}>
//                     {label}
//                 </label>
//             )}
//             <div className={"form-input-flex-group"}>
//                 <ModernSelect
//                     selectOptions={countryCodesSelectOption}
//                     placeholderLabel={selectInputValue}
//                     onOptionSelect={handleSelectChange}
//                     {...selectProps}
//                 />
//                 <BaseInput
//                     name={customFullPhoneNumberInputName ?? inputName}
//                     formik={formik}
//                     error={customFullPhoneNumberInputName ? formik.errors[customFullPhoneNumberInputName] && String(formik.errors[customFullPhoneNumberInputName]) : inputName ? formik.errors[inputName] && String(formik.errors[inputName]) : ""}
//                     {...baseInputProps}
//                     inputProps={{
//                         type: "text",
//                         pattern: "\\d{0,10}",
//                         // maxLength: 10,
//                         placeholder: inputPlaceholder,
//                         onInput: (e) => {
//                             const target = e.target as HTMLInputElement;
//                             const cleanedValue = target.value.replace(/[^0-9]/g, '');
//                             handlePhoneNumberChange(cleanedValue);
//                         },
//                         onBlur: (e) => {
//                             if (customFullPhoneNumberInputName) {
//                                 formik.setFieldTouched(customFullPhoneNumberInputName);
//                                 //         formik.setFieldValue(customFullPhoneNumberInputName, selectInputValue + baseInputValue);
//                             }
//                             formik.handleBlur(e);
//                         },
//                         ...baseInputProps?.inputProps,
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default BasePhoneNumberInput;
