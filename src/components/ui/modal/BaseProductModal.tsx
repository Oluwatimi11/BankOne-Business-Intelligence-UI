import useModal from "@/utilities/hooks/useModal";
import {ModalEnum} from "@/utilities/enums/modalEnum";
import BaseModalLayout from "@/components/layouts/BaseModalLayout";
import {BaseButtonProps} from "qore-components";
import {ComponentType} from "react";
import {BaseProductFormProps} from "@/components/ui/form/BaseProductForm";

export interface BaseProductModalConfig<T> {
    modalEnum: ModalEnum;
    createTitle: string;
    updateTitle: string;
    createButtonText: string;
    updateButtonText: string;
    createInitialValues: T;
    updateInitialValues: T;
    FormComponent: ComponentType<Omit<BaseProductFormProps<T, T, T>, "config" | "renderFields">>;
}

export interface BaseProductModalProps<T> {
    isUpdate?: boolean;
    data?: T;
    config: BaseProductModalConfig<T>;
}

const BaseProductModal = <T, >({
                                   isUpdate = false,
                                   data,
                                   config
                               }: BaseProductModalProps<T>) => {
    const {
        modalEnum,
        createTitle,
        updateTitle,
        createButtonText,
        updateButtonText,
        createInitialValues,
        updateInitialValues,
        FormComponent
    } = config;

    const modal = useModal(modalEnum);

    const initialValues = isUpdate
        ? {...updateInitialValues, ...data}
        : createInitialValues;

    const modalTitle = isUpdate ? updateTitle : createTitle;

    const submitBtnProps: BaseButtonProps = {
        text: isUpdate ? updateButtonText : createButtonText
    };

    return (
        <BaseModalLayout modalTitle={modalTitle}>
            <FormComponent
                initialValues={initialValues}
                submitBtnProps={submitBtnProps}
                isUpdate={isUpdate}
                onSuccessfulSubmission={() => modal?.close()}
            />
        </BaseModalLayout>
    );
};

export default BaseProductModal;
