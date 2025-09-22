import {CSSProperties} from "react";
import {Typography} from "qore-components";

export type TitleSubtitleCardProps = {
    title?: string;
    subtitle?: string;
    titleStyle?: CSSProperties;
    subtitleStyle?: CSSProperties;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const TitleSubtitleCard = ({title, subtitle, titleStyle, subtitleStyle, ...props}: TitleSubtitleCardProps) => {

    return (
        <div {...props}>
            {title && <Typography variant={"display"} size={"sm"} weight={"medium"}
                                  style={{...titleStyle}}>{title}</Typography>}
            {subtitle &&
                <Typography variant={"text"} weight={"regular"}
                            style={{color: "var(--color-gray-500)", ...subtitleStyle}}>{subtitle}</Typography>}
        </div>
    )
}
export default TitleSubtitleCard
