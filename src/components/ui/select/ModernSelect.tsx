"use client"

import React, {CSSProperties, useEffect, useRef, useState} from "react";
import DropdownIcon from "@/components/icon/DropdownIcon";
import {usePopper} from 'react-popper';
import './select.css';


export type  ModernSelectOption = {
    value: string;
    label: string;
    startImage?: string;
    startImageUrl?: string;
    endImage?: string;
    endImageUrl?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    labelStyle?: CSSProperties;
    optionContainerStyle?: CSSProperties
}

export type ModernSelectProps = {
    placeholderLabel?: string;
    selectOptions: ModernSelectOption[];
    onOptionSelect?: (option: string, prevSelectedOption?: string) => void;
    theme?: "dark" | "light";
    size?: "x-small" | "small" | "medium" | "large";
    error?: string,
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const ModernSelect: React.FC<ModernSelectProps> = ({
                                                              selectOptions,
                                                              onOptionSelect,
                                                              placeholderLabel = "Click to Select",
                                                              theme = "light",
                                                              size = "medium",
                                                              error, ...props
                                                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ModernSelectOption | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const themeClass = theme == "dark" ? "is-dark" : "is-light";
    const selectSize = size == "x-small" ? "is-x-small" : size == "small" ? "is-small" : size == "medium" ? "is-medium" : "is-large";

    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: 'bottom-end', // You can change this as needed
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

    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key.length === 1) {
                    setSearchTerm(prevTerm => prevTerm + event.key);
                }
                if (event.key === 'Backspace') {
                    setSearchTerm(prevTerm => prevTerm.slice(0, -1));
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen]);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setSearchTerm('');
        }
    };

    const handleSelectOption = (option: ModernSelectOption) => {
        setSelectedOption(option);
        onOptionSelect?.(String(option?.value), (selectedOption?.value || ""));
    };

    const filteredOptions = selectOptions.filter((option) =>
        option.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`dropdown-container ${themeClass} ${props?.className}`} ref={dropdownRef} {...props}>
            <div
                className={`dropdown-header ${selectSize}`}
                onClick={handleToggleDropdown}
                ref={setReferenceElement}
            >
                {selectedOption ? (
                    <div className="selected-option">
                        {selectedOption.startImage &&
                            <span style={{height: "100%"}}>{selectedOption.startImage} </span>}
                        {selectedOption.startImageUrl &&
                            <img src={selectedOption.startImageUrl} alt={selectedOption.label}
                                 style={{width: "15px", height: "100%"}}/>}
                        <span>{selectedOption.label}</span>
                        {selectedOption.endImage &&
                            <span style={{width: "15px", height: "100%"}}>{selectedOption.endImage} </span>}
                        {selectedOption.endImageUrl && <img src={selectedOption.endImageUrl} alt={selectedOption.label}
                                                            style={{width: "15px", height: "100%"}}/>}
                    </div>
                ) : (
                    <span>{placeholderLabel}</span>
                )}
                <span className="dropdown-arrow">{<DropdownIcon type={isOpen ? "opened" : "closed"}/>}</span>
            </div>
            {isOpen && (
                <div
                    className={`dropdown-list ${selectSize}`}
                    ref={setPopperElement}
                    style={{...styles.popper}}
                    {...attributes.popper}
                >
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`dropdown-item ${selectSize}`}
                            style={{...option.optionContainerStyle}}
                            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                setIsOpen(false);
                                setSearchTerm('');
                                !option.onClick && handleSelectOption(option);
                                option?.onClick?.(event as React.MouseEvent<HTMLDivElement>);
                            }}
                        >
                            {option.startImage &&
                                <span style={{height: "100%"}}>{option.startImage} </span>}
                            {option.startImageUrl && <img src={option.startImageUrl} alt={option.label}
                                                          style={{width: "15px", height: "100%"}}/>}
                            <span style={{...option.labelStyle}}>
                                {option.label}
                            </span>
                            {option.endImage && <span style={{width: "15px", height: "100%"}}>{option.endImage} </span>}
                            {option.endImageUrl && <img src={option.endImageUrl} alt={option.label}
                                                        style={{width: "15px", height: "100%"}}/>}
                        </div>
                    ))}
                </div>
            )}
            {error && (
                <p className={"error-text"}>
                    {error}
                </p>
            )
            }
        </div>
    );
};
