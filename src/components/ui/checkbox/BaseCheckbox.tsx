import React, {CSSProperties} from "react";
import "@/components/ui/checkbox/checkbox.css"
import {FormikValues} from "formik";
import {Formik} from "@/utilities/types";

export type BaseCheckboxProps<T extends FormikValues> = {
    name: string;
    formik: Formik<T>;
    label?: string;
    labelStyle?: CSSProperties;
    checkboxOptions?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const BaseCheckbox = <T extends FormikValues>(baseCheckboxProps: BaseCheckboxProps<T>) => {
    const {formik, name, label, labelStyle, checkboxOptions, onChange, checked, ...rest} = baseCheckboxProps;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e);
        } else {
            formik.handleChange(e);
        }
    };

    return (
        <div {...rest} className={`baseCheckbox-container ${rest.className || ''}`}
             style={{display: 'flex', alignItems: 'center', ...rest.style}}>
            <input
                {...checkboxOptions}
                id={`${name}ID`}
                style={{display: "block", ...checkboxOptions?.style}}
                type="checkbox"
                name={name}
                checked={checked !== undefined ? checked : formik.values[name]}
                onBlur={formik.handleBlur}
                onChange={handleChange}
            />
            {label && (
                <label className="subtitle" htmlFor={`${name}ID`}
                       style={{display: "block", marginLeft: '8px', ...labelStyle}}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default BaseCheckbox
// import {CSSProperties} from "react";
// import "@/components/ui/checkbox/checkbox.css"
// import {FormikValues} from "formik";
// import {Formik} from "@/utilities/Types";
//
// export type BaseCheckboxProps<T extends FormikValues> = {
//     name: string;
//     formik: Formik<T>;
//     label?: string;
//     labelStyle?: CSSProperties;
//     checkboxOptions?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
//
// const BaseCheckbox = <T extends FormikValues>(baseCheckboxProps: BaseCheckboxProps<T>) => {
//     const formik = baseCheckboxProps?.formik;
//     const name = baseCheckboxProps?.name;
//     const currentValue = formik?.values[name];
//
//     // Determine if the checkbox is checked based on the value
//     const isBaseCheckboxChecked = !!currentValue;
//
//     // // Handle the change event to toggle between "YES" and "NO"
//     // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     formik?.setFieldValue(name, e.target.checked ? "YES" : "NO");
//     // };
//
//     return (
//         <div {...baseCheckboxProps} className={`baseCheckbox-container ${baseCheckboxProps?.className}`}
//              style={{display: 'flex', alignItems: 'center'}}>
//             <input
//                 {...baseCheckboxProps?.checkboxOptions}
//                 id={`${name}ID`}
//                 style={{display: "block", backgroundColor: 'red'}}
//                 type="checkbox"
//                 name={name}
//                 checked={isBaseCheckboxChecked}
//                 onBlur={formik?.handleBlur(name)}
//                 onChange={formik?.handleChange(name)}
//                 // onChange={handleCheckboxChange}
//             />
//             {baseCheckboxProps?.label && (
//                 <label className="subtitle" htmlFor={`${name}ID`}
//                        style={{display: "block", ...baseCheckboxProps?.labelStyle}}>
//                     {baseCheckboxProps?.label}
//                 </label>
//             )}
//         </div>
//     );
// };
//
// export default BaseCheckbox
//
//
// // const BaseCheckbox = <T extends FormikValues>(baseCheckboxProps: BaseCheckboxProps<T>) => {
// //     return (
// //         <div {...baseCheckboxProps} className={`baseCheckbox-container ${baseCheckboxProps?.className}`}
// //              style={{...baseCheckboxProps?.style}}>
// //             <input
// //                 {...baseCheckboxProps?.checkboxOptions}
// //                 id={`${baseCheckboxProps?.name}ID`}
// //                 style={{display: "block"}}
// //                 type="checkbox"
// //                 name={baseCheckboxProps?.name}
// //                 value={baseCheckboxProps?.formik?.values[baseCheckboxProps?.name]}
// //                 onBlur={baseCheckboxProps?.formik?.handleBlur(baseCheckboxProps?.name)}
// //                 onChange={baseCheckboxProps?.formik?.handleChange(baseCheckboxProps?.name)}
// //             />
// //             {baseCheckboxProps?.label &&
// //                 <label className="subtitle" htmlFor={`${baseCheckboxProps?.name}ID`}
// //                        style={{display: "block", ...baseCheckboxProps?.labelStyle}}>{baseCheckboxProps?.label}</label>}
// //         </div>
// //     )
// // }
// // export default BaseCheckbox
