import Switch, {ReactSwitchProps} from "react-switch";

export type BaseSwitchProps = ReactSwitchProps

const BaseSwitch = (props: BaseSwitchProps) => {
    return (
        <Switch checkedIcon={false} uncheckedIcon={false} {...props}/>
    )
}
export default BaseSwitch
