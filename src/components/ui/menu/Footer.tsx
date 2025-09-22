import FacebookIcon from "@/components/icon/FacebookIcon";
import LinkedInIcon from "@/components/icon/LinkedInIcon";
import TwitterNowXIcon from "@/components/icon/TwitterNowXIcon";
import InstagramIcon from "@/components/icon/InstagramIcon";
// import {navItems} from "@/components/ui/menu/Header";
import "./menu.css"

const Footer = () => {
    const footerTabs = [
        {
            title: "Home",
            link: ""
        },
        // ...navItems,
        // {
        //     title: "Terms",
        //     link: ""
        // },
        // {
        //     title: "Privacy",
        //     link: ""
        // },
    ]
    // const handleLogoClick = () => {
    //     // RouterUtil.navigate(RouteConstant.dashboard.home.path)
    // }


    return (
        <div className={"footer"}>
            <div className={"footer-main-content-container"}>
                <div style={{
                    width: "max-content",
                    maxWidth: "100%",
                    display: 'flex',
                    flexDirection: "column",
                    gap: "2rem"
                }}>
                    {/*<ArcaLogo style={{cursor: "pointer", zIndex: 1000}} onClick={handleLogoClick}/>*/}
                    <p className={"label"} style={{maxWidth: "70%"}}>Arca empowers businesses and financial institutions
                        to navigate Africa’s
                        dynamic payments landscape with
                        ease and flexibility</p>
                    <div className={"footer-nav-items-container"}>
                        <div style={{display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap"}}>
                            {footerTabs?.map((footerTab, index) => {
                                return (<a key={index}
                                           style={{
                                               color: "var(--second--main)",
                                               fontWeight: 600,
                                               cursor: "pointer"
                                           }}>{footerTab?.title}</a>)
                            })}
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap"}}>
                            <a
                                style={{
                                    color: "var(--second--main)",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}>Terms</a>
                            <a
                                style={{
                                    color: "var(--second--main)",
                                    fontWeight: 600,
                                    cursor: "pointer"
                                }}>Privacy</a>
                        </div>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "250px"}}>
                    <div>
                        <p style={{color: "var(--second--main)", fontWeight: 600,}}>Email</p>
                        <p className={"text-md-regular"}>info@arca.network</p>
                    </div>
                    <div>
                        <p style={{color: "var(--second--main)", fontWeight: 600,}}>Phone Number</p>
                        <p className={"text-md-regular"} style={{flexWrap: "wrap"}}>07002722729,
                            09069575214, 09013619807, 09097036472</p>
                    </div>
                    <div>
                        <p style={{color: "var(--second--main)", fontWeight: 600,}}>Office Address</p>
                        <p className={"text-md-regular"}>Plot 5A, Furo Ezimora, Marwa, Lekki</p>
                    </div>
                </div>
            </div>

            <div className={"footer-conclusion-container"}>
                <p className={"subtitle label"}>Arca &copy;2024. All rights reserved. </p>
                <div style={{display: "flex", gap: "1rem"}}>
                    <FacebookIcon style={{width: "30px", height: "30px", color: "rgba(152, 162, 179, 1)"}}/>
                    <LinkedInIcon style={{width: "30px", height: "30px", color: "rgba(152, 162, 179, 1)"}}/>
                    <TwitterNowXIcon style={{width: "30px", height: "30px", color: "rgba(152, 162, 179, 1)"}}/>
                    <InstagramIcon style={{width: "30px", height: "30px", color: "rgba(152, 162, 179, 1)"}}/>
                </div>
            </div>
        </div>
    )
}
export default Footer;
