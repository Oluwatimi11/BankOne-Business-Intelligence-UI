import BaseCreateOrUpdateForm from "@/components/ui/form/BaseCreateOrUpdateForm";
import {BaseButtonProps} from "qore-components";
import {ReactNode} from "react";

export interface BaseProductFormConfig<CreateRequest, UpdateRequest> {
    // Store actions
    createAction: (request: CreateRequest) => any;
    updateAction: (request: UpdateRequest) => any;
    readAction: () => any;

    // Validation schemas
    createValidationSchema: any;
    updateValidationSchema: any;

    // Initial values
    createInitialValues: CreateRequest;
    updateInitialValues: UpdateRequest;
}

export interface BaseProductFormProps<T, CreateRequest, UpdateRequest> {
    initialValues?: T;
    onSuccessfulSubmission?: () => void;
    submitBtnProps?: BaseButtonProps;
    isUpdate?: boolean;
    config: BaseProductFormConfig<CreateRequest, UpdateRequest>;
    renderFields: (formik: any) => ReactNode;
}

const BaseProductForm = <T, CreateRequest, UpdateRequest>({
                                                              initialValues,
                                                              onSuccessfulSubmission,
                                                              submitBtnProps,
                                                              isUpdate = false,
                                                              config,
                                                              renderFields
                                                          }: BaseProductFormProps<T, CreateRequest, UpdateRequest>) => {
    const {
        createAction,
        updateAction,
        readAction,
        createValidationSchema,
        updateValidationSchema,
        createInitialValues,
        updateInitialValues
    } = config;

    const finalInitialValues = initialValues ||
        (isUpdate ? updateInitialValues : createInitialValues);

    return (
        <BaseCreateOrUpdateForm
            initialValues={finalInitialValues}
            onSuccessfulSubmission={onSuccessfulSubmission}
            submitBtnProps={submitBtnProps}
            isUpdate={isUpdate}
            validationSchema={isUpdate ? updateValidationSchema : createValidationSchema}
            createAction={createAction}
            updateAction={updateAction}
            readAction={readAction}
            renderFields={renderFields}
        />
    );
};

export default BaseProductForm;
