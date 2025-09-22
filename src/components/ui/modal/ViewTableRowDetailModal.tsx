
import BaseModalLayout from "@/components/layouts/BaseModalLayout";
import {BaseButton, BaseButtonProps, TrashIcon, useModal} from "qore-components";
import EditIcon from "@/components/icon/EditIcon";
import {ModalEnum} from "@/utilities/enums/modalEnum";
import DetailListCard from "@/components/ui/card/DetailListCard";
import styles from "./viewTableRowDetailModal.module.scss";


export type ViewTableRowDetailModalProps = {
data: Record<string, string | number | boolean>;
editBtnProps?: BaseButtonProps;
deleteBtnProps?: BaseButtonProps;
};

const ViewTableRowDetailModal = ({
data,
editBtnProps,
deleteBtnProps
}: ViewTableRowDetailModalProps) => {
const viewTableRowDetailModal = useModal(ModalEnum.ViewTableRowDetailModal);

const dateFields = ["dateCreated"]
const detailsList = Object.entries(data)?.map(([key, value]) => ({
label: key,
value: dateFields.includes(key) ? Number(value) : value
}));

const closeModal = () => viewTableRowDetailModal.close();

return (
<BaseModalLayout
modalTitle="Row Details"
showCloseIcon
onClose={closeModal}
style={{padding: "1.5rem", gap: "1rem"}}
modalTitleStyle={{
fontSize: "var(--font-size-lg)",
fontWeight: "var(--font-weight-medium)"
}}
modalHeaderStyle={{
alignItems: "center",
padding: 0,
border: 0,
position: "relative"
}}
>
<div className={styles.modalContentContainer}>
<DetailListCard
items={detailsList}
title="General Information"
/>

{(editBtnProps || deleteBtnProps) && (
<div className={styles.actionButtons}>
{deleteBtnProps && (
<BaseButton
text="Delete"
size="medium"
variant="secondary"
startIcon={TrashIcon}
{...deleteBtnProps}
onClick={(e) => {
closeModal();
deleteBtnProps?.onClick?.(e);
}}
/>
)}
{editBtnProps && (
<BaseButton
text="Edit"
size="medium"
variant="secondary"
startIcon={EditIcon}
{...editBtnProps}
onClick={(e) => {
closeModal();
editBtnProps?.onClick?.(e);
}}
/>
)}
</div>
)}
</div>
</BaseModalLayout>
);
};

export default ViewTableRowDetailModal;

