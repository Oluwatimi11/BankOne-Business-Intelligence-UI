'use client';
import './style.scss'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AppSpan, CustomContainer } from '@/style';
import { DropdownOption } from '@/models';

export const Dropdown: React.FC<any> = ({
    trigger,
    options,
    leftMargin = 20,
    rightMargin = 20,
    topMargin = 5,
    bottomMargin = 20,
    width = 19.1,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [popupStyle, setPopupStyle] = useState<React.CSSProperties | null>({});
    const triggerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    const calculatePopupPosition = useCallback(() => {
        if (!triggerRef.current || !popupRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Initial positioning
        let topPosition = triggerRect.bottom + topMargin;
        let leftPosition = triggerRect.left + leftMargin;

        // Adjust left position to keep popup fully visible
        if (leftPosition + popupRect.width > viewportWidth - rightMargin) {
            leftPosition = viewportWidth - popupRect.width - rightMargin;
        }

        // Adjust top position to keep popup fully visible
        if (topPosition + popupRect.height > viewportHeight - bottomMargin) {
            topPosition = triggerRect.top - popupRect.height - bottomMargin;
        }

        setPopupStyle({
            position: 'fixed',
            top: `${topPosition}px`,
            left: `${leftPosition}px`,
            width: `${width}rem`,
            zIndex: 1000,
            opacity: 0,
            visibility: 'hidden',
        });

    }, [leftMargin, rightMargin, topMargin, bottomMargin, width]);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !triggerRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setPopupStyle(null)
            }
        },
        [popupRef, triggerRef]
    );

    useEffect(() => {
        if (isOpen) {
            calculatePopupPosition();
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('resize', calculatePopupPosition);
            window.addEventListener('scroll', calculatePopupPosition);

            setTimeout(() => {
                setPopupStyle((prevStyle) => ({
                    ...prevStyle,
                    opacity: 1,
                    visibility: 'visible',
                }));
            }, 0);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', calculatePopupPosition);
            window.removeEventListener('scroll', calculatePopupPosition);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', calculatePopupPosition);
            window.removeEventListener('scroll', calculatePopupPosition);
        };
    }, [isOpen, calculatePopupPosition, handleClickOutside]);

    const handleSelect = (value: string) => {
        if (onSelect) onSelect(value);
        setIsOpen(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                ref={triggerRef}
                onClick={handleToggle}
                style={{ display: 'inline-block', cursor: 'pointer' }}
            >
                {trigger}
            </div>
            {isOpen && (
                <div
                    ref={popupRef}
                    style={popupStyle!}
                    className="dropdown-content-container show"
                >
                    {options?.map((option: DropdownOption, index: number) => (
                        <CustomContainer
                            $padding={'1'}
                            $minHeight={'3.6'}
                            className="dropdown-item-wrapper"
                            key={index}
                            onClick={() => handleSelect(option.value)}
                        >
                            <AppSpan
                                $fontWeight={'500'}
                                $cursor={'pointer'}
                            >
                                {option.label || option.value}
                            </AppSpan>
                        </CustomContainer>
                    ))}
                </div>
            )}
        </div>
    );
};
