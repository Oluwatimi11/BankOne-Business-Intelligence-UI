import React, {CSSProperties, SVGProps} from "react";
import {RotatingLines} from "react-loader-spinner";

export type IconButtonProps = {
    size?: number,
    icon: React.FC<SVGProps<SVGSVGElement>>
    iconStyle?: CSSProperties,
    iconProps?: React.FC<React.SVGProps<SVGSVGElement>>,
    isLoading?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const IconButton = ({size = 30, icon: Icon, iconProps, iconStyle, style, isLoading, ...props}: IconButtonProps) => {
    return (
        <button type={"button"}
                style={{
                    outline: "none",
                    border: "none",
                    backgroundColor: "var(--gray--1)",
                    borderRadius: "10px",
                    height: `${size}px`,
                    width: `${size}px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "7px",
                    ...style
                }} {...props}>
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
            ) : <Icon {...iconProps} style={{...iconStyle}}/>}
        </button>
    )
}

export default IconButton
