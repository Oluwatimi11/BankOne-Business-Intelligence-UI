import {CSSProperties} from "react";
import {DocumentStatusEnum} from "@/utilities/enums/documentStatusEnum";
import {StringUtil} from "@/utilities/stringUtil";
import TrashIcon from "@/components/icon/TrashIcon";
import DownloadIcon from "@/components/icon/DownloadIcon";
import FileFormatsIcon, {FileFormatTypes} from "@/components/icon/FileFormatsIcon";

type FilePreviewProps = {
    file: File | string; // Can be File object or URL string
    status?: string;
    documentReason?: string;
    onDelete?: () => void;
    onDownload?: () => void;
    statusStyle?: CSSProperties;
    containerStyle?: CSSProperties;
};

const FilePreview = ({
                         file,
                         status,
                         documentReason,
                         onDelete,
                         onDownload,
                         statusStyle,
                         containerStyle,
                     }: FilePreviewProps) => {
    const getStatusColor = () => {
        if (!status) return "inherit";
        switch (status.toLowerCase()) {
            case DocumentStatusEnum.PENDING.toLowerCase():
                return "var(--orange--3)";
            case DocumentStatusEnum.APPROVED.toLowerCase():
                return "var(--green--3)";
            default:
                return "red";
        }
    };

    const fileName = typeof file === "string"
        ? StringUtil.convertToSentenceCase(file.slice(file.lastIndexOf("/") + 1))
        : file.name;

    const fileFormat = typeof file === "string"
        ? file.slice(file.lastIndexOf(".") + 1).replace(".", "")
        : file.type.split("/")[1];

    return (
        <div style={{width: "100%", ...containerStyle}}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                border: `1px solid ${getStatusColor()}`,
                borderRadius: ".75rem",
                padding: "1rem",
            }}>
                <FileFormatsIcon fileFormatType={fileFormat as FileFormatTypes}/>
                <div style={{flex: 1, minWidth: 0}}>
                    <p style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {fileName}
                    </p>

                    {status && (
                        <p className="subtitle" style={{color: getStatusColor(), ...statusStyle}}>
                            {StringUtil.convertToSentenceCase(status)}
                        </p>
                    )}
                </div>

                <div style={{display: "flex", gap: "0.5rem"}}>
                    {onDownload && (
                        <DownloadIcon
                            style={{cursor: "pointer"}}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDownload();
                            }}
                        />
                    )}
                    {onDelete && status?.toLowerCase() !== DocumentStatusEnum.APPROVED.toLowerCase() && (
                        <TrashIcon
                            style={{cursor: "pointer"}}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        />
                    )}
                </div>
            </div>

            {documentReason && (
                <p style={{
                    color: status?.toLowerCase() === DocumentStatusEnum.REJECTED.toLowerCase()
                        ? "red"
                        : "inherit",
                    marginTop: "0.5rem"
                }}>
                    {documentReason}
                </p>
            )}
        </div>
    );
};

export default FilePreview
