import "./card.css"
import {useState} from "react";

const CustomerBusinessCard = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    // const authState = useSelector((state: RootState) => state.auth);
    // const dispatch: AppDispatch = useDispatch();
    const handleDropdownToggle = () => {
        setOpenDropdown(!openDropdown)
    }
    // const userOrganisationsSelectOptions: ModernSelectOption[] = authState?.userInfo?.userOrganisationOrganisation?.map((userOrganisation) => {
    //     return ({label: userOrganisation?.organisationName, value: userOrganisation?.organisationId?.toString()})
    // }) || []

    // const handleUserOrganisationChange = async (organisationId: string, prevOrgId?: string) => {
    //     // if (organisationId == prevOrgId) return;
    //     // const userOrganisation = authState?.userInfo?.userOrganisationOrganisation?.find((userOrg) => userOrg?.organisationId?.toString() == organisationId);
    //     // // alert(userOrganisation?.organisationName)
    //     // // dispatch(auth.mutation.setCurrentOrganisation({...userOrganisation} as AuthState["currentOrganisation"]));
    //     // const preloader = document.querySelector('.preloader')
    //     // preloader?.classList.replace('display-none', 'display')
    //     //
    //     // await dispatch(auth.action.changeUserOrganisation({
    //     //     userOrganisationId: userOrganisation?.organisationId?.toString() || "",
    //     //     userEmail: authState?.userInfo.userEmail || ""
    //     // }))
    //     // //     .then(() => {
    //     // //     window.location.reload()
    //     // // })
    //     //
    //     //
    //     // setTimeout(() => {
    //     //     preloader?.classList.replace('display', 'display-none')
    //     // }, 500);
    // }

    return (
        // false ?
        //     <>
        //         <ModernSelect selectOptions={[]}
        //                       onOptionSelect={handleUserOrganisationChange}
        //             // transparent
        //                       theme={"dark"}
        //             // initialOption={{
        //             //     label: authState?.currentOrganisation?.organisationName,
        //             //     value: authState?.currentOrganisation?.organisationId?.toString()
        //             // }}
        //             // placeholderLabel={authState?.currentOrganisation?.organisationName}
        //                       style={{backgroundColor: "rgba(255, 255, 255, .03)", width: "100%", padding: ".5rem"}}
        //                       size={"small"}
        //         />
        //         {/*<p>{authState?.currentOrganisation?.organisationName}</p>*/}
        //     </> :
        <div className={"customerBusinessCard-container"} onClick={handleDropdownToggle}>
            <p style={{flex: 1}}>{"Business Name"}</p>
        </div>
    )
}
export default CustomerBusinessCard
