import {BaseButton, BaseButtonProps} from "qore-components";
import BaseFormLayout from "@/components/layouts/BaseFormLayout";
import {FormikConfig, FormikValues, useFormik} from "formik";
import {BaseUtil} from "@/utilities/baseUtil";
import {ReactNode, useEffect, useState} from "react";
import {BaseResponse} from "@/utilities/types";
import BaseToast from "../toast/BaseToast";

export interface BaseCreateOrUpdateFormProps<T, CreateRequest, UpdateRequest> {
    initialValues: T; // Initial values can be of type CreateRequest, UpdateRequest
    onSuccessfulSubmission?: () => void;
    submitBtnProps?: BaseButtonProps;
    isUpdate?: boolean;
    validationSchema: any; // Consider using a more specific type
    createAction: (request: CreateRequest) => Promise<BaseResponse>;
    updateAction: (request: UpdateRequest) => Promise<BaseResponse>;
    readAction: () => Promise<BaseResponse>;
    children?: React.ReactNode;
    renderFields?: (formik: FormikValues) => ReactNode; // New way - render prop pattern
}

const BaseCreateOrUpdateForm = <T, CreateRequest, UpdateRequest>({
                                                                     initialValues,
                                                                     onSuccessfulSubmission,
                                                                     submitBtnProps,
                                                                     isUpdate = false,
                                                                     validationSchema,
                                                                     createAction,
                                                                     updateAction,
                                                                     readAction,
                                                                     children,
                                                                     renderFields,
                                                                 }: BaseCreateOrUpdateFormProps<T, CreateRequest, UpdateRequest>) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit: FormikConfig<any>["onSubmit"] = async (values) => {
        try {
            const castedValues = validationSchema?.cast?.(values, {stripUnknown: true});
            setIsLoading(true);
            const response = isUpdate
                ? await updateAction(castedValues)
                : await createAction(castedValues)
            setIsLoading(false);
            if (BaseUtil.isResponseSuccessful(response)) {
                BaseToast({type: "success", message: "Success"});
                await readAction()
                onSuccessfulSubmission?.();
            }
        } catch {
            BaseToast({type: "error", message: "Operation failed"});
        } finally {
            setIsLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
        enableReinitialize: true
    });

    useEffect(() => {
        console.log("formik.values: ", formik.values["dateCreated"], formik.errors, !!(formik.touched["dateCreated"] && formik.errors["dateCreated"]))
    }, [formik.values, formik.errors]);


    return (
        <BaseFormLayout onSubmit={formik.handleSubmit}>
            {renderFields ? renderFields(formik) : children}
            <BaseButton
                type="submit"
                text={isUpdate ? "Update" : "Create"}
                isLoading={isLoading}
                {...submitBtnProps}
            />
        </BaseFormLayout>
    );
};


export default BaseCreateOrUpdateForm
