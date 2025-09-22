import {useEffect, useState} from "react";
import {FormikProps} from "formik";
import BaseDropzone, {BaseDropzoneProps} from "./BaseDropzone";
import FilePreview from "./FilePreview";

type FormikDropzoneProps = {
    name: string;
    formik: FormikProps<any>;
    documentStatus?: string;
    documentReason?: string;
    onFileProcess?: (file: File) => Promise<string>; // For server uploads
} & Omit<BaseDropzoneProps, "onDrop" | "previewContent" | "error" | "isTouched">;

const FormikDropzone = ({
                            name,
                            formik,
                            documentStatus,
                            documentReason,
                            onFileProcess,
                            ...baseProps
                        }: FormikDropzoneProps) => {
    const [localFile, setLocalFile] = useState<File | null>(null);

    const handleDrop = async (files: File[]) => {
        const file = files[0];
        if (!file) return;

        // If using server upload
        if (onFileProcess) {
            try {
                const fileUrl = await onFileProcess(file);
                formik.setFieldValue(name, fileUrl);
            } catch (error: any) {
                formik.setFieldError(name, error?.message || "");
            }
        } else {
            // Client-side handling
            formik.setFieldValue(name, file);
            setLocalFile(file);
        }
    };

    const handleDelete = () => {
        formik.setFieldValue(name, "");
        setLocalFile(null);
        URL.revokeObjectURL(formik.values[name]);
    };

    const handleView = () => {
        const url = localFile ? URL.createObjectURL(localFile) : formik.values[name];
        window.open(url, '_blank');
    };

    useEffect(() => {
        return () => {
            if (localFile) URL.revokeObjectURL(URL.createObjectURL(localFile));
        };
    }, [localFile]);

    return (
        <BaseDropzone
            {...baseProps}
            onDrop={handleDrop}
            isTouched={!!formik.touched[name]}
            error={formik.errors[name]?.toString()}
            previewContent={formik.values[name] && (
                <FilePreview
                    file={localFile || formik.values[name]}
                    status={documentStatus}
                    documentReason={documentReason}
                    onDelete={handleDelete}
                    onDownload={handleView}
                />
            )}
        />
    );
};

export default FormikDropzone
