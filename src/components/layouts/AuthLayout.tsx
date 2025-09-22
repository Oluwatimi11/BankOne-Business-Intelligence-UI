import "./layout.css"
import Header, {HeaderProps} from "@/components/ui/menu/Header";

type AuthLayoutProps = {
    children: React.ReactNode,
    headerProps: HeaderProps;
    title: string;
    subtitle?: string;
    mainContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const AuthLayout = ({children, headerProps, title, subtitle, mainContainerProps, ...props}: AuthLayoutProps) => {
    return (
        <div className={"base-container auth-container"}  {...props}>
            <Header type={headerProps.type}/>
            <main {...mainContainerProps}
                  className={`authLayout-main-container`}>
                <div className={"authLayout-title-container"}>
                    <h4>{title}</h4>
                    {subtitle &&
                        (<p className={"bodyText"}>
                            {subtitle}
                        </p>)
                    }
                </div>
                {children}
            </main>
        </div>
    )
}

export default AuthLayout
