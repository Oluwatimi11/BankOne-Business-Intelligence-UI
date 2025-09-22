
"use client"
import { ModalEnum } from "@/utilities/enums/modalEnum";
import ViewTableRowDetailModal from "@/components/ui/modal/ViewTableRowDetailModal";
import ConfirmationModal from "@/components/ui/modal/ConfirmationModal";
import FormErrorModal from "@/components/ui/modal/FormErrorModal";
import { useModalRegistrations } from "qore-components";
import "./globalModal.css"

// import CreateOrUpdateChequeBooksModal from "@/components/ui/modal/CreateOrUpdateChequeBooksModal";
// import CreateOrUpdateChequeBookStocksModal from "@/components/ui/modal/CreateOrUpdateChequeBookStocksModal";
// import CreateOrUpdateChequeLeavesModal from "@/components/ui/modal/CreateOrUpdateChequeLeavesModal";
// import CreateOrUpdateReturnedChequesModal from "@/components/ui/modal/CreateOrUpdateReturnedChequesModal";

const GlobalModal = () => {
    useModalRegistrations([
        {
            key: ModalEnum.ConfirmationModal,
            component: ConfirmationModal,
            defaultConfig: { backdrop: 'blur', position: 'center' }
        },
        {
            key: ModalEnum.ViewTableRowDetailModal,
            component: ViewTableRowDetailModal,
            defaultConfig: {
                backdrop: 'blur',
                position: 'center',
                containerClassName: "viewTableRowDetailModal",
            }
        },

        // {
        //     key: ModalEnum.CreateOrUpdateChequeBooksModal,
        //     component: CreateOrUpdateChequeBooksModal,
        //     defaultConfig: {
        //         backdrop: 'blur',
        //         position: 'center',
        //         closeOnBackdropClick: true,
        //         containerClassName: "createOrUpdateChequeBooksModal",
        //     }
        // },
        // {
        //     key: ModalEnum.CreateOrUpdateChequeBookStocksModal,
        //     component: CreateOrUpdateChequeBookStocksModal,
        //     defaultConfig: {
        //         backdrop: 'blur',
        //         position: 'center',
        //         closeOnBackdropClick: true,
        //         containerClassName: "createOrUpdateChequeBookStocksModal",
        //     }
        // },
        // {
        //     key: ModalEnum.CreateOrUpdateChequeLeavesModal,
        //     component: CreateOrUpdateChequeLeavesModal,
        //     defaultConfig: {
        //         backdrop: 'blur',
        //         position: 'center',
        //         closeOnBackdropClick: true,
        //         containerClassName: "createOrUpdateChequeLeavesModal",
        //     }
        // },
        // {
        //     key: ModalEnum.CreateOrUpdateReturnedChequesModal,
        //     component: CreateOrUpdateReturnedChequesModal,
        //     defaultConfig: {
        //         backdrop: 'blur',
        //         position: 'center',
        //         closeOnBackdropClick: true,
        //         containerClassName: "createOrUpdateReturnedChequesModal",
        //     }
        // },
        {
            key: ModalEnum.FormErrorModal,
            component: FormErrorModal,
            defaultConfig: { backdrop: 'blur', position: 'center' }
        }
    ]);
    return <></>
}
export default GlobalModal
