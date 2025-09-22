import {useSelector} from "react-redux";
import {ModalEnum} from "@/utilities/enums/modalEnum";
import {modalUtil} from "@/utilities/modalUtil";
import {RootState} from "@/stores"; // or wherever your store is
import {modalStore} from "@/stores/modalStore";
import {store} from "@/configs/storeConfig";

/**
 * A hook that exposes an .open() method returning a Promise,
 * powered by the underlying modalUtil.
 */
export default function useModal(targetModalType: ModalEnum, onClose?: () => void) {
    // Check which modal is currently open from Redux
    const {modalType, isOpen, data, modalId} = useSelector(
        (state: RootState) => state.modal
    );

    /**
     * Open the modal with optional data, returning a Promise
     * that resolves with user-submitted data or rejects on cancel.
     */
    async function open<T = any>(data?: any): Promise<T> {
        return modalUtil.openModal<T>(targetModalType, data);
    }

    /**
     * Optionally close the modal from the calling component.
     * Usually you'd let the user do it from the modal's UI, though.
     */
    function close() {
        if (modalId) {
            // Typically we'd treat close as a 'cancel' if it's from outside
            modalUtil.cancelModal(modalId);
        } else {
            // fallback
            store.dispatch(modalStore.mutation.closeModal());
        }
        onClose?.();

    }

    function submit(submittedData: any) {
        if (modalId) {
            modalUtil.submitModal(modalId, submittedData)
        }
    }

    // function backToLastOpenModal(data?: any) {
    //     return modalUtil.openModal<T>(targetModalType, data);
    // }


    // We can see if *this* modal is the currently open one
    const isThisModalOpen = isOpen && modalType === targetModalType;

    return {
        isOpen: isThisModalOpen,
        open,    // returns a Promise
        close,
        submit,
        data: isThisModalOpen ? data : null,
        modalId: isThisModalOpen ? modalId : undefined,
    };
}
