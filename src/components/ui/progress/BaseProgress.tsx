import ProgressBar, {ProgressBarProps} from "@ramonak/react-progress-bar";

export type BaseProgressProps = {
    startProgressLabel?: string;
    endProgressLabel?: string;
    currentProgressValue: number;
    maximumProgressValue?: number;
    additionalProgressOptions?: Omit<ProgressBarProps, "completed" | "maxCompleted">
}
const BaseProgress = ({
                          startProgressLabel,
                          endProgressLabel,
                          currentProgressValue,
                          maximumProgressValue,
                          additionalProgressOptions
                      }: BaseProgressProps) => {
    return (<div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
        <ProgressBar completed={currentProgressValue}
                     maxCompleted={maximumProgressValue}
                     bgColor={"var(--green--3)"}
                     isLabelVisible={false} {...additionalProgressOptions}/>
        <div style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center"
        }}>
            {startProgressLabel && <p className={"label subtitle"}>{startProgressLabel}</p>}
            {endProgressLabel && <p className={"label subtitle"}>{endProgressLabel}</p>}
        </div>
    </div>)
}
export default BaseProgress
