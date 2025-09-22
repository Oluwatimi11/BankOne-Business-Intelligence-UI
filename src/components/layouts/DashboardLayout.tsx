"use client"
import { BaseSidebar } from "qore-components";
import { sidebarItemsConfig } from "@/utilities/data/sidebarData";
import { usePathname, useRouter } from "next/navigation";
// import Header from "../ui/menu/Header";
import { Header } from "../Layout/Header";

export type DashboardLayoutProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const DashboardLayout = ({
    children,
    ...props
}: DashboardLayoutProps) => {

    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className={""}
            style={{
                display: "flex",
                position: "relative",
                justifyContent: "flex-start",
                height: "100vh",
                overflow: "hidden"
            }} {...props}>
            <BaseSidebar sidebarConfig={sidebarItemsConfig} navigate={router.push} currentPath={pathname}
                renderAdSection={() => null}
            />
            <main style={{
                flex: 1,
                height: "100%",
                // backgroundColor: "var(--gray--1)",
                position: "relative",
                overflow: "auto",
                backgroundColor: "var(--color-white)",
            }}>
                {/* <Header type={"dashboard"}/> */}
                <Header />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
