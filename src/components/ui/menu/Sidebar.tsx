"use client"
import "../container/container.css"
import "./menu.css"
import {SVGProps, useState} from "react";
import BaseToast from "@/components/ui/toast/BaseToast";
import {sidebarBottomMenuConfig, sidebarItemsConfig} from "@/utilities/data/sidebarData";
import {usePathname, useRouter} from "next/navigation";
import DropdownIcon from "@/components/icon/DropdownIcon";


export type SidebarItemProps = {
    moduleName?: string;
    moduleItems: {
        title: string;
        icon?: React.FC<SVGProps<SVGSVGElement>>;
        component?: React.ReactElement;
        tabRoute?: string;
        onClick?: () => void;
    }[]
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface CollapsibleSidebarProps {
    allowMultiple?: boolean;
    defaultOpenModules?: string[];
}

const SidebarItem = ({
                         moduleItems,
                         moduleName,
                         isOpen,
                         onToggle,
                         ...props
                     }: SidebarItemProps & {
    isOpen: boolean;
    onToggle: () => void;
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (tabRoute?: string, onClick?: () => void, title?: string) => {
        if (!tabRoute && !onClick && title?.toLowerCase() != "api docs") {
            BaseToast({type: "info", message: `${title} >> Coming Soon`})
        }
        tabRoute && router.push(tabRoute);
        onClick?.()
    };
    return (
        <div {...props} className={`sidebar-module ${props?.className}`}>
            {moduleName && (
                <div
                    className="sidebar-module-header"
                    onClick={onToggle}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onToggle()}
                >
                    <p className="sidebar-module-title">{moduleName.toUpperCase()}</p>
                    <DropdownIcon type={isOpen ? 'opened' : 'closed'}/>
                </div>
            )}

            <div className={`module-items ${isOpen ? 'open' : ''}`}>
                {moduleItems.map(({icon: Icon, title, tabRoute, onClick}, index) => (
                    <div
                        key={index}
                        className={`sidebar-link ${pathname === tabRoute ? 'current' : ''}`}
                        onClick={() => handleNavigation(tabRoute, onClick, title)}
                    >
                        <div className="sidebar-link-title-icon-container">
                            {Icon && <Icon className="icon"/>}
                            {title && <p>{title}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Sidebar = ({allowMultiple = true, defaultOpenModules = []}: CollapsibleSidebarProps) => {
    const [openModules, setOpenModules] = useState<string[]>(defaultOpenModules);

    const handleModuleToggle = (moduleName: string) => {
        setOpenModules(prev => {
            if (allowMultiple) {
                return prev.includes(moduleName)
                    ? prev.filter(name => name !== moduleName)
                    : [...prev, moduleName];
            }
            return prev.includes(moduleName) ? [] : [moduleName];
        });
    };

    return (
        <div className="sidebar-container">
            <div className="sidebar-menu">
                <div style={{padding: "0px 1rem"}}>
                    Company Logo
                    {/*<CompanyLogo style={{cursor: "pointer", width: 150}}/>*/}
                </div>

                {sidebarItemsConfig.map((sidebarItem, index) => (
                    <SidebarItem
                        key={index}
                        {...sidebarItem}
                        isOpen={openModules.includes(sidebarItem.moduleName || '')}
                        onToggle={() => sidebarItem.moduleName &&
                            handleModuleToggle(sidebarItem.moduleName)}
                    />
                ))}
            </div>

            <div className="sidebar-bottom">
                {sidebarBottomMenuConfig.map((sidebarItem, index) => (
                    <SidebarItem
                        key={index}
                        {...sidebarItem}
                        isOpen={openModules.includes(sidebarItem.moduleName || '')}
                        onToggle={() => sidebarItem.moduleName &&
                            handleModuleToggle(sidebarItem.moduleName)}
                    />
                ))}
            </div>
        </div>
    );
};

// "use client"
// import "../container/container.css"
// import "./menu.css"
// import {SVGProps} from "react";
// import BaseToast from "@/components/ui/toast/BaseToast";
// import {sidebarBottomMenuConfig, sidebarItemsConfig} from "@/utilities/data/sidebarData";
// import {usePathname, useRouter} from "next/navigation";
// import CompanyLogo from "@/components/icon/CompanyLogo";

// export type SidebarItemProps = {
//     moduleName?: string;
//     moduleItems: {
//         title: string;
//         icon?: React.FC<SVGProps<SVGSVGElement>>;
//         component?: React.ReactElement;
//         tabRoute?: string;
//         onClick?: () => void;
//     }[]
// } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
//
//
// const SidebarItem = ({moduleItems, moduleName, ...props}: SidebarItemProps) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const handleDashboardComponentNavigation = (tabRoute: string | undefined, onClick: (() => void) | undefined, title: string) => {
//         if (!tabRoute && !onClick && title?.toLowerCase() != "api docs") {
//             BaseToast({type: "info", message: `${title} >> Coming Soon`})
//         }
//         tabRoute && router.push(tabRoute);
//         onClick?.()
//     }
//     return (
//         <div>
//             {moduleName &&
//                 <p className={"sidebar-module-title"}>{moduleName.toUpperCase()}</p>}
//             {
//                 moduleItems.map(({icon: Icon, title, tabRoute, onClick}, index) => {
//                     return (
//                         <div key={index}
//                              className={`sidebar-link ${pathname == tabRoute ? "current" : ""} ${props?.className}`}
//                              {...props}
//                              onClick={() => handleDashboardComponentNavigation(tabRoute, onClick, title)}>
//                             <div className={"sidebar-link-title-icon-container"}>
//                                 {Icon && <Icon className={"icon"}
//                                                style={{
//                                                    fontSize: "14px",
//                                                    // color: "white",
//                                                }}/>}
//                                 {title && <p>{title}</p>}
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }
//
//
// const Sidebar = () => {
//     return (
//         <div className={"sidebar-container"}>
//             <div className={"sidebar-menu"}>
//                 <div style={{padding: "0px 1rem"}}>
//                     <CompanyLogo style={{cursor: "pointer", width: 150}}/>
//                     {/*<CustomerBusinessCard/>*/}
//                 </div>
//                 {sidebarItemsConfig.map((sidebarItem, index) => {
//                     return <SidebarItem key={index} {...sidebarItem}/>
//                 })}
//             </div>
//             <div>
//                 {
//                     sidebarBottomMenuConfig.map((sidebarItem, index) => {
//                         return (
//                             <SidebarItem key={index} moduleItems={sidebarItem.moduleItems}/>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }
export default Sidebar
