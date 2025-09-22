import BaseRubiesCard, {BaseRubiesCardProps} from "@/components/ui/card/BaseRubiesCard";
import RightArrowIcon from "@/components/icon/RightArrowIcon";
import "./card.css"

type SelectRubiesSignupCard = { title: string; subtitle: string, baseRubiesCardProps?: BaseRubiesCardProps }
const SelectRubiesSignupCard = ({title, subtitle, baseRubiesCardProps, ...props}: SelectRubiesSignupCard) => {
    return (
        <BaseRubiesCard {...baseRubiesCardProps}>
            <div className="" style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between"
            }}  {...props}>
                <div className={""}>
                    <div className="" style={{fontWeight: 500}}>{title}</div>
                    <p className="label subtitle">{subtitle}.</p>
                </div>
                <div className="" style={{width: "100%", justifyContent: "flex-end", display: "flex"}}>
                    <div style={{
                        border: "1px solid var(--gray--3)",
                        borderRadius: "50%",
                        width: "56px",
                        height: "56px",
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <RightArrowIcon style={{color: baseRubiesCardProps?.variant == "dark" ? "white" : "black"}}/>
                    </div>
                </div>
            </div>
        </BaseRubiesCard>
    )
}

export default SelectRubiesSignupCard
