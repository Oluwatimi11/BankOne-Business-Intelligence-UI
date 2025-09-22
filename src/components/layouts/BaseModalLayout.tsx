import React, {CSSProperties, SVGProps} from "react";
import BaseButton, {BaseButtonProps} from "@/components/ui/button/BaseButton";
import BaseAvatar, {BaseAvatarProps} from "@/components/ui/avatar/BaseAvatar";
import {CloseIcon, Typography} from "qore-components";
import styles from "./baseModalLayout.module.scss";

export type BaseModalLayoutProps = {
    modalTitle?: string;
    modalTitleStyle?: CSSProperties;
    modalHeaderStyle?: CSSProperties;
    modalSubtitle?: string;
    modalSubtitleStyle?: CSSProperties;
    modalTextHeaderStyle?: CSSProperties;
    endBtnProps?: BaseButtonProps;
    startBtnProps?: BaseButtonProps;
    startAvatarProps?: BaseAvatarProps;
    startIcon?: React.FC<SVGProps<SVGSVGElement>>;
    startIconProps?: React.SVGProps<SVGSVGElement>;
    startIconStyle?: CSSProperties;
    endIcon?: React.FC<SVGProps<SVGSVGElement>>;
    endIconProps?: React.SVGProps<SVGSVGElement>;
    endIconStyle?: CSSProperties;
    textAlign?: "left" | "center" | "right";
    childrenContainerStyle?: CSSProperties;
    showCloseIcon?: boolean;
    onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const BaseModalLayout = ({
                             startIcon: StartIcon,
                             endIcon: EndIcon,
                             startBtnProps,
                             endBtnProps,
                             ...props
                         }: BaseModalLayoutProps) => {
    // Determine which icon to use for the end position
    const FinalEndIcon = props.showCloseIcon ? CloseIcon : EndIcon;

    return (
        <div
            {...props}
            className={`${styles.container} ${props.className || ""}`}
            style={{
                ...props.style
            }}
        >
            {/* Header Section */}
            <div
                className={styles.header}
                style={{
                    ...props.modalHeaderStyle
                }}
            >
                {/* Start Icon */}
                {StartIcon && (
                    <StartIcon
                        {...props.startIconProps}
                        style={{...props.startIconStyle}}
                    />
                )}

                {/* Avatar */}
                {props.startAvatarProps && (
                    <BaseAvatar {...props.startAvatarProps} />
                )}

                {/* Title/Subtitle Area */}
                <div
                    className={styles.headerText}
                    style={{
                        ...props.modalTextHeaderStyle
                    }}
                >
                    {props.modalTitle && (
                        <Typography
                            size="lg"
                            weight={"semibold"}
                            style={{
                                ...props.modalTitleStyle
                            }}
                        >
                            {props.modalTitle}
                        </Typography>
                    )}

                    {props.modalSubtitle && (
                        <Typography
                            className={styles.subtitle}
                            style={{
                                ...props.modalSubtitleStyle
                            }}
                        >
                            {props.modalSubtitle}
                        </Typography>
                    )}
                </div>

                {/* End Icon */}
                {FinalEndIcon && (
                    <FinalEndIcon
                        {...props.endIconProps}
                        onClick={props.showCloseIcon
                            ? props.onClose
                            : props.endIconProps?.onClick
                        }
                        style={{
                            color: "var(--color-gray-500)",
                            cursor: "pointer",
                            ...props.endIconStyle
                        }}
                    />
                )}
            </div>

            {/* Content Section */}
            {props.children && (
                <div
                    className={styles.content}
                    style={{
                        borderBottom: (startBtnProps || endBtnProps)
                            ? "1px solid var(--gray--2)"
                            : "",
                        ...props.childrenContainerStyle
                    }}
                >
                    {props.children}
                </div>
            )}

            {/* Footer Section */}
            {(startBtnProps || endBtnProps) && (
                <div className={styles.footer}>
                    <BaseButton
                        size="small"
                        variant="secondary"
                        {...startBtnProps}
                        style={{flex: 1, ...startBtnProps?.style}}
                        textStyle={{...startBtnProps?.textStyle}}
                    />

                    <BaseButton
                        size="small"
                        variant="primary"
                        {...endBtnProps}
                        style={{flex: 1, ...endBtnProps?.style}}
                    />
                </div>
            )}
        </div>
    );
};

export default BaseModalLayout;

// import React, {CSSProperties, SVGProps} from "react";
// import BaseButton, {BaseButtonProps} from "@/components/ui/button/BaseButton";
// import BaseAvatar, {BaseAvatarProps} from "@/components/ui/avatar/BaseAvatar";
// import {CloseIcon, Typography} from "qore-components";
//
// export type BaseModalLayoutProps = {
//     modalTitle?: string;
//     modalTitleStyle?: CSSProperties;
//     modalHeaderStyle?: CSSProperties;
//     modalSubtitle?: string;
//     modalSubtitleStyle?: CSSProperties;
//     modalTextHeaderStyle?: CSSProperties;
//     endBtnProps?: BaseButtonProps;
//     startBtnProps?: BaseButtonProps;
//     startAvatarProps?: BaseAvatarProps;
//     startIcon?: React.FC<SVGProps<SVGSVGElement>>
//     startIconProps?: React.FC<React.SVGProps<SVGSVGElement>>
//     startIconStyle?: CSSProperties,
//     endIcon?: React.FC<SVGProps<SVGSVGElement>>
//     endIconProps?: React.FC<React.SVGProps<SVGSVGElement>>
//     endIconStyle?: CSSProperties,
//     textAlign?: "left" | "center" | "right";
//     childrenContainerStyle?: CSSProperties;
//     showCloseIcon?: boolean;
//     onClose?: () => void;
// } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
//
// const BaseModalLayout = ({
//                              startIcon: StartIcon,
//                              endIcon: EndIcon,
//                              startBtnProps,
//                              endBtnProps,
//                              ...props
//                          }: BaseModalLayoutProps) => {
//     EndIcon = props?.showCloseIcon ? CloseIcon : EndIcon
//     return (
//         <div {...props}
//              style={{
//                  display: "flex",
//                  flexDirection: "column",
//                  width: "100%",
//                  height: "100%",
//                  // width: "90vw",
//                  // maxHeight: "90vh",
//                  // gap: "1rem",
//                  backgroundColor: "var(--color-white)",
//                  // overflowY: "auto",
//                  // overflowX: "hidden",
//                  ...props?.style
//              }}>
//             <div style={{
//                 display: "flex",
//                 // alignItems: "flex-start",
//                 gap: "1rem",
//                 // flex: 1,
//                 position: "sticky",
//                 top: 0,
//                 zIndex: 500,
//                 backgroundColor: "inherit",
//                 borderBottom: "1px solid var(--gray--2)",
//                 padding: "1rem",
//                 ...props?.modalHeaderStyle
//             }}>
//                 {StartIcon && <StartIcon {...props?.startIconProps} style={{...props?.startIconStyle}}/>}
//                 {props?.startAvatarProps &&
//                     <BaseAvatar {...props?.startAvatarProps}/>
//                 }
//                 <div style={{textAlign: props?.textAlign || "left", flex: 1, ...props?.modalTextHeaderStyle}}>
//                     {props?.modalTitle && <Typography size={"lg"} className={""} style={{
//                         fontWeight: 600,
//                         ...props?.modalTitleStyle
//                     }}>{props?.modalTitle}</Typography>}
//                     {props?.modalSubtitle && <p className={"label subtitle"} style={{
//                         color: "gray",
//                         // flex: 1,
//                         // ...props?.modalSubtitleStyle
//                     }}>{props?.modalSubtitle}</p>}
//                 </div>
//                 {EndIcon && <EndIcon {...props?.endIconProps}
//                                      onClick={props?.showCloseIcon ? props?.onClose : props?.endIconProps?.onClick}
//                                      style={{color: "var(--color-gray-500)", ...props?.endIconStyle}}/>}
//             </div>
//
//             {props?.children && <div style={{
//                 // padding: "0rem 1em",
//                 borderBottom: startBtnProps && endBtnProps ? "1px solid var(--gray--2)" : "",
//                 overflowY: "auto",
//                 width: "100%",
//                 ...props?.childrenContainerStyle
//             }}>
//                 {props?.children}
//             </div>
//             }
//             {startBtnProps && endBtnProps && <div style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//                 gap: "1.5rem",
//                 // padding: "1rem",
//             }}>
//                 <BaseButton size={"small"} variant={"secondary"}  {...startBtnProps}
//                             style={{flex: 1, ...startBtnProps?.style}}
//                             textStyle={{color: "black", ...startBtnProps?.textStyle}}/>
//
//                 <BaseButton size={"small"} variant={"primary"} {...endBtnProps}
//                             style={{flex: 1, ...endBtnProps?.style}}/>
//             </div>}
//
//         </div>
//     )
// }
//
// export default BaseModalLayout
