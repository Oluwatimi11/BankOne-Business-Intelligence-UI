import React, {useState} from "react";
import ConfirmationModalLayout, {ConfirmationModalLayoutProps} from "@/components/layouts/confirmationModalLayout";

export type ConfirmationModalProps = ConfirmationModalLayoutProps;
const ConfirmationModal = ({...props}: ConfirmationModalProps) => {
    const [loading, setLoading] = useState(false);
    const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        if (props?.endBtnProps?.onClick) {
            setLoading(true);
            await props?.endBtnProps?.onClick?.(e);
            setLoading(false);
        }
    }
    return (
        <ConfirmationModalLayout {...props}
                                 endBtnProps={{...props?.endBtnProps, onClick: onClick, isLoading: loading,}}/>
    );
};

export default ConfirmationModal;


// import BaseModal from "@/components/ui/modal/BaseModal";
// import useModal from "@/utilities/hooks/useModal";
// import BaseModalLayout from "@/components/layouts/BaseModalLayout";
// import {ModalEnum} from "@/utilities/enums/modalEnum";
//
// const ConfirmationModal = () => {
//
//     const confirmationModal = useModal(ModalEnum.ConfirmationModal)
//
//     const handleShouldConfirm = (option: boolean) => {
//         confirmationModal.submit({shouldConfirm: option})
//     }
//
//     const modalTitle = confirmationModal.data?.modalTitle ?? "";
//     const modalSubTitle = confirmationModal.data?.modalSubTitle ?? "";
//     // const modalLoading = confirmationModal.data?.modalLoading ?? false;
//
//     return (
//         <BaseModal
//             blurBackground={true}
//             showCloseIcon={false}
//             styles={{modal: {maxWidth: "500px"}}}
//         >
//             <BaseModalLayout modalTitle={modalTitle} modalSubtitle={modalSubTitle}
//                              startBtnProps={{
//                                  textStyle: {textAlign: "center"},
//                                  text: "No",
//                                  variant: "secondary",
//                                  size: "small",
//                                  onClick: () => handleShouldConfirm(false)
//                              }}
//                              endBtnProps={{
//                                  textStyle: {textAlign: "center"},
//                                  text: "Yes",
//                                  variant: "primary",
//                                  size: "small",
//                                  // isLoading: modalLoading,
//                                  onClick: () => handleShouldConfirm(true)
//                              }}
//
//             />
//         </BaseModal>
//     )
// }
//
// export default ConfirmationModal
