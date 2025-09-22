import BasePopup, {BasePopupProps} from "@/components/ui/popup/BasePopup";
import CubeIcon from "@/components/icon/CubeIcon";

export type NotificationPopupProps = BasePopupProps
const NotificationPopup = (props: NotificationPopupProps) => {

    return (
        <BasePopup referenceElement={props?.referenceElement} isOpen={true} onClose={() => {
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
                maxWidth: "300px",
                backgroundColor: "white",
                borderRadius: "12px",
                zIndex: 1000,
                padding: "1rem",
                marginTop: "10px",
                border: "1px solid var(--gray--2)",
            }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    alignItems: "center",
                }}>
                    <p>Notifications</p>
                    <p className={"subtitle"} style={{color: "var(--green--3)", cursor: "pointer"}}>Mark as
                        read</p>
                </div>
                <div style={{
                    borderTop: "1px solid var(--gray--2)",
                    borderBottom: "1px solid var(--gray--2)",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                    padding: "1rem 0 1rem 0"
                }}>
                    <div style={{display: "flex", alignItems: "flex-start", gap: ".5em"}}>
                        <CubeIcon style={{color: "black", width: "16px", height: "16px"}}/>
                        <div>
                            <div>This is a new notification</div>
                            <div className={"label subtitle"}>11 Jun 2022</div>
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "flex-start", gap: ".5em"}}>
                        <CubeIcon style={{color: "black", width: "16px", height: "16px"}}/>
                        <div>
                            <div>This is a new notification</div>
                            <div className={"label subtitle"}>11 Jun 2022</div>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}>
                    <p className={"subtitle"} style={{color: "var(--green--3)", cursor: "pointer"}}>View all</p>
                </div>

            </div>
        </BasePopup>
    )
}
export default NotificationPopup
