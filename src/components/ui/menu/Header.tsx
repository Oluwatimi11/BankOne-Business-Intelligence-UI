"use client"
import "./menu.css"
import BaseButton from "@/components/ui/button/BaseButton";
import {RouteConstant} from "@/utilities/constants/routeConstant";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/stores";
import IconButton from "@/components/ui/button/IconButton";
import CloseIcon from "@/components/icon/CloseIcon";
import BaseSwitch from "@/components/ui/switch/BaseSwitch";
import {baseStore} from "@/stores/baseStore";
import {AppConfig} from "@/configs/appConfig";
import NotificationBellIcon from "@/components/icon/NotificationBellIcon";
import {useState} from "react";
import {usePopper} from "react-popper";
import CubeIcon from "@/components/icon/CubeIcon";
import BaseAvatar from "@/components/ui/avatar/BaseAvatar";
import StatusIndicator from "@/components/custom/StatusIndicator";
import {AppDispatch} from "@/configs/storeConfig";
import {useRouter} from "next/navigation";

export type HeaderProps = {
    type: "dashboard" | "login" | "signup" | "kyc" | "resetPassword",
    title?: string;
}


const HeaderEndComponent = ({type}: { type: HeaderProps["type"] }) => {
    const DashboardHeader = () => {
        // const authState = useSelector((state: RootState) => state.auth);
        const baseState = useSelector((state: RootState) => state.base);
        const dispatch: AppDispatch = useDispatch();
        const [isOpen, setIsOpen] = useState(false);
        const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
        const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
        const {styles, attributes} = usePopper(referenceElement, popperElement, {
            placement: 'bottom-end', // You can change this as needed
        });

        return (
            <div className={"dashboard-header-end-container header-end-container"}>
                <div style={{display: "flex", alignItems: "center", gap: "2rem"}}>
                    <BaseSwitch width={50} height={22} handleDiameter={14} checked={baseState?.appStage == "Prod"}
                        // disabled={authState?.currentOrganisation?.organisationStatus?.toLowerCase() != "active"}
                                onChange={(checked) => {
                                    // setSwitchToLive(checked);
                                    const appStage: AppConfig["stage"] = checked ? "Prod" : "Dev"
                                    dispatch(baseStore.mutation.setAppStage(appStage))
                                }}/>
                    <div ref={setReferenceElement}>
                        <BaseAvatar icon={<NotificationBellIcon/>} size={20} onClick={() => setIsOpen(!isOpen)}
                                    style={{cursor: "pointer"}}
                                    badge={{
                                        icon: <StatusIndicator status={"error"}/>,
                                        style: {position: "absolute", bottom: "100%",}
                                    }}/>
                    </div>
                    {isOpen &&
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
                            ...styles.popper,
                        }}
                             {...attributes.popper}
                             ref={setPopperElement}
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
                                <p className={"subtitle"} style={{color: "var(--green--3)", cursor: "pointer"}}>View
                                    all</p>
                            </div>

                        </div>}
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "0px"}}>
                    {/*<AvatarIcon className={"icon"} style={{width: "30px", height: "30px"}}/>*/}
                    {/*<ModernSelect*/}
                    {/*    placeholderLabel={StringUtil.convertToSentenceCase(authState?.userInfo?.userFirstName)}*/}
                    {/*    selectOptions={userProfileSelectOptions} size={"small"} transparent*/}
                    {/*/>*/}
                </div>
            </div>
        )
    }
    const router = useRouter();

    if (type == "dashboard") {
        return (<DashboardHeader/>)
    }
    if (type == "login") {
        const handleNavigateToGetStarted = () => {
            router.push(RouteConstant.auth.register.path)
        }
        return (<div className={"header-end-container"}>
            <p className={"label subtitle"}>Dont have an account?</p>
            <BaseButton text={"Open account"} variant={"secondary"} size={"small"}
                        onClick={handleNavigateToGetStarted}/>
        </div>)
    }
    if (type == "signup" || type == "resetPassword") {
        const handleNavigateToLogin = () => {
            router.push(RouteConstant.auth.login.path)
        }
        return (<div className={"header-end-container"}>
            <p className={"label subtitle"}>Already have an account?</p>
            <BaseButton text={"Sign in"} variant={"secondary"} size={"small"}
                        onClick={handleNavigateToLogin}/>
        </div>)
    }
    if (type == "kyc") {
        const handleNavigateBack = () => {
            router.back()
        }
        return (<div className={"header-end-container"}>
            <IconButton icon={CloseIcon} onClick={handleNavigateBack}/>
        </div>)
    }
}

const HeaderStartComponent = ({title, type}: HeaderProps) => {
    // const router.push = useNavigate();

    const handleLogoClick = () => {

    }

    if (type == "dashboard" && title) {
        return (
            <div>
                <p className={"dashboard-header-title"}>{title}</p>
            </div>
        )
    }
    // return (<CompanyLogo style={{cursor: "pointer", width: 150}} onClick={handleLogoClick}/>)

}

const Header = ({
                    type,
                    title,
                    ...props
                }: HeaderProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
    return <header {...props}
                   className={`header ${type == "dashboard" ? "dashboard-header" : ""}  ${props.className}`}>
        <HeaderStartComponent type={type} title={title}/>
        <HeaderEndComponent type={type}/>
    </header>
}


export default Header
