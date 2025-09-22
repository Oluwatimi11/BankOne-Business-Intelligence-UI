import "@/components/ui/form/form.css"

export type BaseFormLayoutProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
const BaseFormLayout = ({children, ...props}: BaseFormLayoutProps) => {
    return (
        <form {...props} style={{display: "flex", flexDirection: "column", gap: '1.5rem', ...props?.style}}>
            {children}
        </form>
    )
}

export default BaseFormLayout
