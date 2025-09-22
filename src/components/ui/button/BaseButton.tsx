"use client"

import React, {CSSProperties, SVGProps} from "react";
// import {ThemeUtil} from "@/utilities/ThemeUtil";
// import {SvgProps} from "react-native-svg";
// import {Typography} from "../typography";
import "./button.css"
import {RotatingLines} from "react-loader-spinner";

export type BaseButtonProps = {
    variant?: "primary" | "secondary" | "outlined";
    startIcon?: React.FC<SVGProps<SVGSVGElement>>;
    endIcon?: React.FC<SVGProps<SVGSVGElement>>;
    textIcon?: React.FC<SVGProps<SVGSVGElement>>;
    text?: string;
    isLoading?: boolean;
    textStyle?: CSSProperties;
    iconStyle?: CSSProperties;
    endIconStyle?: CSSProperties;
    textIconStyle?: CSSProperties;
    startIconStyle?: CSSProperties;
    style?: CSSProperties;
    size?: "x-small" | "small" | "medium" | "large";
    onClick?: () => void;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const BaseButton = ({
                        text = "",
                        variant = "primary",
                        startIcon: StartIcon,
                        endIcon: EndIcon,
                        // textIcon: TextIcon,
                        textStyle,
                        iconStyle,
                        endIconStyle,
                        startIconStyle,
                        // textIconStyle,
                        style,
                        size = "medium",
                        disabled,
                        onClick,
                        isLoading,
                        ...props
                    }: BaseButtonProps) => {
    // const indicator = props.type === "bordered" ? ThemeUtil.color.primaryColor : ThemeUtil.color.white;
    const buttonVariant = variant == "primary" ? "is-primary" : variant == "secondary" ? "is-secondary" : "is-outlined";
    const buttonSize = size == "x-small" ? "is-x-small" : size == "small" ? "is-small" : size == "medium" ? "is-medium" : "is-large";
    const styles = {
        button: {
            // backgroundColor: disabled ? ThemeUtil.themeColor.content.disabled : ThemeUtil.color.primaryColor,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            // borderRadius: ThemeUtil.radius.medium,
            paddingVertical: 15,
            gap: 10,
            // minHeight: 50,
            // flex: 1,
            width: "100%",
            // fontFamily: ThemeUtil.fontFamily.brFirma_regular_bold,
            // ...(style as ViewStyle),
        },
        textIconDiv: {
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
        },
        buttonText: {
            // color: ThemeUtil.themeColor.content.inverted,
            // fontSize: 15,
            // marginLeft: 5,
            // marginRight: 5,
            // flex: StartIcon || EndIcon || TextIcon ? 0 : 1,
            // backgroundColor: 'red',
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            // fontFamily: ThemeUtil.fontFamily.brFirma_medium_bold,
            ...textStyle
        },
        icon: {
            // color: ThemeUtil.themeColor.content.primary,
            ...iconStyle,
        },
    };

    return (
        <button
            type={"submit"}
            className={`baseButton button ${buttonVariant} ${buttonSize} `}
            // style={{...(styles.button)}}
            disabled={disabled || isLoading}
            onClick={onClick}
            {...props}
            style={{position: "relative", minWidth: "max-content", maxWidth: "100%", ...style}}
        >
            {StartIcon && (
                <StartIcon
                    style={{
                        ...styles.icon,
                        // position: "absolute",
                        // top: -styles.buttonText.fontSize / 2,
                        left: 0,
                        ...startIconStyle
                    }}
                    width={35}
                    height={35}
                />
                //
                // <View style={{width: 30, height: 10, ...startIconStyle}}>
                //     <StartIcon width={"100%"} height={"100%"} style={{...styles.icon}}/>
                // </View>
            )}
            {/*{isLoading ? (*/}
            {/*        <RotatingLines*/}
            {/*            // height={"20"}*/}
            {/*            width={"20"}*/}
            {/*            // colors={["#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d",]}*/}
            {/*            strokeWidth="5"*/}
            {/*            animationDuration="0.75"*/}
            {/*            ariaLabel="rotating-lines-loading"*/}
            {/*            // wrapperStyle={{}}*/}
            {/*            // wrapperClass=""*/}
            {/*            visible={true}*/}
            {/*        />*/}
            {/*    ) :*/}
            <div style={{
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                // fontFamily: ThemeUtil.fontFamily.brFirma_medium_bold,
            }}>
                {isLoading ? (
                    <RotatingLines
                        // height={"20"}
                        width={"20"}
                        // colors={["#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d", "#4fa94d",]}
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        // wrapperStyle={{}}
                        // wrapperClass=""
                        visible={true}
                    />
                ) : text ? <p style={{...textStyle}}>{text}</p> : <></>
                }
            </div>
            {EndIcon && !isLoading && (
                <EndIcon
                    style={{
                        ...styles.icon,
                        // position: "absolute",
                        top: 0,
                        right: 0,
                        ...endIconStyle
                    }}
                    width={35}
                    height={35}
                />
            )}
        </button>
    );
};
export default BaseButton
