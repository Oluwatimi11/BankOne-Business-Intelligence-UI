// import "./menu.css";
// import {navItems} from "@/components/ui/menu/Header";
// import CloseIcon from "@/components/icon/CloseIcon";
// import {useEffect, useState} from "react";
// import {useLocation} from "react-router-dom";
//
// export type WebsiteSidebarProps = {
//     open?: boolean;
//     onClose?: () => void; // Callback when the sidebar closes
// };
//
// const WebsiteSidebar = ({open = false, onClose}: WebsiteSidebarProps) => {
//     const [showSidebar, setShowSidebar] = useState(open);
//     const location = useLocation();
//     const activePage = location?.hash
//
//     const handleCloseSidebar = () => {
//         setShowSidebar(false);
//         onClose?.(); // Trigger parent callback
//     };
//
//     useEffect(() => {
//         setShowSidebar(open);
//     }, [open]);
//
//     return (
//         <>
//             {/* Overlay */}
//             <div
//                 className={`websiteSidebar-overlay ${showSidebar ? "active" : ""}`}
//                 onClick={handleCloseSidebar}
//             />
//             {/* Sidebar */}
//             <div className={`websiteSidebar-container ${showSidebar ? "active" : "inactive"}`}>
//                 <div className="websiteSidebar-header">
//                     <CloseIcon onClick={handleCloseSidebar} style={{cursor: "pointer"}}/>
//                 </div>
//                 <div style={{display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start"}}>
//                     {navItems?.map((navItem, index) => (
//                         <a key={index} className={`header-link ${activePage == navItem?.link ? "active" : ""}`}
//                            href={navItem?.link}
//                            style={{color: activePage == navItem?.link ? "var(--gray--4)" : ""}}
//                         >{navItem?.title}</a>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default WebsiteSidebar;
