// "use client"
//
// import {Modal} from 'react-responsive-modal';
// import {ModalProps} from "react-responsive-modal/src";
// import {useDispatch} from "react-redux";
// import {modalStore} from "@/stores/modalStore";
// import 'react-responsive-modal/styles.css';
//
// export type BaseModalProps = { onClose?: () => void; blurBackground?: boolean } & Omit<ModalProps, "onClose" | "open">
// const BaseModal = (props: BaseModalProps) => {
//     const dispatch = useDispatch();
//
//     const handleClose = () => {
//         dispatch(modalStore.mutation.closeModal());
//         props?.onClose?.();
//     };
//     return (
//         <Modal center={true} open={true}  {...props}
//                styles={{
//                    ...props?.styles,
//                    modal: {borderRadius: ".5em", width: "90%", maxWidth: "650px", ...props?.styles?.modal},
//                    overlay: {backdropFilter: `blur(${props?.blurBackground ? 4 : 0}px)`, ...props?.styles?.overlay},
//                }}
//                onClose={handleClose}>
//             {props?.children}
//         </Modal>
//     )
// }
// export default BaseModal
