import {CSSProperties, SVGProps, useState} from "react";
import "./accordion.css"
import DropdownIcon from "@/components/icon/DropdownIcon";
import CloseIcon from "@/components/icon/CloseIcon";

export type BaseAccordionProps = {
    expandMultiple?: boolean;
    accordionItems: {
        title: string, message?: string;
        customItemComponent?: React.ReactNode;
        accordionStyle?: CSSProperties;
        headerStyle?: CSSProperties;
        expandIcon?: React.FC<SVGProps<SVGSVGElement>>;
        collapseIcon?: React.FC<SVGProps<SVGSVGElement>>;
        iconPosition?: "start" | "end"
    }[];
    defaultExpandedIndex?: number;
    expandByDefault?: boolean
    customHeader?: React.ReactElement;
};

const BaseAccordion = ({
                           expandMultiple = false, // Default to single expansion
                           accordionItems,
                           // customHeader: CustomHeader,
                           // customItemComponent: CustomItemComponent,
                           defaultExpandedIndex = 0,
                           expandByDefault = true,
                       }: BaseAccordionProps) => {
    const [activeExpandedAccordionIndex, setActiveExpandedAccordionIndex] = useState<number[]>(expandByDefault ? [defaultExpandedIndex >= 0 ? defaultExpandedIndex : 0] : [-1]);


    const handleToggleAccordionOpen = (index: number) => {
        setActiveExpandedAccordionIndex((prevActiveIndex) => {
            if (prevActiveIndex.includes(index)) {
                // If the index is already active, remove it from the active list
                return prevActiveIndex.filter((i) => i !== index);
            } else {
                // Add the index to the active list
                if (expandMultiple) {
                    return [...prevActiveIndex, index];
                } else {
                    // Only one index can be active at a time
                    return [index];
                }
            }
        });
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "1.5rem"}}>
            {accordionItems?.map((accordionItem, index) => {
                    const CollapseIcon = accordionItem?.collapseIcon ?? <DropdownIcon type={"opened"}/>;
                    const ExpandIcon = accordionItem?.expandIcon ?? <DropdownIcon type={"closed"}/>;
                    return (
                        <div
                            className={"accordion"}
                            key={index}
                            style={{
                                display: "flex", flexDirection: "column", gap: "1rem",

                                // padding: ".625rem 1rem .625rem 1.25rem",
                                // border: "1px solid #0a0f2914",
                                // backgroundColor: "white",
                                ...accordionItem?.accordionStyle
                            }}

                        >
                            < div className={"subtitle"} onClick={() => handleToggleAccordionOpen(index)}
                                  style={{
                                      display: "flex",
                                      width: "100%",
                                      alignItems: "center",
                                      gap: "1rem",
                                      padding: ".625rem 1rem .625rem 1.25rem",
                                      // justifyContent: "space-between",
                                      backgroundColor: "white",
                                      borderRadius: ".25em",
                                      // flexDirection: accordionItem?.iconPosition == "start" ? "row" : "row-reverse",
                                      ...accordionItem?.headerStyle
                                  }}>
                                {activeExpandedAccordionIndex.includes(index) ?
                                    (CollapseIcon ? CollapseIcon as React.ReactNode :
                                        <CloseIcon animated={true} className={"icon"}/>)
                                    :
                                    (ExpandIcon && ExpandIcon as React.ReactNode)
                                }
                                <p style={{
                                    color: "var(--gray--5)",
                                    fontWeight: 600,
                                }}>{accordionItem.title}</p>
                            </div>
                            {
                                accordionItem?.customItemComponent && activeExpandedAccordionIndex.includes(index) && accordionItem?.customItemComponent
                            }

                            {!accordionItem?.customItemComponent && activeExpandedAccordionIndex.includes(index) && accordionItem.message && (
                                <p style={{
                                    whiteSpace: "pre", textWrap: "wrap",
                                    overflowWrap: "break-word",
                                }}
                                   className={`accordion-content subtitle label ${activeExpandedAccordionIndex.includes(index) ? 'expanded' : ''}`}>
                                    {accordionItem.message}
                                </p>
                            )}
                        </div>
                    )
                }
            )
            }
        </div>
    );
};

export default BaseAccordion;
