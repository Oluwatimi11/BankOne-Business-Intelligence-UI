"use client"
import {useLocation, useMatches, useNavigate} from "react-router-dom";
import {Fragment} from "react";
import AngleRightIcon from "@/components/icon/AngleRightIcon";

export type Breadcrumb = {
    label: string,
    path: string
}
export type BreadCrumbsProps = {
    autogenerateBreadCrumbs?: boolean
    crumbs?: Breadcrumb[]
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export default function BreadCrumbs({crumbs, autogenerateBreadCrumbs, ...props}: BreadCrumbsProps) {
    const ManuallyGeneratedBreadCrumbs = ({crumbs}: { crumbs: BreadCrumbsProps["crumbs"] }) => {
        const navigate = useNavigate();
        const location = useLocation();

        return (crumbs && crumbs?.length > 0 && (
                <div {...props} className={props?.className}
                     style={{
                         display: "flex",
                         alignItems: "center",
                         gap: "1rem",
                         padding: "0rem 0rem", ...props?.style
                     }}>
                    {crumbs.map((item, index) => {
                            return (
                                <Fragment key={item.path}>
                                    <div onClick={() => navigate(item.path)}
                                         style={{
                                             backgroundColor: location.pathname == item.path ? "rgba(21, 112, 239, 0.03)" : "transparent",
                                             padding: ".25em", borderRadius: ".25em", fontSize: ".75rem",
                                             cursor: "pointer"
                                         }}>
                                        <div style={{
                                            fontWeight: location.pathname == item.path ? 600 : 400,
                                            color: location.pathname == item.path ? "#A60615" : "white"
                                        }}>{item.label}</div>
                                    </div>
                                    {index + 1 < crumbs?.length &&
                                        <AngleRightIcon style={{height: '1em', width: "1em"}}/>}
                                </Fragment>
                            )
                        }
                    )}
                </div>)
        )
    }

    const AutoBreadcrumbs = () => {
        const matches = useMatches();

        type RouteHandle = any;

        const breadcrumbs = matches
            .filter((match): match is typeof match & { handle: RouteHandle } =>
                match.handle !== undefined &&
                (!!(match.handle as RouteHandle)?.displayName) ||
                typeof (match.handle as RouteHandle)?.breadCrumbLabel === 'string' ||
                typeof (match.handle as RouteHandle)?.breadCrumbLabel === 'function')
            .map((match) => {
                const handle = match.handle as RouteHandle;

                const label = typeof handle?.breadCrumbLabel === 'function'
                    ? handle?.breadCrumbLabel(match.params, match.data)
                    : handle?.breadCrumbLabel ?? handle?.displayName ?? match.pathname; // fallback to pathname if all else fails

                return {
                    label,
                    path: match.pathname,
                };
            });

        return <ManuallyGeneratedBreadCrumbs crumbs={breadcrumbs}/>;
    };
    if (autogenerateBreadCrumbs) return <AutoBreadcrumbs/>
    return <ManuallyGeneratedBreadCrumbs crumbs={crumbs}/>

}
