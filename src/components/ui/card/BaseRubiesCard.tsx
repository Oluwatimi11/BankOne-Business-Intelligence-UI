import "./card.css"

export type BaseRubiesCardProps = {
    children?: React.ReactNode,
    variant?: "dark" | "gray",
    orientation?: "portrait" | "landscape",
    isSkeleton?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const BaseRubiesCard = ({children, variant, orientation, isSkeleton, ...props}: BaseRubiesCardProps) => {
    return (
        <div
            className={`baseRubiesCard ${variant == "dark" ? "is-dark" : "is-light"} ${isSkeleton ? "is-skeleton" : ""} ${orientation == "landscape" ? "landscape" : "portrait"}`} {...props}>
            {children}
        </div>
    )

}

export default BaseRubiesCard
