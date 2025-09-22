import React, {CSSProperties} from 'react';
import BasePopup, {BasePopupProps} from "@/components/ui/popup/BasePopup";
import "./popup.css"

export type MenuOptionsPopupProps = Omit<BasePopupProps, 'children'> & {
    menuOptions: { optionName: string, onClick: (data: any) => void; optionStyle?: CSSProperties }[]
    data: any;
}

const MenuOptionsPopup: React.FC<MenuOptionsPopupProps> = ({menuOptions, data, ...props}) => {
    return (
        <BasePopup {...props}>
            <div style={{
                backgroundColor: "white",
                borderRadius: ".5em",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                minWidth: "150px",
            }}>
                {menuOptions?.map((menuOption, index) => (
                    <div
                        className={"menuOption"}
                        key={index}
                        onClick={() => {
                            menuOption.onClick(data);
                            props?.onClose?.();
                        }}
                        style={{
                            padding: "10px",
                            color: "black",
                            fontSize: ".875rem",
                            cursor: "pointer",
                            ...menuOption?.optionStyle,
                        }}
                    >
                        {menuOption.optionName}
                    </div>
                ))}
            </div>
        </BasePopup>
    );
}

export default MenuOptionsPopup;
