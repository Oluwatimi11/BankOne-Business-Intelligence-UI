"use client"

import React, {useMemo} from "react";
import BaseButton from "@/components/ui/button/BaseButton";
import AngleLeftIcon from "@/components/icon/AngleLeftIcon";
import AngleRightIcon from "@/components/icon/AngleRightIcon";

type BaseTablePaginationPanelProps = {
    currentPage: number;
    numberOfPages: number;
    handlePrevPageClick: () => void;
    handleNextPageClick: () => void;
    handleGoToPage: (pageNo: number) => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const BaseTablePaginationPanel: React.FC<BaseTablePaginationPanelProps> = ({
                                                                               currentPage,
                                                                               numberOfPages,
                                                                               handlePrevPageClick,
                                                                               handleNextPageClick,
                                                                               handleGoToPage,
                                                                               ...divProps
                                                                           }) => {
    const pageRange = useMemo(() => {
        // Maximum number of page buttons to show
        const MAX_PAGES = 5;
        const pages: (number | string)[] = [];

        // If total pages are less than or equal to MAX_PAGES, show all
        if (numberOfPages <= MAX_PAGES) {
            return Array.from({length: numberOfPages}, (_, i) => i);
        }

        // Calculate the range of pages to show around the current page
        const halfRange = Math.floor((MAX_PAGES - 2) / 2);
        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(numberOfPages - 2, currentPage + halfRange);

        // Adjust range for edge cases
        if (currentPage < halfRange + 1) {
            start = 1;
            end = MAX_PAGES - 2;
        } else if (currentPage >= numberOfPages - halfRange - 2) {
            start = numberOfPages - MAX_PAGES + 1;
            end = numberOfPages - 2;
        }

        pages.push(0);
        // Add ellipsis if needed at the start
        if (start > 1) {
            pages.push("start-ellipsis");
        }

        // Add middle pages
        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
            // Add ellipsis if needed at the end
            if ((i == end)) {
                pages.push("end-ellipsis");
            }
        }
        // Always include first and last pages
        pages.push(numberOfPages - 1);


        // Sort the pages, keeping special markers in place
        return pages.sort((a, b) => {
            if (typeof a === "string") return 1;
            if (typeof b === "string") return 1;
            return a - b;
        });
    }, [currentPage, numberOfPages]);

    return (
        <div
            {...divProps}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                width: "100%"
            }}
        >
            <BaseButton
                onClick={handlePrevPageClick}
                text="Prev"
                startIcon={AngleLeftIcon}
                size={"x-small"}
                style={{backgroundColor: "white", color: "black", border: "1px solid var(--gray--1)"}}
                disabled={currentPage === 0}
            />

            <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                {pageRange.map((page, index) => {
                    if (page === "start-ellipsis" || page === "end-ellipsis") {
                        return (
                            <div
                                key={`ellipsis-${index}`}
                                style={{
                                    color: "var(--gray--3)",
                                    margin: "0 0.25rem"
                                }}
                            >
                                ...
                            </div>
                        );
                    }

                    return (
                        <div
                            key={page}
                            onClick={() => handleGoToPage(page as number)}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "2.5em",
                                height: "2.5em",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                backgroundColor: currentPage === page
                                    ? "white"
                                    : "transparent",
                                color: currentPage === page
                                    ? "black"
                                    : "var(--gray--3)",
                                border: currentPage === page
                                    ? "1px solid var(--gray--2)"
                                    : "1px solid transparent",
                                transition: "all 0.2s ease-in-out"
                            }}
                        >
                            {(page as number) + 1}
                        </div>
                    );
                })}
            </div>

            <BaseButton
                onClick={handleNextPageClick}
                text="Next"
                endIcon={AngleRightIcon}
                size={"x-small"}
                style={{backgroundColor: "white", color: "black", border: "1px solid var(--gray--1)"}}
                disabled={currentPage === numberOfPages - 1}
            />
        </div>
    );
};

export default BaseTablePaginationPanel;
