import React, {CSSProperties, useEffect, useRef, useState} from "react";
import DropdownIcon from "@/components/icon/DropdownIcon";
import {usePopper} from 'react-popper';
import './select.css';
import BaseInput from "@/components/ui/input/BaseInput";
import {FormikValues, useFormik} from "formik";
import SearchIcon from "@/components/icon/SearchIcon";
import DOMPurify from "dompurify";
import {Formik} from "@/utilities/types";
import CloseIcon from "@/components/icon/CloseIcon";

export type  SearchableSelectOption = {
    value: string;
    label: string;
    labelDescription?: string;
    startImage?: string;
    startImageUrl?: string;
    endImage?: string;
    endImageUrl?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    labelStyle?: CSSProperties;
    labelDescriptionStyle?: CSSProperties;
    optionContainerStyle?: CSSProperties
}

export type SearchableSelectProps<T extends FormikValues> = {
    placeholderLabel?: string;
    label?: string;
    labelStyle?: CSSProperties,
    helperText?: string;
    helperTextProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {
        isLoading?: boolean
    },
    selectOptions: SearchableSelectOption[];
    onOptionSelect?: (option: SearchableSelectOption) => void;
    theme?: "dark" | "light";
    size?: "x-small" | "small" | "medium" | "large";
    error?: string,
    onSearchTermChange?: (searchTerm: string) => void;
    name: string;
    formik: Formik<T>
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const SearchableSelect = <T extends FormikValues>({
                                                      label,
                                                      labelStyle,
                                                      helperText,
                                                      helperTextProps,
                                                      selectOptions,
                                                      onSearchTermChange,
                                                      onOptionSelect,
                                                      placeholderLabel = " ",
                                                      theme = "light",
                                                      size = "medium",
                                                      error,
                                                      name,
                                                      formik, ...props
                                                  }: SearchableSelectProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const searchableSelectValue = formik.values[name];
    const [selectedOption, setSelectedOption] = useState<SearchableSelectOption | null>(selectOptions?.find((option) => option.value == searchableSelectValue) || null);
    useEffect(() => {
        const newValue = selectOptions?.find((option) => option.value == searchableSelectValue);
        setSelectedOption(newValue || null)
    }, [searchableSelectValue]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    // const [searchTerm, setSearchTerm] = useState('');
    const themeClass = theme == "dark" ? "is-dark" : "is-light";
    const selectSize = size == "x-small" ? "is-x-small" : size == "small" ? "is-small" : size == "medium" ? "is-medium" : "is-large";

    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: 'bottom-end', // You can change this as needed
    });

    const searchableSelectFormik = useFormik({
        initialValues: {searchTerm: ""},
        onSubmit: () => {
        }
    });


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // setSearchTerm('');
            searchableSelectFormik.setFieldValue("searchTerm", "")
        }
    };

    const handleSelectOption = (option: SearchableSelectOption) => {
        if (name) {
            formik?.setFieldValue(name, option.value)
        }
        // setSelectedOption(option);
        onOptionSelect?.(option);
    };

    const filteredOptions = selectOptions.filter((option) =>
        (option.label?.toLowerCase().includes(searchableSelectFormik.values.searchTerm.toLowerCase()) || option.labelDescription?.toLowerCase().includes(searchableSelectFormik.values.searchTerm.toLowerCase()))
    );


    useEffect(() => {
        if (searchableSelectFormik.values.searchTerm) {
            onSearchTermChange?.(searchableSelectFormik.values.searchTerm)
        }
    }, [searchableSelectFormik.values.searchTerm]);

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
        }}>
            {
                label && (
                    <label className={`baseLabel subtitle`}
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(label)}}
                           style={{...labelStyle}}/>
                )
            }
            <div className={`searchableSelect dropdown-container ${themeClass} ${props?.className}`}
                 ref={dropdownRef} {...props}>
                <div
                    className={`searchableSelect dropdown-header ${selectSize}  subtitle`}
                    ref={setReferenceElement}
                >
                    <div style={{display: "flex", alignItems: "center", gap: "1rem", flex: 1}}
                         onClick={handleToggleDropdown}>
                        {formik.values[name] &&
                            <span className="dropdown-arrow">{<DropdownIcon
                                type={isOpen ? "opened" : "closed"}/>}</span>}
                        {selectedOption ? (
                            <div className="selected-option ">
                                {selectedOption.startImage &&
                                    <span style={{height: "100%"}}>{selectedOption.startImage} </span>}
                                {selectedOption.startImageUrl &&
                                    <img src={selectedOption.startImageUrl} alt={selectedOption.label}
                                         style={{width: "15px", height: "100%"}}/>}
                                <span style={{fontWeight: 400, fontSize: ".875rem"}}>{selectedOption.label}</span>
                                {selectedOption.endImage &&
                                    <span style={{width: "15px", height: "100%"}}>{selectedOption.endImage} </span>}
                                {selectedOption.endImageUrl &&
                                    <img src={selectedOption.endImageUrl} alt={selectedOption.label}
                                         style={{width: "15px", height: "100%"}}/>}
                            </div>
                        ) : (
                            <p
                                style={{
                                    color: "gray",
                                    fontWeight: 400,
                                    fontSize: ".875rem",
                                    width: "100%", height: "100%",
                                }}>{placeholderLabel} <span style={{visibility: "hidden"}}>k</span></p>
                        )}
                    </div>
                    {!formik.values[name] &&
                        <span className="dropdown-arrow" onClick={handleToggleDropdown}>{<DropdownIcon
                            type={isOpen ? "opened" : "closed"}/>}</span>}
                    {formik.values[name] && <span>{<CloseIcon style={{width: "1rem", height: "1rem"}} onClick={() => {
                        formik.setFieldValue(name, "")
                    }}/>}</span>}
                </div>
                {isOpen && (
                    <div
                        className={`searchableSelect dropdown-list ${selectSize}`}
                        ref={setPopperElement}
                        style={{...styles.popper}}
                        {...attributes.popper}
                    >
                        <div style={{
                            padding: ".5em 1em",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 1001
                        }}>
                            <BaseInput formik={searchableSelectFormik} name={"searchTerm"} startIcon={SearchIcon}
                                       inputProps={{placeholder: "Search", autoComplete: "off",}}
                                       containerStyle={{position: "sticky", top: 0}}/>
                        </div>
                        <div style={{padding: "0 1em", display: "flex", flexDirection: "column", gap: ".5rem"}}>
                            {filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`dropdown-item ${selectSize} ${searchableSelectValue == option.value ? "active" : ""}`}
                                    style={{...option.optionContainerStyle}}
                                    onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                        setIsOpen(false);
                                        searchableSelectFormik.setFieldValue("searchTerm", "");
                                        !option.onClick && handleSelectOption(option);
                                        option?.onClick?.(event as React.MouseEvent<HTMLDivElement>);
                                    }}
                                >
                                    {option.startImage &&
                                        <span style={{height: "100%"}}>{option.startImage} </span>}
                                    {option.startImageUrl && <img src={option.startImageUrl} alt={option.label}
                                                                  style={{width: "15px", height: "100%"}}/>}
                                    <div>
                                        <p style={{...option.labelStyle}}>
                                            {option.label}
                                        </p>
                                        <p className={"subtitle label"} style={{...option.labelDescriptionStyle}}>
                                            {option.labelDescription}
                                        </p>
                                    </div>
                                    {option.endImage &&
                                        <span style={{width: "15px", height: "100%"}}>{option.endImage} </span>}
                                    {option.endImageUrl && <img src={option.endImageUrl} alt={option.label}
                                                                style={{width: "15px", height: "100%"}}/>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {helperText && (
                <p {...helperTextProps}
                   className={`helperText baseInput-helper-text ${helperTextProps?.className}`}>
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

            {/*{error && (*/}
            {/*    <p className={"error-text"}>*/}
            {/*        {error}*/}
            {/*    </p>*/}
            {/*)*/}
            {/*}*/}
        </div>
    );
};

export default SearchableSelect
