import {DropzoneOptions, useDropzone} from "react-dropzone";
import {CSSProperties, ReactNode} from "react";
import DOMPurify from "dompurify";
import CloudUploadIcon from "@/components/icon/CloudUploadIcon";

export type BaseDropzoneProps = {
    onDrop: (files: File[]) => void;
    label?: string;
    showCloudIcon?: boolean;
    helperText?: string;
    helperTextStyle?: CSSProperties;
    dropzoneOptions?: DropzoneOptions;
    previewContent?: ReactNode;
    error?: string;
    isTouched?: boolean;
    containerStyle?: CSSProperties;
};

const BaseDropzone = ({
                          onDrop,
                          label,
                          showCloudIcon = true,
                          helperText = "Drag files here, or click to upload",
                          helperTextStyle,
                          dropzoneOptions,
                          previewContent,
                          error,
                          isTouched,
                          containerStyle,
                      }: BaseDropzoneProps) => {
    const {getRootProps, getInputProps} = useDropzone({
        ...dropzoneOptions,
        onDrop,
    });

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "0.75rem", ...containerStyle}}>
            {label && <label className="label subtitle">{label}</label>}

            <section
                {...getRootProps({
                    style: {
                        border: "1px solid var(--base-color-neutral--neutral-light)",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        borderStyle: "dashed",
                        cursor: "pointer",
                    },
                })}
            >
                <input {...getInputProps()} aria-label={label || "Upload Files"}/>

                {previewContent || (
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
                        {showCloudIcon && <CloudUploadIcon style={{color: "black"}}/>}
                        <p
                            className="subtitle label"
                            style={helperTextStyle}
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(helperText)}}
                        />
                    </div>
                )}
            </section>

            {isTouched && error && <p className="baseInput-error-text">{error}</p>}
        </div>
    );
};

export default BaseDropzone
