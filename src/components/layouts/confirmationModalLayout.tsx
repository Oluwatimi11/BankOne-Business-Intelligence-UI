import React from "react";
import styles from "./confirmationModalLayout.module.scss";
import {
    BaseButton,
    BaseButtonProps,
    CloseIcon,
    IconWrapper,
    IconWrapperProps,
    PaddedErrorIcon,
    PaddedWarningIcon,
    SuccessTickIcon,
    Typography,
    useModal
} from "qore-components";
import {ModalEnum} from "@/utilities/enums/modalEnum";


export type ConfirmationModalVariants = "warning" | "error" | "success" | "default"

export interface ConfirmationModalLayoutProps {
    title: string;
    variant?: ConfirmationModalVariants;
    subtitle?: string;
    startBtnProps?: BaseButtonProps;
    endBtnProps?: BaseButtonProps;
}

const ConfirmationModalLayout = ({
                                     variant = "success",
                                     title,
                                     subtitle,
                                     startBtnProps,
                                     endBtnProps,
                                 }: ConfirmationModalLayoutProps) => {

    const iconWrapperVariants: Record<ConfirmationModalVariants, Pick<IconWrapperProps, "backgroundColor" | "iconColor" | "outlineColor" | "icon">> = {
        success: {
            iconColor: "var(--color-success-600)",
            backgroundColor: "var(--color-success-100)",
            outlineColor: "var(--color-warning-50)",
            icon: <SuccessTickIcon/>
        },
        warning: {
            iconColor: "var(--color-warning-600)",
            backgroundColor: "var(--color-warning-100)",
            outlineColor: "var(--color-warning-50)",
            icon: <PaddedWarningIcon/>
        },
        error: {
            iconColor: "var(--color-error-600)",
            backgroundColor: "var(--color-error-100)",
            outlineColor: "var(--color-warning-50)",
            icon: <PaddedErrorIcon/>
        },
        default: {
            iconColor: "var(--color-gray-600)",
            backgroundColor: "var(--color-gray-100)",
            outlineColor: "var(--color-warning-50)",
            icon: <SuccessTickIcon/>
        },
    }

    const confirmationModal = useModal(ModalEnum.ConfirmationModal);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <IconWrapper iconColor={"var(--color-warning-600)"}
                             backgroundColor={"var(--color-warning-100)"}
                             outlineColor={"var(--color-warning-50)"}
                             size={48}
                             {...iconWrapperVariants[variant]}
                />
                <CloseIcon onClick={() => confirmationModal.close()}/>
            </div>
            <div className={styles.content}>
                <Typography size={"lg"} className={styles.title}>{title}</Typography>
                {subtitle && <Typography className={styles.subtitle}>{subtitle}</Typography>}
            </div>
            <div className={styles.buttons}>
                <BaseButton
                    variant="secondary"
                    {...startBtnProps}
                    onClick={(e) => {
                        startBtnProps?.onClick?.(e);
                    }}
                />
                <BaseButton
                    variant={"primary"}
                    {...endBtnProps}
                    style={{
                        backgroundColor: variant == "error" ? "#d92d20" : endBtnProps?.style?.backgroundColor,
                        ...endBtnProps?.style
                    }}
                    onClick={(e) => {
                        endBtnProps?.onClick?.(e);
                    }}
                />

            </div>
        </div>
    );
};

export default ConfirmationModalLayout;
