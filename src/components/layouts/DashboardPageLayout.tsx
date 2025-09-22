"use client"
import TitleSubtitleCard, {TitleSubtitleCardProps} from "@/components/ui/card/TitleSubtitleCard";
import BreadCrumbs, {BreadCrumbsProps} from "@/components/ui/breadcrumbs/BreadCrumbs";
import React from "react";
import {usePathname} from "next/navigation";
import {RouteConstant} from "@/utilities/constants/routeConstant";
import {BaseButton, BaseButtonProps} from "qore-components";


export type DashboardPageLayoutProps =
    {
        // headerProps?: NavContainerProps;
        mainContentProps?: {
            containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
            contentHeaderContainerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            contentHeaderTitleSubtitleProps?: TitleSubtitleCardProps;
            contentHeaderCtaBtnProps?: BaseButtonProps;
            contentBreadCrumbMenuProps?: BreadCrumbsProps;
        }
    }
    & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
const DashboardPageLayout = ({children, mainContentProps}: DashboardPageLayoutProps) => {

    const pathname = usePathname();
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "1rem 2rem",
            // backgroundColor: "rgba(11, 11, 12, 1)",
        }}>
            <main {...mainContentProps?.containerProps}
                // className={'flex-1 mx-auto py-5 w-[80%] text-white'}
                  style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                      gap: "2rem",
                      // height: "100%",
                      // backgroundColor: "rgba(11, 11, 12, 1)",
                      ...mainContentProps?.containerProps?.style
                  }}>
                {mainContentProps?.contentBreadCrumbMenuProps &&
                    <BreadCrumbs {...mainContentProps?.contentBreadCrumbMenuProps}/>}
                {(mainContentProps?.contentHeaderContainerProps || true) &&
                    <div {...mainContentProps?.contentHeaderContainerProps} style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                        ...mainContentProps?.contentHeaderContainerProps?.style
                    }}>
                        <TitleSubtitleCard {...mainContentProps?.contentHeaderTitleSubtitleProps}
                                           title={Object.values(RouteConstant.dashboard).find(((module) => module.path == pathname))?.name || ""}
                        />
                        {mainContentProps?.contentHeaderCtaBtnProps &&
                            <BaseButton {...mainContentProps?.contentHeaderCtaBtnProps}/>}
                    </div>}
                {children}
            </main>
        </div>
    )
}
export default DashboardPageLayout
