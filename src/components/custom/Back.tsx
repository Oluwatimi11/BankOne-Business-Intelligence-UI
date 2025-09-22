import CircledLeftArrowIcon from "@/components/icon/CircledLeftArrowIcon";
import RouterUtil from "@/utilities/routerUtil";

const Back = () => {
    const goBack = () => {
        RouterUtil.goBack()
    }
    return (
        <div className={"subtitle label"} onClick={goBack}
             style={{display: "flex", alignItems: 'center', gap: '6px', cursor: "pointer"}}><CircledLeftArrowIcon/>
            <p>Back</p></div>
    )
}

export default Back
