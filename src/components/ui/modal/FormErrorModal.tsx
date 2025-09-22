import BaseModalLayout from "@/components/layouts/BaseModalLayout";
import {Typography} from "qore-components";
import {StringUtil} from "@/utilities/stringUtil";
import PaddedErrorIcon from "@/components/icon/PaddedErrorIcon";

type FormErrorModalData = {
    [key: string]: string[]
}
export type FormErrorModalProps = {
    errors?: FormErrorModalData;
}
const FormErrorModal = ({errors}: FormErrorModalProps) => {
    // const errorModal = useModal(ModalEnum.FormErrorModal);
    // const error = errorModal.data?.errors as FormErrorModalData
    // console.log("error in ErrorModal: ", error)
    return (
        <BaseModalLayout startIcon={PaddedErrorIcon} modalTitle={"Error"}
                         modalSubtitle={`The following error${errors && Object.entries(errors)?.length ? "s" : ""} occurred`}
                         childrenContainerStyle={{display: 'flex', flexDirection: "column", gap: "1.5rem"}}>
            {
                errors && Object.entries(errors)?.map(([key, value], index) => {
                    return (<div key={index}>
                            <Typography size={"md"}
                                        weight={"medium"}>{StringUtil.convertToSentenceCase(key)}</Typography>
                            <div style={{display: 'flex', flexDirection: "column", gap: ".25rem"}}>
                                {value.map((val, index) => {
                                    return (<Typography key={index}>{val}</Typography>)
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </BaseModalLayout>
    )
}

export default FormErrorModal
